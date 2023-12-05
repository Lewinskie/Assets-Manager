import PropTypes from "prop-types";

import { Box, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { Chart } from "src/components/chart";

export const OverviewChart = (props) => {
  const { title, data, chartKey, chartType, sx, dataKey, chartSeries } = props;
  // console.log("Data:", data);
  // console.log("ChartKey:", chartKey);
  // console.log("DataKey:", dataKey);
  // console.log("ChartType:", chartType);

  return (
    <Card sx={sx}>
      <CardHeader title={title} />
      <CardContent>
        <Chart
          height={300}
          // options={chartOptions}
          series={data?.map((item) => item[chartKey])}
          type="donut"
          width="100%"
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {data.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                {/* Add your company icon/component here */}
                <Typography sx={{ my: 1 }} variant="h6">
                  {item.name}
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  {item[chartKey]}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  chartKey: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  chartType: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
