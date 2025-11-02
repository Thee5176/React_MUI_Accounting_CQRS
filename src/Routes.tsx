import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import FinancialStatementPage from "./pages/FinancialStatementPage";
import LedgerEntryForm from "./pages/LedgerEntryForm";
import GeneralLedgerView from "./pages/LedgerReportView";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./service/route/ProtectedRoute";
// Import required hooks and components for authentication
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/form",
        element: (
          <ProtectedRoute>
            <LedgerEntryForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <GeneralLedgerView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/report",
        element: (
          <ProtectedRoute>
            <FinancialStatementPage />
          </ProtectedRoute>
        ),
      },
      { path: "/auth/login", element: <LoginPage /> },
      { path: "/auth/register", element: <SignUpPage /> },
    ],
  },
]);