import Head from "next/head";
import { Container, Unstable_Grid2 as Grid, Typography, useMediaQuery } from "@mui/material";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <div
      style={{
        background: `url(/assets/background.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <Head>
        <title>Overview | Assets Manager</title>
      </Head>
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container sx={{ height: "89vh" }}>
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: isSmallScreen ? "center" : "left",
            }}
          >
            <>
              <Typography variant="h3" gutterBottom color="#1C2536">
                Welcome to Assets Manager
              </Typography>
              <Typography variant="body1" color="#1C2536" sx={{ marginTop: "3rem" }}>
                Manage your company's assets effortlessly with Asset Manager. Keep track of your
                assets, view company details, and streamline your inventory management process.
              </Typography>
              <Typography variant="body1" color="#1C2536" sx={{ marginTop: "1rem" }}>
                Explore the features to get started. Make informed decisions about your company's
                assets with Asset Manager.
              </Typography>
            </>
          </Grid>
          {!isSmallScreen && (
            <Grid
              item
              md={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // width: "100%",
              }}
            >
              <div style={{ maxWidth: "100%" }}>
                <img src="/assets/overview.svg" style={{ width: "100%" }} />
              </div>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
