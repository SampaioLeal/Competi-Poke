interface GETPokemons {
  results: ShortPokemon[];
}

interface ShortType {
  url: string;
  name: string;
}

interface ShortPokemon {
  name: string;
  url: string;
}

interface PokeType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  weight: number;
  order: number;

  types: PokeType[];
  image: string;
}

interface TypeColors {
  [key: string]: string;
}

interface PokemonFilters {
  name: SelectRow["value"];
  type: SelectRow["value"];
}
