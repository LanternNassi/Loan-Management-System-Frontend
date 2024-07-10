import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from "./pages/Dashboard/Dashboard";
import Clients from "./pages/Clients/Clients";
import Loans from "./pages/Loans/Loans";
import LoanApplications from "./pages/Applications/LoanApplications";
import LoanDisbursments from "./pages/Disbursments/LoanDisbursments";
import LoanRepayments from "./pages/Repayments/LoanRepayments";
import Login from "./pages/Auth/Login";
import Users from "./pages/Users/Users";
import DepositSavings from "./pages/DepositSavings/DepositSavings";
import WithDrawSavings from "./pages/WithDrawSavings/WithdDrawSavings";

import { isTokenExpired } from "./AxiosInstance";

import { useSelector, useDispatch } from "react-redux";

const ProtectedRoute = ({ element, ...rest }) => {
  // const User = localStorage.getItem("User");
  return !isTokenExpired() ? element : <Navigate to="/login" />;
};

const AdminOnlyRoute = ({ element, ...rest }) => {
  // const User = localStorage.getItem("User");
  if (isTokenExpired()) {
    return <Navigate to="/login" />;
  }
  const access_level = JSON.parse(localStorage.getItem("User")).role;
  return access_level == "admin" ? element : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();

  dispatch({ type: "add_login_info", User: localStorage.getItem("User") });
  dispatch({
    type: "add_token",
    token: JSON.parse(localStorage.getItem("User"))
      ? JSON.parse(localStorage.getItem("User")).token
      : null,
  });

  return (
    <>
      <Routes>
        <Route index element={<ProtectedRoute element={<Dashboard />} />} />

        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />

        <Route path="/users" element={<AdminOnlyRoute element={<Users />} />} />

        <Route
          path="/clients"
          element={<ProtectedRoute element={<Clients />} />}
        />

        <Route path="/Loans" element={<ProtectedRoute element={<Loans />} />} />

        <Route
          path="/LoanApplications"
          element={<ProtectedRoute element={<LoanApplications />} />}
        />

        <Route
          path="/LoanDisbursments"
          element={<ProtectedRoute element={<LoanDisbursments />} />}
        />

        <Route
          path="/LoanRepayments"
          element={<ProtectedRoute element={<LoanRepayments />} />}
        />

        <Route
          path="/Deposit"
          element={<ProtectedRoute element={<DepositSavings/>} />}
        />

        <Route
          path="/Withdraw"
          element={<ProtectedRoute element={<WithDrawSavings/>} />}
        />

      </Routes>
    </>
  );
}

export default App;
