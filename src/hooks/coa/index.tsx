import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from 'usehooks-ts';
import { axiosQueryClient } from '../../service/api';

export interface CodeOfAccount {
    code: number;
    title: string;
    type: string;
    balance: number;
}

// fetch list of available COA from Query Service
export default function useProvideCoa() {
  const [codeOfAccounts, setCodeOfAccounts] = useState<CodeOfAccount[]>([]);
  const [coaCached, setCoaCached, removeCoaCached] = useLocalStorage<
    CodeOfAccount[]
  >("coa", []);

  const fetchCoa = useCallback(async () => {
    try {
      const response = await axiosQueryClient.post("/available-coa/json");
      const data: CodeOfAccount[] = response.data;
      setCodeOfAccounts(data);
      setCoaCached(data);
    } catch (err) {
      console.error("Failed to fetch COA", err);
    }
  }, [setCoaCached]);

  useEffect(() => {
    if (!coaCached || coaCached.length === 0) {
      // No cache – fetch from server
      fetchCoa();
    } else {
      // Hydrate from cache immediately
      setCodeOfAccounts(coaCached);
      // Optional: background revalidate
      // void fetchCoa();
    }
  }, [fetchCoa, coaCached]);

  const getAccountName: Record<number, string> = useMemo(() => {
    const map: Record<number, string> = {};
    codeOfAccounts.forEach((account) => {
      map[account.code] = account.title;
    });
    return map;
  }, [codeOfAccounts]);

  const getBalanceType: Record<number, string> = useMemo(() => {
    const map: Record<number, string> = {};
    codeOfAccounts.forEach((account) => {
      map[account.code] = account.type;
    });
    return map;
  }, [codeOfAccounts]);

  return { getAccountName, getBalanceType, codeOfAccounts, fetchCoa, removeCoaCached };
}
