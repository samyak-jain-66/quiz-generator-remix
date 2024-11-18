# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## How to run

1. Change branch in github from main to feat/NS-000-dev, and clone the repo
2. npm i
3. npm run dev
4. Manually redirect to /admin route
5. Build the form and save it , after that submit the whole page. It will redirect to client size with quizId.
6. On client side you can attempt the quiz

## Limitations

Due to time constraints, I have avoided few things , which can be incorporated

1. We can lazy load the components
2. In Many places, I have used any in typescript, which can be avoided
