import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
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
import { convertTimestampToDate } from "src/utils/get-date";

export const CompanyCard = (props) => {
  const { company, logos } = props;

  // Find the corresponding logo based on the company's name
  const logo = logos.find((item) => item.name === company.name);
  const timestamp = company.updatedAt;
  const time = convertTimestampToDate(timestamp);

  return (
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
        {logo && <Typography variant="body1">{logo.description}</Typography>}
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            last updated at {time}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ArrowDownOnSquareIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {company.assets.length === 1
              ? `${company.assets.length} Asset`
              : `${company.assets.length} Assets`}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};
