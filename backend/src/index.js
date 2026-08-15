import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Providers } from "./providers/index.js";

const app = new Hono()

// Enable universal CORS for all routes
app.use('*', cors({
  origin: '*', // Allow all origins
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400, // Cache preflight response for 24 hours
}))

// Search API route
app.get('/search', async (c) => {
  try {
    const query = c.req.query()?.query;

    if (Providers.canLoad(query)) {
      return c.json(true)
    }

    const results = await Providers.search(query);

    return c.json(results)
  } catch(e) {
    return c.text(e.message, 500);
  }
})

// Import API route
app.get('/import', async (c) => {
  try {
    const query = c.req.query()?.url;
    const results = await Providers.load(query);

    return c.json(results)
  } catch(e) {
    return c.text(e.message, 500);
  }
})

export default app
