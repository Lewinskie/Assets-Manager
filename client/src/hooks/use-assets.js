import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { applyPagination } from "../utils/apply-pagination";
import { ASSETS } from "../graphql/queries";

export const useAssets = (page, rowsPerPage, searchQuery) => {
  const { data } = useQuery(ASSETS);

  return useMemo(() => {
    // Assuming 'assets' is the array you want to paginate
    let assets = data?.assets || [];

    // Filter assets based on searchQuery
    if (searchQuery) {
      const normalizedSearchQuery = searchQuery.toLowerCase();
      assets = assets.filter((asset) =>
        Object.values(asset).join(" ").toLowerCase().includes(normalizedSearchQuery.toLowerCase())
      );
    }

    return applyPagination(assets, page, rowsPerPage);
  }, [data, page, rowsPerPage, searchQuery]);
};
