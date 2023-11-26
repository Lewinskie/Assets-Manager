import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { COMPANY } from "../../graphql/queries";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Container,
  Divider,
  Grid,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { CompaniesSearch } from "src/sections/companies/companies-search";
import { useQuery } from "@apollo/client";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};
const items = [
  {
    name: "Dragonfly Aviation",
    src: "/assets/logos/Dragonfly.png",
    description:
      "Dragonfly Aviation Limited is an aviation company specializing in passenger and cargo services within Africa, the Indian Ocean Islands, and the Middle East.",
  },
  {
    name: "Advantage Air Travel",
    src: "/assets/logos/advantage.png",
    description:
      "Advantage Air Travel Limited is an aviation company specializing in the provision of cargo freight services in East Africa, the Horn of Africa and regionally in the continent.",
  },
];

const CompanyDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  // Fetch company assets
  const { data, loading, error } = useQuery(COMPANY, {
    variables: { companyId: id },
  });
  console.log(data);

  const companyData = data?.company;
  const logo = companyData ? items.find((item) => item.name === companyData.name) : null;
  console.log(logo);

  return (
    <>
      <Head>
        <title>Company | Assets Manager</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    pb: 3,
                  }}
                >
                  {logo && (
                    <div>
                      <Avatar src={logo.src} variant="square" sx={{ marginBottom: "1rem" }} />
                      <Typography align="center" gutterBottom variant="h5">
                        {companyData.name}
                      </Typography>
                    </div>
                  )}
                </Box>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack alignItems="center" direction="row" spacing={1} justifyContent="space-between">
                <Button
                  color="inherit"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  }
                >
                  Export
                </Button>
              </Stack>
              <Stack alignItems="center" direction="row">
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>

            {logo && <Typography variant="body1">{logo.description}</Typography>}
          </Stack>
        </Container>
      </Box>
      <Card>
        <CardHeader title="COMPANY ASSETS" />
        <Scrollbar sx={{ flexGrow: 1 }}>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Device</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Serial No</TableCell>
                  <TableCell>Assignee</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companyData?.assets.map((asset) => {
                  // const createdAt = format(order.createdAt, "dd/MM/yyyy");
                  return (
                    <TableRow hover key={asset.id}>
                      <TableCell>{asset.id}</TableCell>
                      <TableCell>{asset.device}</TableCell>
                      <TableCell>{asset.description}</TableCell>
                      <TableCell>{asset.serialnumber}</TableCell>
                      <TableCell>{asset.assignee}</TableCell>
                      <TableCell>{asset.location}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            color="inherit"
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowRightIcon />
              </SvgIcon>
            }
            size="small"
            variant="text"
          >
            View all
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

CompanyDetailsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CompanyDetailsPage;