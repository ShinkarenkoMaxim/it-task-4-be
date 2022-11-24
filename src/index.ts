// Setup environment
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

import express, { Request, Response } from 'express';
import { resolve } from 'path';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.static('public'));

// FIX: fix routing for the frontend app
app.get(['/dashboard', '/login', '/signup'], (req: Request, res: Response) =>
  res.sendFile(resolve('public', 'index.html'))
);

app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log(`Server has been started at ${process.env.PORT}`);
});
