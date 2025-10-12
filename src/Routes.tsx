import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import FinancialSheetPage from "./pages/FinancialSheetPage";
import GeneralLedgerView from "./pages/GeneralLedgerView";
import LedgerEntryForm from "./pages/LedgerEntryForm";
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
        path: "/",
        element: (
          <ProtectedRoute>
            <GeneralLedgerView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/form",
        element: (
          <ProtectedRoute>
            <LedgerEntryForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/statement/:reportId",
        element: (
          <ProtectedRoute>
            <FinancialSheetPage />
          </ProtectedRoute>
        ),
      },
      { path: "/auth/login", element: <LoginPage /> },
      { path: "/auth/register", element: <SignUpPage /> },
    ],
  },
]);