import { createBrowserRouter } from "react-router-dom";
import GeneralLedgerView from "./pages/GeneralLedgerView";
import LedgerEntryForm from "./pages/LedgerEntryForm";

export const routesBasic = createBrowserRouter([
    { path: '/', element: <GeneralLedgerView />},
    { path: '/form', element: <LedgerEntryForm />},
]);