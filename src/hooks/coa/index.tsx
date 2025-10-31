import { useCallback, useMemo } from "react";
import { useLocalStorage } from 'usehooks-ts';
import { axiosQueryClient } from '../../service/api';
import { useAuth } from "../auth/useAuth";

export interface CodeOfAccount {
    code: number;
    title: string;
    type: string;
    balance: number;
}

// fetch list of available COA along with associated information
export default function useProvideCoa() {
  const { isAuthenticated } = useAuth();
  const [coaCached, setCoaCached, removeCoaCached] = useLocalStorage<
    CodeOfAccount[]
  >("coa", []);

  const fetchCoa = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const response = await axiosQueryClient.post("/available-coa/json");
      const data: CodeOfAccount[] = response.data;
      setCoaCached(data);
    } catch (err) {
      console.error("Failed to fetch COA", err);
    }
  }, [setCoaCached, isAuthenticated]);

  const getAccountName: Record<number, string> = useMemo(() => {
    const map: Record<number, string> = {};
    coaCached.forEach((account) => {
      map[account.code] = account.title;
    });
    return map;
  }, [coaCached]);

  const getBalanceType: Record<number, string> = useMemo(() => {
    const map: Record<number, string> = {};
    coaCached.forEach((account) => {
      map[account.code] = account.type;
    });
    return map;
  }, [coaCached]);

  return {
    codeOfAccounts: coaCached,
    getAccountName,
    getBalanceType,
    fetchCoa,
    removeCoaCached,
  };
}
