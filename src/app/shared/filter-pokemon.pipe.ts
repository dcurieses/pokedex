import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPokemon',
})
export class FilterPokemonPipe implements PipeTransform {
  transform(values: any[], ...args: unknown[]): any[] {
    return values.filter((v) => v.age < 18);
  }
}
