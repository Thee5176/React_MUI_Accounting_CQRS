import { createContext } from "react";

interface IndexContext{
    totalRowSpan: number;
    addRowSpan: () => void;
}

export const DynamicIndexContext = createContext<IndexContext | undefined>(undefined);