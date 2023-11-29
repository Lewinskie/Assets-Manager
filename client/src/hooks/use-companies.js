import { useMemo } from "react";
import { useQuery } from "@apollo/client";
// import { applyPagination } from "../utils/apply-pagination";
import { COMPANIES } from "../graphql/queries";

export const useCompanies = (searchQuery) => {
  const { data } = useQuery(COMPANIES);

  return useMemo(() => {
    // Assuming 'companies' is the array you want to paginate
    let companies = data?.companies || [];

    // Filter assets based on searchQuery
    if (searchQuery) {
      const normalizedSearchQuery = searchQuery.toLowerCase();
      companies = companies.filter((company) =>
        Object.values(company).join(" ").toLowerCase().includes(normalizedSearchQuery.toLowerCase())
      );
    }

    return applyPagination(companies, page, rowsPerPage);
  }, [data, page, rowsPerPage, searchQuery]);
};
