# adriaan.cc

Adriaan's personal website

## Deployment

This site is built with [Astro](https://astro.build) and deployed as static assets on [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/).

To build and deploy the site:

```sh
pnpm run deploy
```

The `wrangler.jsonc` configuration uses the Workers build workflow with an `assets` directory and explicit `404-page` handling.
