import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

async function getData() {
  const res = await fetch(
    `https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/public/entries`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_KEY}`,
      },
      // next: { revalidate: 10 },
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function Home() {
  const data = await getData()
  const document = data?.items?.[0]?.fields?.text1?.[`en-US`]
  // console.log("doc", document)
  const Component = documentToReactComponents(document)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Checking if it works. This name is fetched from the server</p>
      {Component}
      <p>And yes, it does work</p>
    </main>
  )
}
