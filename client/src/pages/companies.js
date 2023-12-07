import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Unstable_TrapFocus as FocusTrap,
  Unstable_Grid2 as Grid,
  FormLabel,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompanyCard } from "src/sections/companies/company-card";
import { CompaniesSearch } from "src/sections/companies/companies-search";
import { useQuery, useMutation } from "@apollo/client";
import { COMPANIES } from "src/graphql/queries";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CREATE_COMPANY, DELETE_COMPANY } from "src/graphql/mutations";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

const logos = [
  {
    name: "Dragonfly Aviation",
    src: "/assets/logos/Dragonfly.png",
  },
  {
    name: "Advantage Air Travel",
    src: "/assets/logos/advantage.png",
  },
  {
    name: "Grand Oasis Hotel Wajir",
    src: "/assets/logos/grandoasis.png",
  },
];
const generic = {
  name: "default",
  src: "/assets/logos/default-logo.png",
};
// Yup validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Company name required"),
  // description: Yup.string().required("Description required"),
});

const Page = () => {
  const { data, refetch } = useQuery(COMPANIES);
  let companies = data?.companies || [];
  const [searchQuery, setSearchQuery] = useState("");
  if (searchQuery) {
    const normalizedSearchQuery = searchQuery.toLowerCase();
    companies = companies.filter((company) =>
      Object.values(company).join(" ").toLowerCase().includes(normalizedSearchQuery.toLowerCase())
    );
  }
  const [isModalOpen, setModalOpen] = useState(false);
  const [createCompany] = useMutation(CREATE_COMPANY, { refetchQueries: [{ query: COMPANIES }] });
  const [deleteCompany] = useMutation(DELETE_COMPANY);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      // description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Call the mutation with new company details
        await createCompany({ variables: values });

        // Close the modal after adding the company
        setModalOpen(false);
        formik.resetForm();
      } catch (error) {
        console.error("Error adding new company:", error.message);
      }
    },
  });

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
    },
    [setSearchQuery]
  );
  const handleDelete = async (companyId) => {
    try {
      console.log("deleting company with id:", companyId);
      await deleteCompany({ variables: { deleteCompanyId: companyId } });
      console.log("Deletion successful");
      refetch();
    } catch (error) {
      console.error("Error deleting company:", error.message);
    }
  };

  const handleViewClick = (companyId) => {
    router.push(`/companies/${companyId}`);
  };

  return (
    <>
      <Head>
        <title>Companies | Assets Manager</title>
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
                <Typography variant="h4">Companies</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
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
              </Stack>
              <div>
                <Button
                  onClick={handleModalOpen}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CompaniesSearch onSearch={handleSearch} />
            <Grid container spacing={3}>
              {companies.map((company) => (
                <Grid xs={12} md={6} lg={4} key={company.id}>
                  <CompanyCard
                    company={company}
                    logos={logos}
                    onDelete={() => handleDelete(company.id)}
                    onView={() => handleViewClick(company.id)}
                    generic={generic}
                  />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
      {/* Add new Company Modal  */}
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="add-company-modal"
        aria-describedby="add a new company to the list"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <FocusTrap open={isModalOpen}>
          <Dialog open={isModalOpen} onClose={handleModalClose}>
            <DialogTitle id="form-dialog-title">Add New Company</DialogTitle>
            <DialogContent>
              <FormLabel>Company Name</FormLabel>
              <TextField
                fullWidth
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <FormLabel>Description</FormLabel>
              <TextField
                multiline
                rows={5}
                fullWidth
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose} color="primary">
                Cancel
              </Button>
              <Button onClick={formik.handleSubmit} color="primary">
                Add company
              </Button>
            </DialogActions>
          </Dialog>
        </FocusTrap>
      </Modal>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
