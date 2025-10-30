import { useEffect, useState } from "react";
import { useLocalStorage } from 'usehooks-ts';
import { axiosQueryClient } from '../../service/api';

export interface CodeOfAccount {
    code: number;
    title: string;
    type: string;
}

// fetch list of available COA from Query Service
export default function useProvideCoa() {
  const [codeOfAccounts, setCodeOfAccounts] = useState<CodeOfAccount[]>([]);

  const fetchCoa = async () => {
    try {
      const response = await axiosQueryClient.post('/available-coa/json');
      const data: CodeOfAccount[] = response.data;
      setCodeOfAccounts(data);
      setCoaCached(data);
    } catch (err) {
      console.error('Failed to fetch COA', err);
    }
  };

  const [coaCached, setCoaCached, removeCoaCached] = useLocalStorage<CodeOfAccount[]>('coa', []);

  useEffect(() => {
    if (!coaCached || coaCached.length === 0) {
      fetchCoa();
      
    } else {
      setCodeOfAccounts(coaCached);
    }
  }, [fetchCoa]);

  const coaMap: Record<number, string> = {};
  codeOfAccounts.forEach((coa) => {
    coaMap[coa.code] = coa.title;
  });

  return { coaMap, codeOfAccounts, fetchCoa, removeCoaCached };
}
