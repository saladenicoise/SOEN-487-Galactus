# sky-siren

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Folder Structure

- `cypress`: This directory is used for end-to-end testing with the Cypress testing framework.

- `public`: This directory contains the public assets that will be served by the application. For example, the favicon.ico file that is served when the application is loaded in a browser.

- `src`: This is the main directory for the application's source code.
  - `assets`: This directory contains static assets that will be used in the application, such as images or stylesheets.

    **Note**: Files in the “assets” folder are only included in the build if they have a literal reference in one of the Vue files. Where as every file and folder from the “public” folder are copied into your production build as-is, no matter what.

  - `components`: This directory contains reusable components that can be used throughout the application. For example, the header and footer component.
  
  - `firebase`: This directory contains  the Firebase configuration and initialization file.

  - `router`: This directory contains the application's routing logic. It defines the paths and corresponding components that will be rendered when navigating to different routes.

  - `store`: This directory contains the application's Vuex store. Vuex is a state management pattern used in Vue.js applications.

  - `views`: This directory contains the components that will be rendered for each route in the application. For example, the sign in and sign up components/pages.

  - `App.vue`: This is the root component of the application. It contains the main template that will be rendered for the entire application.

  - `main.js`: This file is the entry point for the application. It initializes the Vue.js framework and mounts the root component to the DOM.