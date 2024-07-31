import { BudgetPipe } from './budget.pipe';

describe('BudgetPipe', () => {
  let pipe: BudgetPipe;

  beforeEach(() => {
    pipe = new BudgetPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return budget in millions with default currency code', () => {
    expect(pipe.transform('250')).toEqual('$250 million');
    expect(pipe.transform('100-200')).toEqual('$100-200 million');
  });

  it('should return budget in millions with provided currency code', () => {
    expect(pipe.transform('250', 'EUR')).toEqual('€250 million');
    expect(pipe.transform('100-200', 'EUR')).toEqual('€100-200 million');
  });

  it('should return "unknown" for empty budget', () => {
    expect(pipe.transform('')).toEqual('unknown');
  });
});
