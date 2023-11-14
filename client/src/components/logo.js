import { useTheme } from "@mui/material/styles";

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <img
      alt="cloud"
      src="/assets/logos/cloud.svg"
      fill={fillColor}
      style={{ height: "50px", width: "auto", marginRight: "15px" }}
    />
  );
};
