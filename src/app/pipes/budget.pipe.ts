import { Pipe, PipeTransform } from '@angular/core';
import { getCurrencySymbol } from '@angular/common';

@Pipe({
  name: 'budget',
  standalone: true,
})
export class BudgetPipe implements PipeTransform {
  transform(budget: string, currencyCode: string = 'USD'): string {
    if (!budget) return 'unknown';

    const currencySymbol = getCurrencySymbol(currencyCode, 'narrow');

    return `${currencySymbol}${budget} million`;
  }
}
