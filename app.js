import express from 'express';
import router from './router.js';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});