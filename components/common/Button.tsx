import { Button } from "@mui/material";
import React from "react";

interface Props {
  text: string;
  type?: "DEFAULT" | "SMALL" | "LARGE";
  invert?: boolean;
  link?: string;
}

const BasicButton: React.FC<Props> = ({
  text,
  type = "DEFAULT",
  invert = false,
  link,
}) => {
  let variant: "text" | "contained" | "outlined" = "contained",
    size: "small" | "medium" | "large" = "medium";

  if (invert) {
    variant = "outlined";
  }

  if ((type = "SMALL")) size = "small";
  if ((type = "LARGE")) size = "large";

  return (
    <Button
      variant={variant}
      href={link}
      size={size}
      disableElevation
      color="primary"
    >
      {text}
    </Button>
  );
};

export default BasicButton;
