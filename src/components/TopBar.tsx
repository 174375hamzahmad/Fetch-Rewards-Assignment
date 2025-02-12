import React from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";


interface TopBarProps {
  breeds: string[];
  selectedBreeds: string[];
  onBreedChange: (event: SelectChangeEvent<string[]>) => void;
  sortOrder: "asc" | "desc";
  onToggleSort: () => void;
  onLogout: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  breeds,
  selectedBreeds,
  onBreedChange,
  sortOrder,
  onToggleSort,
  onLogout,
}) => {

  return (  
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="breed-select-label">Breeds</InputLabel>
          <Select
            labelId="breed-select-label"
            id="breed-select"
            multiple
            value={selectedBreeds}
            onChange={onBreedChange}
            input={<OutlinedInput label="Breeds" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {breeds && breeds.length > 0 ? (
              breeds.map((breed) => (
                <MenuItem
                  key={breed}
                  value={breed}
                
                >
                  {breed}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No entries</MenuItem>
            )}
          </Select>
        </FormControl>
        <Button sx={{ mt: 2, ml: 2 }} variant="outlined" onClick={onToggleSort}>
          Toggle Sort ({sortOrder})
        </Button>
      </Box>

      <Button sx={{ m: 1 }} variant="contained" onClick={onLogout}>
        Logout
      </Button>
    </Box>
  );
};
