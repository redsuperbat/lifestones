import { Hono } from "hono";
import type { Middleware } from "./Middleware.ts";

export abstract class Controller {
  protected router = new Hono();
  abstract registerRoutes(): Hono;

  registerMiddleware(middleware: Middleware): void {
    this.router.use(middleware.register());
  }
}
