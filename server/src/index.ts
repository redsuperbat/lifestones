import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { HealthController } from "./HealthController.ts";
import {
  ConsoleLogFormatter,
  GoogleCloudRunLogFormatter,
  Logger,
} from "swiss-log";

const port = Number.parseInt(process.env.PORT ?? "3001");
const app = new Hono();
const logger = new Logger({
  formatter:
    process.env.LOG_FORMAT === "google"
      ? new GoogleCloudRunLogFormatter()
      : new ConsoleLogFormatter(),
});

app.use(async (ctx, next) => {
  logger.info("Incoming request", {
    url: ctx.req.url,
  });
  await next();
  logger.info("Outgoing request", {
    url: ctx.req.url,
    status: ctx.res.status,
  });
});

const healthController = new HealthController();
app.route("/health", healthController.registerRoutes());

// Client side code
app.use("*", serveStatic({ root: "./static" }));

serve({
  fetch: app.fetch,
  port,
});

logger.info(`Server running on port ${port}`);
