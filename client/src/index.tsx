/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { Navigate, Route, Router } from "@solidjs/router";
import { Home } from "./pages/Home";

const root = document.body.appendChild(document.createElement("div"));

render(
  () => (
    <Router>
      <Route path="/" component={() => <Navigate href="/home" />} />
      <Route path="/home" component={() => <Home />} />
    </Router>
  ),
  root,
);
