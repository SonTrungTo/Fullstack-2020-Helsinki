import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('<h1>Hello Full Stack</h1>');
});

app.get('/bmi', (req, res) => {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.status(404).json({
            error: 'malformatted parameters'
        });
    }

    return res.json({
        height,
        weight,
        bmi: calculateBmi(height, weight)
    });
});

const PORT = 3001 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server connected successfully at ${PORT}`);
});