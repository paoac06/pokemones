import * as React from "react";
import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { PokemonCard } from "../PokemonCard";

export const Pokemones = () => {
  const [pokemones, setPokemones] = useState([]);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();

  const obtenerPokemones = (
    url = "https://pokeapi.co/api/v2/pokemon?limit=20"
  ) => {
    axios.get(url).then((respuesta) => {
      setPokemones(
        respuesta.data.results.map((azul) => {
          const id = azul.url.split("/")[6];
          return {
            name: azul.name,
            url: azul.url,
            imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            types: `https://pokeapi.co/api/v2/type/${id}/`,
          };
        })
      );
      setNextUrl(respuesta.data.next);
      setPrevUrl(respuesta.data.previous);
    });
  };

  useEffect(() => {
    obtenerPokemones();
  }, []);

  return (
    <Container sx={{ pb: 10 }}>
      <Box sx={{ mt: 10 }}>
        <Typography
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            p: 2,
            fontSize: "20px",
          }}
        >
          Pokemones
        </Typography>
        <Box>
          <Grid container columns={{ xs: 2, sm: 2, md: 4, lg: 4 }} spacing={3}>
            {pokemones.map((poke) => {
              return <PokemonCard pokemon={poke} />;
            })}
          </Grid>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Stack spacing={2} direction="row">
          <Button
            disabled={prevUrl == null}
            variant="contained"
            onClick={() => {
              obtenerPokemones(prevUrl);
            }}
          >
            Anterior
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              obtenerPokemones(nextUrl);
            }}
          >
            Siguiente
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
