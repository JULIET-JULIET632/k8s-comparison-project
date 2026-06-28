const express = require('express');
const app = express();
const PORT = 3000;

const DISTRIBUTION = process.env.DISTRIBUTION || 'k3s';
const STAGE = process.env.STAGE || 'single-node';

app.get('/', (req, res) => {
  res.json({
    message: `Hello from ${DISTRIBUTION}!`,
    distribution: DISTRIBUTION,
    stage: STAGE,
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
