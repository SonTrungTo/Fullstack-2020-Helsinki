interface bmiInputs {
    height: number;
    weight: number;
};

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = Number((weight / Math.pow(height * 0.01, 2)).toFixed(2));
    switch (true) {
        case ( bmi < 18.5):
            return `Underweight (very unhealthy weight)`;
        
        case ( bmi >= 18.5 && bmi < 25):
            return `Normal (healthy weight)`;

        case ( bmi >= 25 && bmi <= 30 ):
            return `Overweight (unhealthy weight)`;

        case ( bmi > 30):
            return `Obese (very unhealthy weight)`;
    
        default:
            throw new Error('Invalid bmi!');
    }
};

const parseArguments = (args: Array<string>): bmiInputs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(process.argv[2]))
    && !isNaN(Number(process.argv[3]))) {
        return {
            height: Number(process.argv[2]),
            weight: Number(process.argv[3])
        };
    } else {
        throw new Error('Invalid height/weight input');
    }

};

try {
    console.log('Run: yarn calculateBmi <height(cm)> <weight(kg)>');
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error) {
    console.log('There was a problem with your program:', error.message);
}