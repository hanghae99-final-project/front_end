import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const container = document.getElementById("root");
const root = createRoot(container);
const authURI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

if (window.location.href !== "http://localhost:3000/" && window.location.href !== authURI && localStorage.getItem("token") === null) {
    window.location.replace("http://localhost:3000/");
}

// if (window.location.href !== authURI || window.location.href !== authURI) {
//     window.location.replace("http://localhost:3000/");
// }

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

serviceWorkerRegistration.register();
