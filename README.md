# agora-frontend

The web frontend for the Agora VR Project is being implimented using the
[Svelte](https://svelte.dev/) web framework
and
[Routify](https://routify.dev/) for SPA routing.

## Development

To start developing, you will need Node.js installed. Afterwards, run
the following commands to install the required dependencies and start
the development server.

```bash
npm install
npm run dev
```

## Npm tasks
``dev`` **Development**

``dev:split`` **Development (with code splitting)**

``build`` **Build a bundled app for SSR + prerendering and a dynamic app for code splitting**

``export`` **Export static pages (with app fallback)**

``preview-build`` **Run after build to preview app**
