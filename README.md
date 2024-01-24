# Anne Liis. Portfolio

Portfolio site of Anne Liis.

### Team

- Anne Liis Kasterpalu - inspirer, content manager, owner
- Vladislav Cherkasheninov - inspired, code generator, giver

____

![Image](/assets/images/IMAGE%202024-01-13%2010:37:28.jpg)

## Architechture

| Stack        | Tech                           | Description                                                                                           | Link                                              |
| ------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Language     | Typescript                     |
| Framework    | NextJS 14                      | SSR (Server Side Rendering) rendering is perfect SEO                                                  |
| CMS          | Contentful                     | Easy to use. Somewhat good free tier                                                                  |
| SEO          | NextJS                         | SEO is included. Enriching code with the possibility to repost the conent of websites in Social Media | https://www.youtube.com/watch?v=EnO_C9pvZF0&t=17s https://www.youtube.com/watch?v=wTGVHLyV09M |
| Styles       | Tailwind                       |
| Components   | Contentful CMS Rich Components | To be used along with HTML markup                                                                     |
| Database     | Contentful                     | Database for content and assets. Upto 10000 units free.                                               |
| Environments | Contentful                     | 2 environments free: Development and Production                                                       |
| API          | NextJS integrated API          |
| Hosting      | Vercel                         | Trusted NextJS websites hosting provider. Free.                                                       |
| Domain       | **--TBD--**                    | Somewhat around 20$ per year.                                                                         |
| Git          | Github                         | Using Project management console                                                                      |

## UX/UI Design

| \_\_           | \_\_  | \_\_                                   |
| -------------- | ----- | -------------------------------------- |
| Design/Styling | Figma | Anne Liis (?)                          |
| Self           | ---   | Styling ongo while developing the rest |
| Colors         | ---   | **--TBD--**                            |
| Fonts          | ---   | **--TBD--**                            |
| Sizing         | ---   | **--TBD--**                            |

- Colors, sizes and fonts to be decided

## Branches, domains, environments

1. Hosting of `admin.` subdomain with extra authentication for checking live changes before deploying them to production.
2. Hosting of `dev.` subdomain for development: tests of fixed issues or enhancements
3. Git: `main` points to `production` and `develop` points to `development`

## When live

### The order of content management

1. Content added to `development` environment on **Contentful CMS content management pannel**.
2. Content is visible on `admin.` subdomain for testing
3. Deploying the content to `production` environment on **Contentful CMS content management pannel**.
4. Content goes live to the main domain.

### The order of support (aka fixing bugs, enhancement and changes)

1. Issues are identified and put into cards on GitHub management console.
2. Bugs are fixed on local environment without affecting any subdomains or main domain.
3. Changes are deployed to `dev.` subdomain.
4. Deployment to production main domain.

## Stages

| \_\_ | Action                                      | \_\_ |
| ---- | ------------------------------------------- | ---- |
| 1.   | Idea                                        | ✓    |
| 2.   | Technology Research                         | ✓    |
| 3.   | Technology Template test                    | ✓    |
| 4.   | Custom code setup                           |      |
| 5.   | Custom code setup test                      |      |
| 6.   | Think of a content/visuals/UXI              |      |
| 7.   | Think of an approach                        |      |
| 8.   | Decision on cooperation                     |      |
| 9.   | Implementation (UX/UI)                      |      |
| 9.   | Implementation (Code/CMS)                   |      |
| 10.  | Testing                                     |      |
| 11.  | Deployment to production                    |      |
| 12.  | Additions, maintainance, content management |      |
