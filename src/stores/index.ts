import { makeAutoObservable } from "mobx";
import api from "../services/api";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  types: PokeType[] = [];
  setTypes(types: PokeType[]) {
    this.types = types;
  }

  pokemons: ShortPokemon[] = [];
  setPokemons(pokemons: ShortPokemon[]) {
    this.pokemons = pokemons;
  }
  getPokemons(limit: number, page: number): ShortPokemon[] {
    return this.pokemons.slice(limit * page, limit * (page + 1));
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

      this.setPokemons(response.data.results);
    } catch (err) {
      console.log(err);
      this.setAlert("Ocorreu um erro ao capturar os pokemons :(", "error");
    }
  }

  async fetchOnePokemon(name: string): Promise<Pokemon> {
    const response = await api.get(`pokemon/${name}`);

    return response.data;
  }
}

const store = new Store();
const useStore = () => store;

export default useStore;
