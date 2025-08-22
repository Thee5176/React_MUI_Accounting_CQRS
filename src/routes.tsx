import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import GeneralLedgerView from "./pages/GeneralLedgerView";
import LedgerEntryForm from "./pages/LedgerEntryForm";
import NotFoundPage from "./pages/NotFoundPage";

export const routes = createBrowserRouter([
    { 
        path: '/',
        element: <Layout />,
        errorElement: <NotFoundPage/>,
        children: [
            { path: '/', element: <GeneralLedgerView />},
            { path: '/form', element: <LedgerEntryForm />},
        ],
    },
]);