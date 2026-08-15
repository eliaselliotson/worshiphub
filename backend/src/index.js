import { Hono } from 'hono'
import { Providers } from "./providers/index.js";

const app = new Hono()

// Search API route
app.get('/search', async (c) => {
  try {
    const query = c.req.query()?.query;
    const results = await Providers.search(query);

    return c.json(results)
  } catch(e) {
    return c.text(e.message);
  }
})

// Import API route
app.get('/import', async (c) => {
  try {
    const query = c.req.query()?.url;
    const results = await Providers.load(query);

    return c.json(results)
  } catch(e) {
    return c.text(e.message);
  }
})

export default app
