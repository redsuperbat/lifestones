import "./index.css";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { Root } from "./pages/Root";

const root = document.body.appendChild(document.createElement("div"));

render(
  () => (
    <Router>
      <Route path="/" component={() => <Root />} />
    </Router>
  ),
  root,
);
