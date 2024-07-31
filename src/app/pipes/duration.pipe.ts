import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(durationInMins: string): string {
    if (!durationInMins) return 'unknown';

    const duration = parseInt(durationInMins, 10);
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);

    return hours ? `${hours}h ${minutes}min` : `${minutes}min`;
  }
}
