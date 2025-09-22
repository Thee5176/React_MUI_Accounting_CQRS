import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import GeneralLedgerView from "./pages/GeneralLedgerView";
import LedgerEntryForm from "./pages/LedgerEntryForm";
import SlotsSignIn from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
// Import required hooks and components for authentication
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { 
        path: "/", 
        element: (
            <GeneralLedgerView />
        )
      },
      { 
        path: "/form", 
        element: (
            <LedgerEntryForm />
        )
      },
      { path: "/auth/login", element: <SlotsSignIn /> },
      { path: "/auth/register", element: <SignUpPage /> },
    ],
  },
]);