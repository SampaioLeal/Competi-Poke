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

interface Ability {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  order: number;
  abilities: Ability[];

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
