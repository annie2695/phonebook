import { Pipe, PipeTransform } from '@angular/core';

/**
 * Format a number as a Phone number.
 *
 * Usage:
 *   value | phone
 *
 * @example
 *   {{ 5141234567 | phone }}
 *   // formats to: (514) 123-4567
 */
@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    const valueStr = value.toString();

    if (/^\d{10}$/.test(valueStr)) {
      const city = valueStr.slice(0, 3);
      const number = valueStr.slice(3);

      return `(${city}) ${number.slice(0, 3)}-${number.slice(3)}`;
    }

    return valueStr;
  }
}
