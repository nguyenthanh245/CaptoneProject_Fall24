import { useQuery } from "@tanstack/react-query";
import ContractPdf from "./ContractPdf";
import { getCombinedInfo } from "../services/soc-manager-api";

export default function ContractModal({ pentestId }: { pentestId: number }) {
  const { data } = useQuery({
    queryKey: ["fetchCombinedInfo", pentestId],
    queryFn: async () => {
      const response = await getCombinedInfo({ pentestRequestId: pentestId });
      return response;
    },
  });
  return (
      <div className="flex justify-center">{data?.data && <ContractPdf dataContract={data.data } />}</div>
  );
}
