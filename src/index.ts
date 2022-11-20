// Setup environment
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.listen(process.env.PORT, () => {
  console.log(`Server has been started at ${process.env.PORT}`);
});
