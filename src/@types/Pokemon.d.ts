interface GETPokemons {
  results: ShortPokemon[];
}

interface PokeType {
  url: string;
  name: string;
}

interface ShortPokemon {
  name: string;
  url: string;
}

interface Pokemon {
  id: number;
  name: string;
  weight: number;
}
