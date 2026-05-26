import dotenv from 'dotenv';
import { createApp } from './app.js';
import { connectDatabase } from './config/database.js';

dotenv.config();

const port = process.env.PORT || 4000;
const app = createApp();

async function boot() {
  await connectDatabase(process.env.MONGO_URI);

  app.listen(port, () => {
    console.log(`Scripture Path API listening on http://localhost:${port}`);
  });
}

boot().catch((error) => {
  console.error('Failed to start Scripture Path API');
  console.error(error);
  process.exit(1);
});
