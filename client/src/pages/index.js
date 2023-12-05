import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Unstable_Grid2 as Grid,
  Link,
  Typography,
} from "@mui/material";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  return (
    <>
      <Head>
        <title>Overview | Assets Manager</title>
      </Head>
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Typography variant="h3" gutterBottom sx={{ marginTop: "6rem" }}>
          Welcome to Assets Manager
        </Typography>
        <Box
          maxWidth="md"
          sx={{
            marginTop: "2rem",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" sx={{ marginTop: "3rem" }}>
            Manage your company's assets effortlessly with Asset Manager. Keep track of your assets,
            view company details, and streamline your management process.
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "1rem" }}>
            Explore the features to get started. Make informed decisions about your company's assets
            with Asset Manager.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
