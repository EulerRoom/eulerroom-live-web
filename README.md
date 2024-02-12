# eulerroom-live-web

Website for Eulerroom self-hosted live streaming events and historical archive

## Install

### Obtain a Muxy API key

You will need to create a Web API key from Muxy. You can create one from the
administrator at `/admin`.

### Configure environment variables

1. Create a file called `.env.local`
2. Copy any variable from `.env` that you want to modify, to match your local setup:

```bash
VITE_MUXY_URL=http://localhost:8000
VITE_MUXY_API_KEY=insert-api-key
VITE_EVENT_SLUG=insert-event-slug
```

NOTE: For now, this frontend only works for a specific Event, so you need to
specify its "slug". You can get this from Muxy admin too.

### Deployment with GitHub Pages

We have currently setup GitHub Pages to deploy at https://streams.eulerroom.com when
someone pushes to the `main` branch in this repository.

The environment variables can be configured from the repository settings, in the
[Environment Settings for `github-pages`](https://github.com/EulerRoom/eulerroom-live-web/settings/environments/2249116451/edit).
`VITE_MUXY_API_KEY` is stored as a secret variable, so you can't see or modify it. 
If you need to change it you need to recreate it.

## Development notes

### Event page

HTML set in: `src/app/components/EventHeader.tsx`

* Intro (Toplap presents:), event Title

### event details

Slot duration set in:

* `src/app/components/PerformanceList.tsx`
* `const SLOT_DURATION_MIN`

### Others

Event start date/time, end date/time, preparation time, support links etc set
in Muxy Admin:

https://muxy.tidalcycles.org/admin

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
