import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { Dog } from "../models/dogModel";

interface FavoriteListProps {
  favorites: Dog[]; // Now expecting an array of Dog objects
}

export const FavoriteList: React.FC<FavoriteListProps> = ({ favorites }) => {
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h6">Favorite Dogs:</Typography>
      {favorites.length === 0 ? (
        <Typography variant="body2">No favorites selected.</Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          {favorites.map((dog) => (
            <Chip key={dog.id} label={dog.name} />
          ))}
        </Box>
      )}
    </Box>
  );
};
