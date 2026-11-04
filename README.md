# Campus Shop

A small React shop for Web Programming Assignment 7. The catalogue uses the DummyJSON products API.

## Run locally

```sh
npm ci
npm run dev
```

The project was checked with Node.js 24. Open the address printed by Vite. Use `npm run lint` for the source check and `npm run build` to build the app.

The demo username is `240408016@st.biruni.edu.tr` and the demo password is `demo123456`. You can add products as a guest and sign in when you open the cart.

## File organization

- `src/main.jsx` sets up the router and auth provider. `src/App.jsx` declares the routes and `src/Layout.jsx` contains the navigation, footer, and theme toggle.
- `src/pages/` contains the home, product list, product detail, login, cart, and 404 pages.
- `src/components/` contains the product card and the protected route.
- `src/api/` contains the DummyJSON requests and the simulated login.
- `src/hooks/` contains the fetch and local storage hooks.
- `src/context/AuthContext.jsx` keeps the signed-in user, and `src/store/cartStore.js` holds cart items and actions.
- `src/index.css` contains the shared styles and light and dark colors.

## Reasoning questions

### State choices

- **Signed-in user.** The current user lives in the auth Context and changes through a reducer. The navbar, login, and cart route all need access to it during the same app session. Reloading starts a new signed-out session.
- **Cart.** Cart items live in a Zustand store and are saved to local storage. The detail page can select just the add action, while the navbar reads the quantity total and the cart page reads the items.
- **Filters.** The search text and category live in the URL query string. A copied or reloaded URL opens the same filtered catalogue.
- **Product list.** The API response lives in the reducer state of the list page's `useFetch` call. The page calculates the visible products during render from that response and the current filters.
- **Theme.** The layout owns the theme with `useLocalStorage`. Since every route uses that layout, they share one theme and the saved preference is restored on reload.

### Context versus store

Login and logout are occasional changes, so a Context provider is enough for the few components that read the signed-in user. A cart Context containing the whole cart would notify its consumers on every quantity change, including components that only need an action or an unchanged badge value. Zustand selectors let those components subscribe to just what they use, while moving the user to Zustand would add a store for a value that changes infrequently.

### Custom hooks

`useFetch` shares the pattern for loading data, keeping the result or error in a reducer, and cancelling requests in the effect cleanup. The list and detail pages each get their own state and run their own request.

### Route parameters

`useParams` gives me the product ID as a string, such as `"3"`. The detail page passes it to the API function, which encodes it as part of the request URL. The cart uses the numeric ID from the product response when it checks whether an item is already in the cart.

### Protected routes

`ProtectedRoute` is a client-side convenience and does not provide security. The browser runs this code, and anyone can read the bundled demo credentials or change the client state. A real shop would need a backend to verify credentials, issue a session, and check authorization for each protected request.

### Deep links

If a basic static server receives `/products/3` on a refresh, it looks for a file at that path and can return a 404. Vite's default SPA development setup sends `index.html`, so React Router can match the URL after the app loads. A static deployment needs a fallback to `index.html` for app routes. [Vite shared options](https://vite.dev/config/shared-options.html#apptype), [React Router SPA fallback](https://reactrouter.com/how-to/pre-rendering#with-a-spa-fallback)

## Self-study notes

- **Updating query parameters.** `setSearchParams` can receive the current parameters. I make a copy, set or delete just the changed key, then return the copy so other parameters stay in the link. [React Router useSearchParams](https://reactrouter.com/api/hooks/useSearchParams)
- **Saving the cart safely.** Local storage holds strings, so I parse the saved JSON and check that it is an array with valid item values. If reading or parsing fails, the store starts empty. The Zustand subscription writes to storage when the items array changes. [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [MDN JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse), [Zustand create and subscribe](https://zustand.docs.pmnd.rs/reference/apis/create)
- **Light and dark theme.** I set the surface, text, link, and border colors as CSS custom properties on the layout. The dark class overrides those properties, and the rest of the CSS keeps using the same variable names. [MDN CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
- **Cancelling requests.** The fetch effect creates an `AbortController` per request and calls `abort()` during cleanup. The hook checks the signal before updating its reducer so an old request cannot overwrite the current result. [React useEffect](https://react.dev/reference/react/useEffect), [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## Challenges

A new array of fetch inputs on each render would restart the effect even if the product ID stayed the same. The detail page uses `useMemo` to keep the input list stable until the ID changes. [React useMemo](https://react.dev/reference/react/useMemo)

The cart redirect needed to keep the original URL, including its query string, until login finished. I passed it in router state and used replacement navigation so the browser Back button skips the login screen after a successful sign-in. [React Router useNavigate](https://reactrouter.com/api/hooks/useNavigate)
