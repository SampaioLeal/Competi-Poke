import { makeAutoObservable } from "mobx";
import api from "../services/api";
import typeColors from "../services/typeColors";
import { useIndexedDB } from "react-indexed-db";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  loading = false;
  setLoading(bool: boolean) {
    this.loading = bool;
  }

  filters: PokemonFilters = {
    name: "",
    type: "",
  };
  setFilters(filters: PokemonFilters) {
    this.filters = filters;
  }

  types: ShortType[] = [];
  setTypes(types: ShortType[]) {
    this.types = types;
  }

  alert: IAlert = {
    open: false,
    text: "",
    severity: "error",
  };
  setAlert(text: string, severity: Color) {
    this.alert = { open: true, text, severity };
  }
  clearAlert() {
    this.alert = {
      ...this.alert,
      open: false,
    };
  }

  getTypeColor(type: string) {
    return typeColors[type];
  }

  async fetchTypes() {
    try {
      const response = await api.get("type");

      this.setTypes(response.data.results);
    } catch (err) {
      this.setAlert(
        "Ocorreu um erro ao capturar os tipos de pokemons :(",
        "error"
      );
    }
  }

  async fetchPokemons() {
    try {
      const response = await api.get<GETPokemons>("pokemon", {
        params: {
          limit: 1200,
        },
      });

      return response.data.results;
    } catch (err) {
      console.log(err);
      this.setAlert("Ocorreu um erro ao capturar os pokemons :(", "error");
      return;
    }
  }

  async fetchOnePokemon(name: string): Promise<Pokemon> {
    const db = useIndexedDB("pokemons");
    const pokemon: Pokemon | undefined = await db.getByIndex("name", name);

    if (pokemon) {
      return pokemon;
    }

    const response = await api.get(`pokemon/${name}`);
    await db.add({
      id: response.data.id,
      name: response.data.name,
      types: response.data.types,
      image: response.data.sprites.front_default,
      order: response.data.order,
    });

    return response.data;
  }

  async fetchAllPokemons() {
    const pokes = await this.fetchPokemons();

    if (pokes) {
      const promises = pokes.map((poke) => this.fetchOnePokemon(poke.name));

      await Promise.all(promises);
    }
  }

  async getPokemons(
    limit: number,
    page: number
  ): Promise<{ results: Pokemon[]; total: number } | undefined> {
    try {
      const db = useIndexedDB("pokemons");
      let pokemons = await db.getAll();

      if (this.filters.type) {
        pokemons = pokemons.filter((pokemon: Pokemon) =>
          pokemon.types.some((type) => type.type.name === this.filters.type)
        );
      }

      if (this.filters.name) {
        pokemons = pokemons.filter((pokemon: Pokemon) =>
          pokemon.name.includes(String(this.filters.name))
        );
      }

      return {
        results: pokemons.slice(limit * page, limit * (page + 1)),
        total: pokemons.length,
      };
    } catch (err) {
      console.log(err);
      this.setAlert("Ocorreu um erro ao capturar os pokemons :(", "error");

      return;
    }
  }
}

const store = new Store();
const useStore = () => store;

export default useStore;
