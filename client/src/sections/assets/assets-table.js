import PropTypes from "prop-types";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

export const AssetsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">ID</TableCell>
                <TableCell>Device</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Company ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((asset) => {
                return (
                  <TableRow hover key={asset.id}>
                    <TableCell>{asset.id}</TableCell>
                    <TableCell>{asset.device}</TableCell>
                    <TableCell>{asset.description}</TableCell>
                    <TableCell>{asset.serialnumber}</TableCell>
                    <TableCell>{asset.assignee}</TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>{asset.companyId}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>

      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 30, 50, 100, 250, 400, 700]}
      />
    </Card>
  );
};

AssetsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
