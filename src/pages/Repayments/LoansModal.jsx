
import React from 'react'
import { Drawer } from "@mui/material"
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import NormalTable from "../../components/NormalTable";
import { Custom_Axios } from '../../AxiosInstance';
import { useSelector } from 'react-redux';

export default function LoansModal({open , onToggleDrawer , onSelection}) {
    
    const [loans , setloans] = React.useState(null)
    const [headers, setHeaders] = React.useState([]);

    const token = useSelector(state => state.AppReducer.token);
    var CustomAxios = Custom_Axios(token)

    const createLoansHeaders = () => {
      const headers = [
        {
          id: "application",
          numeric: false,
          disablePadding: false,
          label: "client",
          alignment: "left",
        },
        {
          id: "loanAmount",
          numeric: false,
          disablePadding: false,
          label: "Amount",
          alignment: "left",
          money: true,
        },
        {
          id: "startDate",
          numeric: false,
          disablePadding: false,
          label: "Start Date",
          alignment: "left",
          date: true,
        },
        {
          id: "endDate",
          numeric: false,
          disablePadding: false,
          label: "End Date",
          alignment: "left",
          date: true,
        },
        {
          id: "interestRate",
          numeric: false,
          disablePadding: false,
          label: "Interest Rate (%)",
          alignment: "center",
        },
        {
          id: "status",
          numeric: false,
          disablePadding: false,
          label: "Status",
          alignment: "left",
        },
        {
          id: "outStandingBalance",
          numeric: false,
          disablePadding: false,
          label: "Balance",
          alignment: "left",
          money: true,
        },
      ];
      setHeaders(headers)
    }

    const GetLoans = () => {
        setloans(null)
        CustomAxios.get("/Loans").then((response) => {
          if (response.status == 200) {
            setloans(response.data);
            console.log(response.data)
            createLoansHeaders();
          }
        });
        // setloans([
        //     {
        //       'id' : 'XXXX-XXXX-XXXX-XXX',
        //       'client' : 'XXXX-XXXX-XXXX-XXX',
        //       'Application' : 'XXXX-XXXX-XXXX-XXX',
        //       'LoanAmount' : 300000,
        //       'StartDate' : '2023-04-03',
        //       'EndDate' : '2023-04-03',
        //       'InterestRate' : '30',
        //       'Status' : 'Active',
        //       'OutStandingBalance' : 300000
        //     }
        //   ])
    }
    
    React.useEffect(()=>{
        GetLoans()
    },[])


    return (

        <Drawer
            anchor="bottom"
            open = {open}
            onClose={()=>{
                onToggleDrawer(false)
            }}
        >
            {
                loans != null ? (
                    <div style={{ width: '100vw', paddingTop: '20px' }}>
                        <NormalTable heading={'Loans'} OnSelection={onSelection} headers={headers} table_rows={loans} />
                    </div>
                ) : (
                    <div style={{ display: 'flex' }}>
                        <CircularProgress />
                    </div>
                )
            }
            

        </Drawer>


    )
}


LoansModal.propTypes = {
    open: PropTypes.string.isRequired,
    onSelection: PropTypes.func.isRequired,
    onToggleDrawer: PropTypes.func.isRequired,
    loan : PropTypes.string.isRequired,
}
