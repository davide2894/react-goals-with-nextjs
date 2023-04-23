This is the revamped version of [React Daily Goal Tracker](https://github.com/davide2894/react-daily-goal-tracker), an app I build previously to track, as the name suggests, my goals on a daily basis. And This time around I wanted to rewrite it by using [Next.js](https://nextjs.org/).

## Live demo

https://react-goals-with-nextjs.vercel.app/

## User journey

The user has to register an account or login with one if it already exists.
Once logged in, the user can start creating and editing weekly goals.

If a page is refreshed or reloaded, the account is persisted, which means that the user session is kept, hence the account keeps being logged in.

The user can decide to logout at any time.

## What I learned and technologies used

While building this project I facedd many issues that led to learning experiences.
I am quite grateful for them to be honest, because this time around I wanted to learn by doing and not just following what someone else is doing in a tutorial video.

Here's what I learned:

- Next.js handles rendering both on server and client side. On the previous version of this app I was leveraging Redux Toolkit Query to make calls to my Firestore DB and aligning my local state. With NextJs I didn't have to do that because due to the fact that NextJs offers the possibility to make some logic before server side rendering, I just called Firestore before rendering the Goals page. Also, by using this powerful React framework I learned
  - how to setup routes
  - how to handle auth redirect by checking the user state on server side, before rending the page
  - the really [usefulness of deploying Next.js on Vercel](https://nextjs.org/learn/basics/deploying-nextjs-app/platform-details)
- Had the chace to practice more and more with Typescript
- I played around with [Tailwind CSS](https://tailwindcss.com/), a CSS framework that speeds up the styling of an app by leveraging on the concept of and offering utility classes

Here are the technologies being used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Redux Tooklit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Next Auth](https://github.com/gladly-team/next-firebase-auth)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### Dependencies

- NodeJS >= 10
- Chrome (or any Chromium based browser, like the new Edge)/Firefox/Safari

### Installing

Run 'npm i'

### Executing program

- Run in dev mode (with file watch): 'npm run dev'
- Run in production mode - it generates a single build: 'npm run build'
- Launch tests: 'npm run test'
