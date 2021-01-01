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
      value2,
      op
    };
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
  const a: number = Number(process.argv[2]);
  const b: number = Number(process.argv[4]);
  const op: string = String(process.argv[3]);
  console.log(`${a} ${op} ${b} = ${ calculator(a, b, op) }`);
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}