export const LOCALE = 'en-US';

export const AUTHOR = 'Anne Liis Kasterpalu';
export const IMAGE = {WIDTH: 720 / 2, HEIGHT: 1280 / 2};
const s = {
  sys: {
    type: 'Array',
  },
  total: 1,
  skip: 0,
  limit: 100,
  items: [
    {
      metadata: {
        tags: [],
        concepts: [],
      },
      sys: {
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: '7kobn15v2krp',
          },
        },
        id: '6WEYOgqvoIrNUidpCyFwEq',
        type: 'Entry',
        createdAt: '2024-07-04T12:41:58.208Z',
        updatedAt: '2024-07-04T19:05:08.453Z',
        environment: {
          sys: {
            id: 'development',
            type: 'Link',
            linkType: 'Environment',
          },
        },
        publishedVersion: 11,
        publishedAt: '2024-07-04T19:05:08.453Z',
        firstPublishedAt: '2024-07-04T12:41:58.208Z',
        revision: 2,
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'navigation',
          },
        },
        urn: 'crn:contentful:::content:spaces/7kobn15v2krp/environments/development/entries/6WEYOgqvoIrNUidpCyFwEq',
      },
      fields: {
        title: {
          'en-US': 'Navigation',
        },
        menu: {
          'en-US': ['Portfolio', 'About me'],
        },
        name: {
          'en-US': {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'Anne Liis Kasterpalu',
                    nodeType: 'text',
                  },
                ],
                nodeType: 'paragraph',
              },
            ],
            nodeType: 'document',
          },
        },
        imageUrl: {
          'en-US':
            'https://firebasestorage.googleapis.com/v0/b/anneliisportfolio.appspot.com/o/5.jpg?alt=media&token=8e55aae2-789c-4206-aabf-e924b4b5cc6e',
        },
        contacts: {
          'en-US': ['Contact', 'Instagram'],
        },
        tags: {
          'en-US': ['Anne Liis Kasterpalu', 'photographer'],
        },
        image: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: '6K8QA3heK7lC6uC9R13KVg',
            },
          },
        },
      },
    },
  ],
  includes: {
    Asset: [
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: '7kobn15v2krp',
            },
          },
          id: '6K8QA3heK7lC6uC9R13KVg',
          type: 'Asset',
          createdAt: '2024-07-04T17:41:37.750Z',
          updatedAt: '2024-07-04T17:41:37.750Z',
          environment: {
            sys: {
              id: 'development',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          publishedVersion: 2,
          publishedAt: '2024-07-04T17:41:37.750Z',
          firstPublishedAt: '2024-07-04T17:41:37.750Z',
          revision: 1,
          urn: 'crn:contentful:::content:spaces/7kobn15v2krp/environments/development/assets/6K8QA3heK7lC6uC9R13KVg',
        },
        fields: {
          title: {
            'en-US': 'Test',
          },
          file: {
            'en-US': {
              url: '//images.ctfassets.net/7kobn15v2krp/6K8QA3heK7lC6uC9R13KVg/b988f1071dd7be885e5bc4bfcf399465/5.jpeg',
              details: {
                size: 1955940,
                image: {
                  width: 1920,
                  height: 1080,
                },
              },
              fileName: '5.jpeg',
              contentType: 'image/jpeg',
            },
          },
        },
      },
    ],
  },
};
