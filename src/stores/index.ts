import { makeAutoObservable } from "mobx";
import api from "../services/api";
import typeColors from "../services/typeColors";
import { useIndexedDB } from "react-indexed-db";
import firebase from "firebase/app";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  loading = false;
  types: ShortType[] = [];
  filters: PokemonFilters = {
    name: "",
    type: "",
  };
  alert: IAlert = {
    open: false,
    text: "",
    severity: "error",
  };
  user: User | null = null;

  setLoading(bool: boolean) {
    this.loading = bool;
  }

  setFilters(filters: PokemonFilters) {
    this.filters = filters;
  }

  setTypes(types: ShortType[]) {
    this.types = types;
  }

  setAlert(text: string, severity: Color) {
    this.alert = { open: true, text, severity };
  }
  clearAlert() {
    this.alert = {
      ...this.alert,
      open: false,
    };
  }

  setUser(user: User) {
    this.user = user;
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

    const { data } = await api.get(`pokemon/${name}`);
    await db.add({
      id: data.id,
      name: data.name,
      types: data.types,
      image: data.sprites.front_default,
      order: data.order,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities,
    });

    return data;
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

  addPokemon(pokemon: Pokemon) {
    const data = {
      id: pokemon.id,
      image: pokemon.image,
      name: pokemon.name,
      order: pokemon.order,
      height: pokemon.height,
      weight: pokemon.weight,
      types: {} as { [key: string]: unknown },
      abilities: {} as { [key: string]: unknown },
      added_on: new Date().toISOString(),
    };

    pokemon.types.forEach((type) => {
      data.types[type.type.name] = type;
    });

    pokemon.abilities.forEach((ability) => {
      data.abilities[ability.ability.name] = ability;
    });

    firebase
      .database()
      .ref("pokedex/" + this.user?.uid)
      .push(data);
  }

  removePokemon(key: string | null) {
    if (key)
      firebase.database().ref(`pokedex/${this.user?.uid}/${key}`).remove();
  }
}

const store = new Store();
const useStore = () => store;

export default useStore;
