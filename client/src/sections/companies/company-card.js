import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { DeleteCompanyModal } from "src/utils/delete-company-modal";

export const CompanyCard = (props) => {
  const { company, logos, onView, onDelete } = props;
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  // Find the corresponding logo based on the company's name
  const logo = logos.find((item) => item.name === company.name);
  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteConfirm = async () => {
    await onDelete(company.id);
    setDeleteModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 3,
            }}
          >
            {logo && <Avatar src={logo.src} variant="square" />}
          </Box>
          <Typography align="center" gutterBottom variant="h5">
            {company.name}
          </Typography>
          {company && <Typography variant="body1">{company.description}</Typography>}
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={1}
          sx={{ p: 2 }}
        >
          <Stack alignItems="center" direction="row" spacing={1}>
            <Button
              sx={{
                color: "gray",
              }}
              onClick={onView}
              startIcon={
                <SvgIcon color="action" fontSize="small">
                  <EyeIcon />
                </SvgIcon>
              }
            >
              <Typography color="text.secondary" display="inline" variant="body2">
                view
              </Typography>
            </Button>
            <Button
              sx={{ color: "gray" }}
              onClick={handleDeleteClick}
              startIcon={
                <SvgIcon color="action" fontSize="small">
                  <TrashIcon />
                </SvgIcon>
              }
            >
              <Typography color="text.secondary" display="inline" variant="body2">
                delete
              </Typography>
            </Button>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={1}>
            <SvgIcon color="action" fontSize="small">
              <ArrowDownOnSquareIcon />
            </SvgIcon>
            <Typography color="text.secondary" display="inline" variant="body2">
              {company.assets.length === 1
                ? `${company.assets.length} asset`
                : `${company.assets.length} assets`}
            </Typography>
          </Stack>
        </Stack>
      </Card>
      <DeleteCompanyModal
        isOpen={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        companyName={company.name}
      />
    </>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};
