import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return duration in hours and minutes', () => {
    expect(pipe.transform('120')).toEqual('2h 0min');
    expect(pipe.transform('90')).toEqual('1h 30min');
    expect(pipe.transform('45')).toEqual('45min');
  });

  it('should return "unknown" for empty duration', () => {
    expect(pipe.transform('')).toEqual('unknown');
  });
});
