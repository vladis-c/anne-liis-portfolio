import fetch from 'node-fetch';
import 'dotenv/config';

const baseUrl = process.env.BASE_URL;
const firstFetchUrl = `${baseUrl}/environments/development/assets/`;
const secondFetchUrl = `${baseUrl}/environments/staging/assets/`;
const authToken = process.env.CMA_TOKEN;
const targetBranch = process.env.TARGET_BRANCH;

if (!firstFetchUrl || !secondFetchUrl) {
  console.error(
    'FIRST_FETCH_URL and SECOND_FETCH_URL must be set in the environment variables.',
  );
  process.exit(1);
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {Authorization: `Bearer ${authToken}`},
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  return response.json();
}

function extractAssetUrls(jsonResponse) {
  if (!('items' in jsonResponse)) {
    return [];
  }
  return jsonResponse.items.map(asset => ({
    id: asset.sys.id,
    url: `https:${asset.fields.file['en-US'].url}`,
    name: asset.fields.file['en-US'].fileName,
    title: asset.fields.title?.['en-US'] ?? 'Test',
    description: asset.fields.description?.['en-US'] ?? '',
  }));
}

async function updateAsset(asset) {
  const assetId = asset.id;
  const assetUrl = asset.url;
  const assetName = asset.name;
  const assetTitle = asset.title;
  const assetDesc = asset.description;

  const body = {
    fields: {
      title: {
        'en-US': assetTitle,
      },
      description: {
        'en-US': assetDesc,
      },
      file: {
        'en-US': {
          contentType: 'image/jpeg',
          fileName: assetName,
          upload: assetUrl,
        },
      },
    },
    metadata: {
      tags: [],
    },
  };

  try {
    const response = await fetch(
      `${baseUrl}/environments/${targetBranch}/assets/${assetId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to update asset ${assetId}: ${response.statusText}`,
      );
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const response2 = await fetch(
      `${baseUrl}/environments/${targetBranch}/assets/${assetId}/files/en-US/process`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'X-Contentful-Version': '1',
        },
      },
    );

    if (!response2.ok) {
      throw new Error(
        `Failed to process asset ${assetId}: ${response2.statusText}`,
      );
    }

    // await new Promise(resolve => setTimeout(resolve, 2000));

    const response3 = await fetch(
      `${baseUrl}/environments/${targetBranch}/assets/${assetId}/published`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'X-Contentful-Version': '2',
        },
      },
    );

    if (!response3.ok) {
      throw new Error(
        `Failed to publish asset ${assetId}: ${response3.statusText}`,
      );
    }

    console.log(
      `Asset ${assetId} updated, processed, and published successfully.`,
    );
  } catch (error) {
    console.error(`Error updating asset ${assetId}: ${error.message}`);
  }
}

async function compareAssets() {
  try {
    const firstResponse = await fetchJson(firstFetchUrl);
    const secondResponse = await fetchJson(secondFetchUrl);

    const firstAssets = extractAssetUrls(firstResponse);
    const secondAssets = extractAssetUrls(secondResponse);

    const secondAssetIds = new Set(secondAssets.map(asset => asset.id));
    const newAssets = firstAssets.filter(
      asset => !secondAssetIds.has(asset.id),
    );

    const newAssetUrls = newAssets.map(asset => asset.url);

    if (newAssetUrls.length > 0) {
      console.log('New asset URLs found:');
      newAssetUrls.forEach(url => console.log(url));

      // Update each new asset sequentially
      for (const asset of newAssets) {
        await updateAsset(asset);
      }
    } else {
      console.log('No new asset URLs found.');
    }
  } catch (error) {
    console.error(`Error comparing assets: ${error.message}`);
    process.exit(1);
  }
}

compareAssets();
