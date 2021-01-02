export {};

type rating = 1 | 2 | 3;

interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: rating;
    ratingDescription: string;
};

interface Arguments {
    targetHour: number;
    dailyHours: Array<number>;
};

const calculateExercises = (targetHour: number, dailyHours: Array<number>): Result => {
    const average = dailyHours.reduce((total, hour) => total + hour) / dailyHours.length;

    const calculateRating = (targetHour: number, averageHour: number): rating => {
        switch (true) {
            case ( averageHour >= targetHour ):
                return 3;

            case ( averageHour >= targetHour - 0.5 ):
                return 2;
        
            default:
                return 1;
        }
    };
    const ratingDescription = (score: rating): string => {
        switch (score) {
            case 1:
                return 'Sorry! It sucks!';

            case 2:
                return 'Not too shabby, isn\'t it?';
        
            case 3:
                return 'Perfection!';

            default:
                throw new Error('Invalid score');
        }
    };

    return {
        periodLength: dailyHours.length,
        trainingDays: dailyHours.filter(hour => hour !== 0).length,
        target: targetHour,
        average: average,
        success: average >= targetHour ? true : false,
        rating: calculateRating(targetHour, average),
        ratingDescription: ratingDescription(calculateRating(targetHour, average))
    };
};

const parseArguments = (args: Array<string>): Arguments => {
    if (args.length < 4) throw new Error('Too few arguments');

    let arrayOfHours: Array<number> = [];
    for (const value of process.argv.slice(2)) {
        arrayOfHours = arrayOfHours.concat(Number(value));
        if (isNaN(Number(value))) {
            throw new Error(`Invalid argument: ${ value }`);
        }
    }

    return {
        targetHour: arrayOfHours[0],
        dailyHours: arrayOfHours.slice(1)
    };
};

try {
    const { targetHour, dailyHours } = parseArguments(process.argv);
    console.log(calculateExercises(targetHour, dailyHours));
} catch (e) {
    console.log('Something is wrong:', e.message);
}