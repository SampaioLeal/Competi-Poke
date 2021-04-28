import { normalizeName } from "../../services/normalizeName";
import useStore from "../../stores";
import { View, Name, Order, Container, Type, TypesContainer } from "./styles";

interface PokemonViewProps {
  pokemon: Pokemon;
}

export default function PokemonView({ pokemon }: PokemonViewProps) {
  const store = useStore();

  return (
    <Container>
      <View>
        <img src={pokemon.image || ""} width="150px" />
        <Order>{pokemon.order}</Order>

        <TypesContainer>
          {pokemon.types.map((type) => {
            return (
              <Type
                key={type.type.name}
                color={store.getTypeColor(type.type.name)}
              >
                {normalizeName(type.type.name)}
              </Type>
            );
          })}
        </TypesContainer>
      </View>
      <Name>{normalizeName(pokemon.name)}</Name>
    </Container>
  );
}
