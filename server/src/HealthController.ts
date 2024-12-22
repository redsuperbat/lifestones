import type { Context, Hono } from "hono";
import { Controller } from "./Controller.ts";

export class HealthController extends Controller {
  registerRoutes(): Hono {
    return this.router;
  }

  async ok(ctx: Context) {
    return ctx.json({ ok: true });
  }
}
