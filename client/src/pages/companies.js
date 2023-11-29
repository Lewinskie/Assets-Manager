import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { format } from "date-fns";
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
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CREATE_COMPANY } from "src/graphql/mutations";
import { useCallback, useState } from "react";

const logos = [
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
// Yup validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Company name required"),
  // description: Yup.string().required("Description required"),
});

const Page = () => {
  const { data } = useQuery(COMPANIES);
  let companies = data?.companies || [];
  const [searchQuery, setSearchQuery] = useState("");
  if (searchQuery) {
    const normalizedSearchQuery = searchQuery.toLowerCase();
    companies = companies.filter((company) =>
      Object.values(company).join(" ").toLowerCase().includes(normalizedSearchQuery.toLowerCase())
    );
  }
  const [isModalOpen, setModalOpen] = useState(false);
  const [createCompany] = useMutation(CREATE_COMPANY);

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
      // setPage(0);
    },
    [
      setSearchQuery,
      // setPage
    ]
  );

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
                  <Link
                    href={`/companies/${company.id}`}
                    passHref
                    style={{ textDecoration: "none" }}
                  >
                    <CompanyCard company={company} logos={logos} />
                  </Link>
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
              {/* <FormLabel>Description</FormLabel>
          <TextField
          multiline
          rows={5}
          fullWidth
          id="description"
          name='description'
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          /> */}
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
