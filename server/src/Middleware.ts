import type { createMiddleware } from 'hono/factory'

export interface Middleware {
  register(): ReturnType<typeof createMiddleware>
}
