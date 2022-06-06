import { PhonePipe } from '../phone.pipe';

describe('PhonePipe', () => {
  const pipe = new PhonePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the format 10 digits', () => {
    const phone = 5141234567;

    expect(pipe.transform(phone)).toBe('(514) 123-4567');
  });

  it('should return same value as string', () => {
    const phone = 514123;

    expect(pipe.transform(phone)).toBe(phone.toString());
  });
});
