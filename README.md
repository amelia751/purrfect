# Purrfect Coffee

Marketing site for Purrfect Coffee, a cat cafe in Ho Chi Minh City. Built with React, Redux Toolkit and i18next, bundled by [Vite](https://vite.dev/), and deployed to Netlify.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode on [http://localhost:5180](http://localhost:5180) with hot module replacement. `npm start` does the same thing.

### `npm run build`

Builds the app for production to the `dist` folder, minified and with hashed filenames.

### `npm run preview`

Serves the contents of `dist` locally so you can check a production build before deploying.

## Environment variables

The store map needs a Google Maps Embed API key:

```
REACT_APP_GOOGLE_MAPS_API_KEY=your-key-here
```

Put it in a `.env` file for local development; on Netlify it is set in the site's environment variables. Vite is configured to expose both `REACT_APP_*` and `VITE_*` prefixes, so either name works.

## Deployment

Netlify builds with `npm run build` and publishes `dist`. All routes fall back to `index.html` so client-side routing works on refresh.
