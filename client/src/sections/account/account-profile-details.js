import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useAuth } from "src/context/auth-context";

export const AccountProfileDetails = () => {
  const { user, updateUser, isLoading } = useAuth();
  const [values, setValues] = useState({
    username: user.username,
    email: user.email,
    password: "",
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      // Call updateUser mutation to update the deets
      try {
        await updateUser({
          updateUserId: user.id,
          username: values.username,
          email: values.email,
          password: values.password,
        });
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    [values, updateUser, user.id]
  );

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the username"
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  required
                  value={values.username}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  required
                  value={values.password}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save details"}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
