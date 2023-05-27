import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { ApiRestService } from '../shared/controller/api.service';
import { Pokemon, Stats } from '../shared/model/pokemon.models';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css'],
})
export class ListPokemonComponent implements OnInit {
  constructor(private apiRestService: ApiRestService) {}
  loading: boolean = true;
  type_to_color = [
    { type: 'normal', color: '#fffce4' },
    { type: 'fighting', color: '#db5656' },
    { type: 'flying', color: '#c3e5ff' },
    { type: 'poison', color: '#c140c1' },
    { type: 'ground', color: '#c5895f' },
    { type: 'rock', color: '#918c6a' },
    { type: 'bug', color: '#99c778' },
    { type: 'ghost', color: '#7685a7' },
    { type: 'steel', color: '#c1bfb5' },
    { type: 'fire', color: '#dd9168' },
    { type: 'water', color: '#00d5ff' },
    { type: 'grass', color: '#5c954c' },
    { type: 'electric', color: '#bfbf0e' },
    { type: 'psychic', color: '#f38397' },
    { type: 'ice', color: '#00f2f2' },
    { type: 'dragon', color: '#4895ff' },
    { type: 'dark', color: '#807b8d' },
    { type: 'fairy', color: '#ffc0cb' },
  ];
  total_count: number = 0;
  loaded_val: number = 0;
  Pokemons: Pokemon[] = [];
  filteredPokemons!: Observable<Pokemon[]>;

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.getAllPokemons();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.filteredPokemons = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterPoke(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterPoke(value: string): Pokemon[] {
    const filterValue = value.toLowerCase();
    if (filterValue == '') {
      return this.Pokemons;
    } else {
      return this.Pokemons.filter((option) =>
        option.nombre.toLowerCase().includes(filterValue)
      );
    }
  }

  getAllPokemons() {
    this.apiRestService.getAllPokemons().subscribe((resp) => {
      if (resp.status == 200) {
        let result = resp.body!.results;
        this.total_count = resp.body!.results.length;
        for (let i in result) {
          this.getPokemonData(result[i]['name']);
        }
      }
    });
  }

  getPokemonData(name: String) {
    this.apiRestService.getPokemon(name).subscribe((resp) => {
      if (resp.status == 200) {
        let res = resp.body!;

        let poke: Pokemon = {
          id: res.id,
          img: res.sprites.front_default,
          imgShiny: res.sprites.front_shiny,
          nombre: name.toUpperCase(),
          tipo: [],
          peso: res.weight / 10,
          altura: res.height / 10,
          stats: [],
          color: '',
        } as Pokemon;

        this.options.push(name.toUpperCase());

        for (let i in res.types) poke.tipo.push(res.types[i].type.name);

        for (let i in res.stats) {
          let stat_name = res.stats[i].stat.name.toUpperCase();
          if (stat_name == 'SPECIAL-ATTACK') {
            stat_name = 'SP. ATK';
          } else if (stat_name == 'SPECIAL-DEFENSE') {
            stat_name = 'SP. DEF';
          }
          let stat: Stats = {
            name: stat_name,
            base_stat: res.stats[i].base_stat,
            effort: res.stats[i].effort,
          } as Stats;
          poke.stats.push(stat);
        }
        for (let i of this.type_to_color) {
          if (i.type == poke.tipo[0]) poke.color = i.color;
        }

        this.Pokemons.push(poke);

        this.Pokemons.sort((a, b) => {
          if (a.id < b.id) return -1;
          else if (a.id > b.id) return 1;
          else return 0;
        });

        this.options = this.options.sort();
        this.loaded_val = (this.Pokemons.length / this.total_count) * 100;
        if (this.total_count == this.Pokemons.length) this.loading = false;
      }
    });
  }

  changeImg(id: any, index: Number) {
    let img = document.getElementById('poke_' + id) as HTMLImageElement;
    if (img.src.includes('shiny')) {
      img.src = this.Pokemons[(index as number) - 1].img as string;
    } else {
      img.src = this.Pokemons[(index as number) - 1].imgShiny as string;
    }
  }

  emptyFilter() {
    this.filteredPokemons = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterPoke(''))
    );
  }
}
