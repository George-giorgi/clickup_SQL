"use client";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LeftArrow = () => {
  return (
    <div>
      <IconButton
        sx={{
          width: 30,
          height: 30,
          backgroundColor: "#0f172a",
          color: "white",
          "&:hover": { backgroundColor: "darkblue" },
        }}
        aria-label="Go back"
      >
        <ArrowBackIcon sx={{ color: "white" }} />
      </IconButton>
    </div>
  );
};

export default LeftArrow;
