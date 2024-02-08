# eulerroom-live-web

Website for Eulerroom self-hosted live streaming events and historical archive

## Install

1. Copy `.env` into a new file `.env.local`
2. Change the values in `.env.local` to match your local setup:

```
VITE_MUXY_URL=http://localhost:8000
VITE_MUXY_API_KEY=
VITE_EVENT_SLUG=
```

## Development

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
