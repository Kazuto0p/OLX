import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import url from 'url';
import connection from './connection.js';
import router from './router/router.js';
import { auth } from 'express-oauth2-jwt-bearer'; 

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const file_name = url.fileURLToPath(import.meta.url);
const __dirname = dirname(file_name);
const port = process.env.PORT || 8080;

// ✅ JWT middleware
const jwtCheck = auth({
  audience: 'https://my-cool-api',
  issuerBaseURL: 'https://dev-jualdgdxsldqmwm3.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

app.use('/api', jwtCheck, router);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send("Welcome to Kirito's backend setup!");
});


connection().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Failed to start server due to DB error:', err);
});
