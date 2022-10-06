import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ReactCardFlip from "react-card-flip";
import axios from "axios";
import Chip from "@mui/material/Chip";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";

export const PokemonCard = ({ pokemon }) => {
  const [information, setInformation] = useState({});
  const [flip, setFlip] = useState(false);

  const onFlip = (f) => {
    setFlip(f);
    // * Si no hay "information"
    if (Object.keys(information).length === 0) {
      axios.get(pokemon.url).then((respuesta) => {
        setTimeout(() => {
          setInformation(respuesta.data);
        }, 250);
      });
    }
  };

  return (
    <Grid item xs={1} key={pokemon.id}>
      <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
        <PokemonCardFront pokemon={pokemon} setFlip={onFlip} />
        <PokemonCardBack pokemon={information} setFlip={onFlip} />
      </ReactCardFlip>
    </Grid>
  );
};

const PokemonCardFront = ({ pokemon, setFlip }) => {
  return (
    <Card sx={{ backgroundColor: "cornsilk" }} onClick={() => setFlip(true)}>
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        <img src={pokemon.imagen} alt="img" />
      </Box>
      <Box
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          p: 3,
          cursor: "pointer",
        }}
      >
        {pokemon.name}
      </Box>
    </Card>
  );
};

const PokemonCardBack = ({ pokemon, setFlip }) => {
  const [mostrarTodos, setMostrarTodos] = useState(false); // * Muestra todos o solo 5 poderes.
  if (Object.keys(pokemon).length === 0) return <LinearProgress />; // * Si no hay pokemon muestra cargando
  const moves = pokemon.moves.slice(
    0,
    mostrarTodos ? pokemon.moves.length - 1 : 5
  ); //* Slice y if para mostrar todos o 5

  return (
    <Card sx={{ backgroundColor: "cornsilk" }} onClick={() => setFlip(false)}>
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        <img src={pokemon?.sprites?.front_shiny} alt="img" />
        <img src={pokemon?.sprites?.back_shiny} alt="img" />
      </Box>
      <Box
        sx={{
          ml: 3,
          p: 2,
        }}
      >
        <Grid container columns={{ xs: 2, sm: 2, md: 2, lg: 2 }} spacing={1}>
          <b>Tipo:</b>
          {pokemon.types.map((type) => {
            return <Box sx={{ ml: 3, mb: 1 }}>{type?.type.name}</Box>;
          })}
        </Grid>
      </Box>
      <Box
        sx={{
          p: 1,
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignSelf: "center",
            mt: -0.5,
          }}
        >
          <Fab
            size="small"
            color="success"
            aria-label="add"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMostrarTodos(!mostrarTodos);
            }}
          >
            {mostrarTodos ? <CloseIcon /> : <AddIcon />}
          </Fab>
        </Box>

        {moves?.map((poder) => {
          return <Chip label={poder?.move.name} />;
        })}
      </Box>
    </Card>
  );
};
