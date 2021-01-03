import express from 'express';

const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});