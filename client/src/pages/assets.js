import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AssetsTable } from "src/sections/assets/assets-table";
import { AssetsSearch } from "src/sections/assets/assets-search";
import { useAssets } from "../hooks/use-assets";
import { useAssetsIds } from "../hooks/use-assets-ids";
import Papa from "papaparse";

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const assets = useAssets(page, rowsPerPage, searchQuery);
  const assetsIds = useAssetsIds(assets);

  const handlePageChange = useCallback((event, value) => {
    setPage(value - 1); // MUI uses 1- based index while react uses 0 based index
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the 1st page when changing rowsPerPage
  }, []);

  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      setPage(0);
    },
    [setSearchQuery, setPage]
  );

  // Function to export all assets to CSV
  const exportToCSV = useCallback(() => {
    const csvData = Papa.unparse(assets);
    const blob = new Blob([csvData], { type: "data:text/csv;charset=utf-8," });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    if (link.download !== undefined) {
      link.setAttribute("href", url);
      link.setAttribute("download", "assets.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Revoke the object URL to free up resources
      URL.revokeObjectURL(url);
    }
  }, [assets]);

  return (
    <>
      <Head>
        <title>All Assets | Assets Manager</title>
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
                <Typography variant="h4">All Assets</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                    onClick={exportToCSV}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <AssetsSearch onSearch={handleSearch} />
            <AssetsTable
              count={assets.length}
              items={assets}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
