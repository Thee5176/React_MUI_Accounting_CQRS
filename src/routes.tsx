import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import GeneralLedgerView from "./pages/GeneralLedgerView";
import LedgerEntryForm from "./pages/LedgerEntryForm";

export const routes = createBrowserRouter([
    { 
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <GeneralLedgerView />},
            { path: '/form', element: <LedgerEntryForm />},
        ],
    },
]);