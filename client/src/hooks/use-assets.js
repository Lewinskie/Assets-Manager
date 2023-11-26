import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { applyPagination } from "../utils/apply-pagination";
import { ASSETS } from "../graphql/queries";

export const useAssets = (page, rowsPerPage) => {
  const { data } = useQuery(ASSETS);

  return useMemo(() => {
    // Assuming 'assets' is the array you want to paginate
    const assets = data?.assets || [];

    return applyPagination(assets, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};
