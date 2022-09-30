import * as React from "react";
import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { json } from "react-router-dom";

export const Pokemones = () => {
  const [open, setOpen] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState({});

  const handleOpen = (poke) => {
    axios.get(poke.url).then((respuesta) => {
      setOpen(true);
      setPokemonSeleccionado(respuesta.data);
      console.log(respuesta.data);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((respuesta) => {
        setPokemon(
          respuesta.data.results.map((azul) => {
            const id = azul.url.split("/")[6];
            return {
              name: azul.name,
              url: azul.url,
              imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            };
          })
        );
      });
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
            {pokemon.map((poke) => {
              return (
                <Grid item xs={1}>
                  <Card sx={{ backgroundColor: "cornsilk" }}>
                    <Box sx={{ justifyContent: "center", display: "flex" }}>
                      <img src={poke.imagen} alt="img" />
                    </Box>
                    <Box
                      onClick={() => handleOpen(poke)}
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        p: 3,
                        cursor: "pointer",
                      }}
                    >
                      {poke.name}
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        hola
        {pokemonSeleccionado?.moves?.map((poder) => {
          return <Box>{poder?.move.name}</Box>;
        })}
      </Dialog>
    </Container>
  );
};
