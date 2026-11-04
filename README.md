# Campus Shop

This is a small React shop for Web Programming Assignment 7. It gets its products from DummyJSON.

## How to run it

```sh
npm ci
npm run dev
```

Open the link shown in the terminal. I checked the project with Node.js 24. Use `npm run lint` to check the code and `npm run build` to build the app.

- Demo username `240408016@st.biruni.edu.tr`
- Demo password `demo123456`

You can add products before signing in. The cart asks you to sign in when you open it.

## Files

- `src/main.jsx` starts the app. `src/App.jsx` sets up the routes.
- `src/Layout.jsx` has the menu, footer, and theme button.
- `src/pages/` has the pages. `src/components/` has the product card and the cart route guard.
- `src/api/` gets products and handles the demo login.
- `src/hooks/` has the fetch and local storage hooks.
- `src/context/AuthContext.jsx` keeps track of the signed-in user. `src/store/cartStore.js` manages the cart.
- `src/index.css` has the styles.

## Reasoning questions

### Where does the state live?

- **Signed-in user.** The user is in Context with a reducer. The login page, menu, and cart guard all need to know who is signed in.
- **Cart.** The cart is in Zustand because several pages use it and the items change often. The browser also saves the items so they are there after a refresh.
- **Filters.** The search text and category are in the URL. When I share or refresh the link, the same filters are used.
- **Product list.** The list page gets its products from `useFetch` and keeps them in the hook's reducer. The page filters the products when it renders.
- **Theme.** The theme lives in the layout and is saved with `useLocalStorage`. All pages use the layout, so the theme stays the same when I move between pages.

### Why use Context and Zustand?

The user only changes when someone signs in or out, so Context is enough. With a single cart Context, components that only use the add button would also get updates when the cart changes. With Zustand, the button can read just the add action and the menu can read just the count. Using Zustand for the user would add another store for a value that changes rarely.

### What does useFetch share?

Both product pages use the same code for loading, showing an error, and stopping an old request. Each page has its own data and loading state.

### What type is the product ID?

The ID from `useParams` is a string, like `"3"`. I use it in the API URL, so it can stay a string. In the cart I use the number that comes back in the product data.

### Is the protected route secure?

The route guard sends signed-out users to the login page. It is not real security because the demo login and the user state are both in the browser. A real shop needs a server to check the password and check if the user can access each private request.

### What happens if I refresh /products/3?

A basic static server looks for a file at `/products/3` and may return a 404. Vite sends `index.html` for this route, so React Router can open the right page. A static host needs the same fallback rule. [Vite docs](https://vite.dev/config/shared-options.html#apptype), [React Router docs](https://reactrouter.com/how-to/pre-rendering#with-a-spa-fallback)

## What I looked up

- **URL filters.** I copy the current search parameters before I change one. This lets me change the category and keep the search text. [React Router docs](https://reactrouter.com/api/hooks/useSearchParams)
- **Saving the cart.** I read the saved items from local storage and check the data. If there is no usable data, the cart starts empty. Zustand's `subscribe` saves the items when they change. [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [MDN JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse), [Zustand docs](https://zustand.docs.pmnd.rs/reference/apis/create)
- **Theme.** I put the colors in CSS variables. The dark class changes those colors. [MDN CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
- **Stopping a request.** I give each request an `AbortController`. The effect stops the old request when the product ID changes or the page closes. [React useEffect](https://react.dev/reference/react/useEffect), [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## What was tricky?

I needed to make sure the detail page did not fetch again when the ID stayed the same. I used `useMemo` to keep the same input list until the ID changes. [React useMemo](https://react.dev/reference/react/useMemo)

I also needed to remember the cart link before sending the user to login. I saved the link in router state and used `replace` so the Back button skips the login page after signing in. [React Router useNavigate](https://reactrouter.com/api/hooks/useNavigate)
