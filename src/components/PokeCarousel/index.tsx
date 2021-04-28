import { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { CarouselButton, PageButton } from "./styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { Container, Grid, GridSize } from "@material-ui/core";
import PokemonViewCentered from "../PokemonView/Centered";

export default function PokeCarousel() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(0);
  const limit = getItemsPerPage();

  function getItemsPerPage() {
    const width = window.innerWidth;

    if (width > 1024 && width < 3000) {
      return 4;
    }
    if (width > 464 && width < 1024) {
      return 2;
    }
    if (width > 0 && width < 464) {
      return 1;
    } else {
      return 4;
    }
  }

  function handleNextPage() {
    if (page === Math.ceil(pokemons.length / limit) - 1) return;

    setPage((prev) => prev + 1);
  }

  function handlePreviousPage() {
    if (page === 0) return;

    setPage((prev) => prev - 1);
  }

  function handleSetPage(page: number) {
    return () => {
      setPage(page);
    };
  }

  async function getRandomPokemons() {
    const db = useIndexedDB("pokemons");
    const pokemons = (await db.getAll()).sort(() => 0.5 - Math.random());

    setPokemons(pokemons.slice(0, 15));
  }

  useEffect(() => {
    getRandomPokemons();
  }, []);

  return (
    <Container style={{ marginTop: 80 }}>
      <Grid container justify="center" alignItems="center" spacing={4}>
        <Grid item xs={1}>
          <CarouselButton onClick={handlePreviousPage}>
            <KeyboardArrowLeft />
          </CarouselButton>
        </Grid>

        <Grid item xs={10}>
          <Grid container spacing={4}>
            {pokemons.length
              ? pokemons.slice(limit * page, limit * (page + 1)).map((poke) => (
                  <Grid
                    item
                    xs={Math.ceil(12 / limit) as GridSize}
                    key={poke.name}
                  >
                    <PokemonViewCentered pokemon={poke} />
                  </Grid>
                ))
              : null}
          </Grid>
        </Grid>

        <Grid item xs={1}>
          <CarouselButton onClick={handleNextPage}>
            <KeyboardArrowRight />
          </CarouselButton>
        </Grid>

        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {new Array(Math.ceil(pokemons.length / limit))
            .fill(1)
            .map((_item, index) => (
              <PageButton
                onClick={handleSetPage(index)}
                key={"page-" + index}
                $active={page === index}
              />
            ))}
        </Grid>
      </Grid>
    </Container>
  );
}
