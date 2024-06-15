import './App.css'
import { Route, Routes} from 'react-router-dom';

import Dashboard from './pages/Dashboard/Dashboard';
import Clients from './pages/Clients/Clients';
import Loans from './pages/Loans/Loans';
import LoanApplications from './pages/Applications/LoanApplications';
import LoanDisbursments from './pages/Disbursments/LoanDisbursments';
import LoanRepayments from './pages/Repayments/LoanRepayments';



function App() {

  return (
    <>
    <Routes>
      <Route
        index
        element={
          <>
            <Dashboard/>
          </>
        }
      />

      <Route
        path="/clients"
        element={
          <>
            <Clients/>
          </>
        }
      />

      <Route
        path="/Loans"
        element={
          <>
            <Loans/>
          </>
        }
      />

      <Route
        path="/LoanApplications"
        element={
          <>
            <LoanApplications/>
          </>
        }
      />

      <Route
        path="/LoanDisbursments"
        element={
          <>
            <LoanDisbursments/>
          </>
        }
      />

      <Route
        path="/LoanRepayments"
        element={
          <>
            <LoanRepayments/>
          </>
        }
      />


      </Routes>
    </>
  )
}

export default App
