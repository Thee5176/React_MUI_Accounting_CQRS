import { axiosQueryClient } from "../../service/api";
export type formatType = ReturnType<typeof formatData>;

function formatData(
  name: string,
  count: number,
  balance: number,
  coa_list: Map<number, number>
) {
  return {
    name,
    count,
    balance,
    coa_list,
  };
}

// Convert API payload to Map<number, number> (handles plain object or Map)
function toNumericMap(input: unknown): Map<number, number> {
  if (input instanceof Map) return input as Map<number, number>;
  if (input && typeof input === "object") {
    return new Map(
      Object.entries(input as Record<string, unknown>).map(([k, v]) => [
        Number(k),
        typeof v === "number" ? v : Number(v),
      ])
    );
  }
  return new Map();
}

const apiPathBySheet: string[] = [
    "", //null padding for 0 index
    "/api/balance-sheet-statement",
    "/api/profit-loss-statement",
    // TODO "/api/cashflow-statement"
  ];

export const fetchRow = async (
  reportId: number,
  setRows: React.Dispatch<React.SetStateAction<formatType[]>>,
  setNetIncome: React.Dispatch<React.SetStateAction<number>>
) => {
  const data = await axiosQueryClient
    .get(apiPathBySheet[reportId])
    .then((res) => res.data);

  if (data == null) {
    console.warn(
      "API returned null/invalid payload; rows cleared."
    );
    return;
  }

  // console.log("Fetch Financial Data: ", data);

  try {
    // Build rows by parsing json into maps
    const entries = Object.entries(data as unknown as Record<string, unknown>);
    const rowsData: formatType[] = entries
      // check for list of json object to be parsed into map
      .filter(([, val]) => val != null && typeof val === "object" && !Array.isArray(val))
      
      .map(([name, section]) => {
        // parse object to map
        const mapped = toNumericMap(section);
        
        let total = 0;
        for (const v of mapped.values()) {
          total += v;
        }

        return formatData(name, mapped.size, total, mapped);
      });
    setRows(rowsData);

    // set net income for profit-loss statement
    if (reportId === 2 ) {
      setNetIncome(data["netIncome"] ?? 0);
    }

  } catch (e) {
    console.error("Transform Data Failed", e);
  }
};

export async function fetchOutstanding(
 listOfCoa: readonly number[]
) {
  const data = await axiosQueryClient
    .post("/balance/json", listOfCoa)
    .then((res) => res.data);

  // console.log("fetch param: ", listOfCoa);
  // console.log("Account Balance Data: ", data);

  const map = new Map<number, number>();
  if (Array.isArray(data)) {
    for (const { coa, balance } of data) {
      map.set(Number(coa), Number(balance));
    }
  }

  // Build ordered result map
  const result = new Map<number, number>();
  for (const k of listOfCoa) {
    result.set(k, map.get(k) ?? 0);
  }

  // console.log("Fetch Account Outstanding (map): ", result);
  return result;
}