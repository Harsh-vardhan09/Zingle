import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Meta } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import { Provider } from 'react-redux'
import { store } from "./app/store.js";

const PUBLISAHBLE_KEY=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if(!PUBLISAHBLE_KEY){
  throw new error('missing publishable key')
}

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISAHBLE_KEY}>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </ClerkProvider>,
);
