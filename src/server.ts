import express from 'express';

import './database';

const app = express();

app.use(express.json());
let a = new Array();

for (let i = 0; i < 20; i++) {
  let x = {
    Diego: `numero ${i}`,
    Error: `Error numero ${i}`,
  };
  a.push(x);
}

app.get('/users', (request, response) => {
  return response.json(a);
});

app.listen(3334, () => console.log('backend started'));
