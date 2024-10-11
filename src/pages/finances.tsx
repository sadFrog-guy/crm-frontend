// @ts-nocheck
import { useSelector } from "react-redux";

import FinanceToolbar from "@/components/FinanceToolbar";
import Heading from "@/components/Heading";
import Margin from "@/components/Margin";
import TableFinances from "@/components/TableFinances";
import usePageLabel from "@/hooks/usePageLabel";
import Template from "@/layouts/template";
import { useGetFinancesQuery } from "@/services/financesAPI";

export default function FinancesPage() {
  const pageLabel = usePageLabel();
  const branchId = useSelector((state) => state.branch.branchId);
  const {
    data: finances,
    isError,
    isLoading,
  } = useGetFinancesQuery({ id: branchId, type: "branch" });

  return (
    <Template>
      <div>
        <Heading>{pageLabel}</Heading>

        <Margin direction="b" value={30} />

        <FinanceToolbar />

        <Margin direction="b" value={30} />

        <TableFinances
          finances={finances || []}
          isError={isError}
          isLoading={isLoading}
        />
      </div>
    </Template>
  );
}
