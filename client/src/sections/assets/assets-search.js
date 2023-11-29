import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { useEffect, useState } from "react";

export const AssetsSearch = (props) => {
  const { onSearch } = props;
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    // Notify the parent component about search value change
    onSearch(searchValue);
  }, [onSearch, searchValue]);
  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search asset"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 500 }}
      />
    </Card>
  );
};
