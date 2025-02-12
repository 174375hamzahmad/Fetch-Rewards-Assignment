import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Dog } from "../models/dogModel";

interface MatchDialogProps {
  open: boolean;
  matchedDog: Dog | null;
  onClose: () => void;
}

export const MatchDialog: React.FC<MatchDialogProps> = ({
  open,
  matchedDog,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Your Match</DialogTitle>
      <DialogContent>
        {matchedDog && (
          <Box sx={{ textAlign: "center" }}>
            <img
              src={matchedDog.img}
              alt={matchedDog.name}
              style={{ maxWidth: "100%", marginBottom: "1rem" }}
            />
            <Typography variant="h6">{matchedDog.name}</Typography>
            <Typography variant="body1">
              {matchedDog.breed} &mdash; Age: {matchedDog.age}
            </Typography>
            <Typography variant="body2">ZIP: {matchedDog.zip_code}</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
