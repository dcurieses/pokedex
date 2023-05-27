export interface Stats {
  name: String;
  base_stat: Number;
  effort: Number;
}

export interface Pokemon {
  id: Number;
  img: String;
  imgShiny: String;
  nombre: String;
  tipo: String[];
  peso: Number;
  altura: Number;
  stats: Stats[];
  color: String;
}
