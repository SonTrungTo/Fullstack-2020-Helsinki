type Operation = string;

type Result = number;

interface CalculatorValues {
  value1: number;
  value2: number;
  op: string;
};

const parseArguments = (args: Array<string>): CalculatorValues => {
  if (args.length < 5) throw new Error('Not enough arguments');
  if (args.length > 5) throw new Error('Too many arguments');

  if ( !isNaN(Number(process.argv[2])) && !isNaN(Number(process.argv[4])) ) {
    return {
      value1: Number(process.argv[2]),
      value2: Number(process.argv[4]),
      op: process.argv[3]
    };
  } else {
    throw new Error(`Invalid input: ${process.argv[2]} ${process.argv[3]} ${process.argv[4]}`);
  }
  
};

const calculator = (a: number, b: number, op : Operation) : Result => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if( b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
}

try {
  const { value1, value2, op } = parseArguments(process.argv);
  console.log(`${value1} ${op} ${value2} = ${ calculator(value1, value2, op) }`);
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}