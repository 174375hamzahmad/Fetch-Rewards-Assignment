import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface PaginationControlsProps {
  totalResults: number;
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  totalResults,
  currentPage,
  totalPages,
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
}) => {
  return (
    <Box
      sx={{
        m: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        Total Results: {totalResults}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Page {currentPage} of {totalPages}
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="outlined" disabled={prevDisabled} onClick={onPrev}>
          Previous
        </Button>
        <Button variant="outlined" disabled={nextDisabled} onClick={onNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};
