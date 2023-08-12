import express from 'express';
import routes from './routes';
import path from 'path';

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use((req, res, next) => {
  console.log('Request received at: ', new Date(), 'for path: ', req.path);
  next();
});

app.use('/api', routes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
