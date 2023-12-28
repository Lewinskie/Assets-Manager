import { Avatar, Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useAuth } from "src/context/auth-context";
import { capitalizeFirstLetter } from "src/utils/capitalize-first-letter";

const defaults = {
  avatar: "/assets/avatars/avatar-anika-visser.png",
};

export const AccountProfile = () => {
  const { user } = useAuth();
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={defaults.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h5">
            {capitalizeFirstLetter(user.username)}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};
