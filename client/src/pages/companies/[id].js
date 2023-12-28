import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { COMPANY } from "../../graphql/queries";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
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
  IconButton,
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
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useMutation, useQuery } from "@apollo/client";
import { CreateAssetModal } from "src/utils/create-asset-modal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { EditAssetModal } from "src/utils/edit-asset-modal";
import { DeleteAssetModal } from "src/utils/delete-asset-modal";
import { DELETE_ASSET } from "src/graphql/mutations";

const items = [
  {
    name: "Dragonfly Aviation",
    src: "/assets/logos/Dragonfly.png",
  },
  {
    name: "Advantage Air Travel",
    src: "/assets/logos/advantage.png",
  },
];

const CompanyDetailsPage = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAsset] = useMutation(DELETE_ASSET);
  const router = useRouter();
  const { id } = router.query;
  // Fetch company assets
  const { data, refetch } = useQuery(COMPANY, {
    variables: { companyId: id },
  });

  const companyData = data?.company;
  const logo = companyData ? items.find((item) => item.name === companyData.name) : null;

  // Create new asset Modal pop up functions
  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };
  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };
  const handleEdit = (asset) => {
    setSelectedAsset(asset);
    setEditModalOpen(true); // open Modal for editing
  };
  const handleDelete = async (asset) => {
    try {
      setSelectedAsset(asset);
      setDeleteModalOpen(true);
      await deleteAsset({ variables: { deleteAssetId: selectedAsset.id } });
      setDeleteModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Error deleting asset:", error.message);
    }
  };

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
                  <div>
                    {logo && (
                      <Avatar src={logo.src} variant="square" sx={{ marginBottom: "1rem" }} />
                    )}
                    {companyData && (
                      <Typography align="center" gutterBottom variant="h5">
                        {companyData.name}
                      </Typography>
                    )}
                  </div>
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
                  onClick={handleCreateModalOpen}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  New Asset
                </Button>
              </Stack>
            </Stack>

            {companyData && <Typography variant="body1">{companyData.description}</Typography>}
          </Stack>
        </Container>
      </Box>
      <Card sx={{ marginBottom: "2rem" }}>
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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companyData?.assets.map((asset) => {
                  return (
                    <TableRow hover key={asset.id}>
                      <TableCell>{asset.id}</TableCell>
                      <TableCell>{asset.device}</TableCell>
                      <TableCell>{asset.description}</TableCell>
                      <TableCell>{asset.serialnumber}</TableCell>
                      <TableCell>{asset.assignee}</TableCell>
                      <TableCell>{asset.location}</TableCell>
                      <TableCell>
                        <div style={{ display: "flex" }}>
                          <IconButton color="primary" onClick={() => handleEdit(asset)}>
                            <PencilIcon style={{ height: "20px" }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => handleDelete(asset)}
                          >
                            <TrashIcon style={{ height: "20px" }} />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <Divider />
        <CardActions>
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
      <CreateAssetModal
        isModalOpen={isCreateModalOpen}
        handleModalClose={handleCreateModalClose}
        companyId={id}
        refetch={refetch}
      />
      <EditAssetModal
        isModalOpen={isEditModalOpen}
        handleModalClose={() => setEditModalOpen(false)}
        companyId={id}
        asset={selectedAsset}
        refetch={refetch}
      />
      <DeleteAssetModal
        isModalOpen={isDeleteModalOpen}
        handleModalClose={() => setDeleteModalOpen(false)}
        handleDelete={() => {
          setDeleteModalOpen(false);
          deleteAsset({
            variables: { deleteAssetId: selectedAsset.id },
          });
          refetch();
        }}
      />
    </>
  );
};

CompanyDetailsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CompanyDetailsPage;
