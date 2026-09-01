# Purrfect Coffee

Marketing site for Purrfect Coffee, a cat cafe in Ho Chi Minh City. Built with Next.js and i18next, deployed to Netlify at [purrfectcoffee.vn](https://purrfectcoffee.vn).

## Scripts

### `npm run dev`

Runs the app on [http://localhost:3000](http://localhost:3000).

### `npm run build`

Creates a production build.

### `npm start`

Serves the production build.

## Environment variables

The store map needs a Google Maps Embed API key. Either name works:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key-here
REACT_APP_GOOGLE_MAPS_API_KEY=your-key-here
```

Put it in `.env.local` for local development. On Netlify it is set in the site's environment variables.

## Deployment

Netlify builds with `npm run build` and uses the Next.js runtime (`publish = .next`). The site is linked to `amelia751/purrfect` on `main`.

## License

MIT. See [LICENSE](LICENSE).
