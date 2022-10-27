This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Install

```bash
# graphql
$ yarn add -D graphql

# urql
$ yarn add next-urql react-is urql graphql-tag

# codegen
$ yarn add -D @graphql-codegen/cli @graphql-codegen/typescript-urql @graphql-codegen/typescript-urql @graphql-codegen/typescript-operations

# MUI
$ yarn add @mui/material @emotion/react @emotion/styled
$ yarn add @mui/icons-material

# emotion
$ yarn add @emotion/cache @emotion/server

# date
$ yarn add date-fns-tz date-fns

# markdown
$ yarn add zenn-markdown-html@latest zenn-content-css@latest zenn-embed-elements@latest

# dayjs
$ yarn add dayjs
```

## GraphQL Codegen

```bash
# init
$ yarn graphql-codegen init

# run
$ yarn codegen
```
