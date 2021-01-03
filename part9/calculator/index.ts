import express from 'express';
import cors from 'cors';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(cors()); // eslint-disable-line
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('<h1>Hello Full Stack</h1>');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json({
            error: 'malformatted parameters'
        });
    }

    return res.json({
        height,
        weight,
        bmi: calculateBmi(height, weight)
    });
});

app.post('/exercises', (req, res) => {
    const targetHour = Number(req.body.target); // eslint-disable-line
    const daily_exercises: Array<any> = req.body.daily_exercises; // eslint-disable-line
    let dailyHours: Array<number> = [];

    if (isNaN(targetHour) || typeof daily_exercises === 'number'
        || typeof daily_exercises === "string") {
        return res.status(400).json({
            error: 'malformatted parameters'
        });
    } else if (!daily_exercises || daily_exercises.length === 0) {
        return res.status(400).json({
            error: 'missing daily_exercises parameter'
        });
    }

    daily_exercises.forEach((hour: number): any => { // eslint-disable-line
        dailyHours = dailyHours.concat(hour);
        if (isNaN(hour) || typeof hour === "string") {
            return res.status(400).json({
                error: 'malformatted parameters'
            });
        }
    });

    return res.status(200).json(calculateExercises(targetHour, dailyHours));
});

const PORT = 3001 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server connected successfully at ${PORT}`);
});