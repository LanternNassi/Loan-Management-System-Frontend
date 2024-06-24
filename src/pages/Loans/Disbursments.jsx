import * as React from 'react';
import { Drawer } from "@mui/material"
import PropTypes from 'prop-types';
// import Typography from '@mui/material/Typography';
import { Custom_Axios } from '../../AxiosInstance';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

import NormalTable from "../../components/NormalTable";

export default function Disbursments({open  , onToggleDrawer , onSelection , loan}) {

    const [disbursments , setdisbursments] = React.useState(null)
    const [headers, setHeaders] = React.useState([]);

    const token = useSelector(state => state.AppReducer.token);
    var CustomAxios = Custom_Axios(token)

    const createDisbursmentsHeaders = React.useCallback(() => {
        const headers = [
            {
                id: 'loanId',
                numeric: false,
                disablePadding: false,
                label: 'Loan ID',
                alignment: 'left',
            },
            {
                id: 'disbursmentAmount',
                numeric: false,
                disablePadding: false,
                label: 'Amount Disbursed',
                alignment: 'left',
                money : true
            },
            {
                id: 'moreInfo',
                numeric: false,
                disablePadding: true,
                label: 'More Information',
                alignment: 'left',
            },
            {
                id: 'disbursedBy',
                numeric: false,
                disablePadding: true,
                label: 'Disbursed By',
                alignment: 'left',
            },
            {
                id : 'addedAt',
                numeric : false,
                disablePadding : true,
                label : 'Date Disbursed',
                alignment : 'left',
                date : true
            }
            
        ];
        setHeaders(headers);
    }, []);

    const GetDisbursments = () => {
        setdisbursments(null)
        const params = {'LoanId' : loan}
        CustomAxios.get('/LoanDisbursments' , {params}).then((response) => {
            if (response.status === 200) {
                setdisbursments(response.data);
                createDisbursmentsHeaders();
            }
        });
    }

    React.useEffect(()=>{
        GetDisbursments()
    }, [])
  return (
    <>
        <Drawer
            anchor="bottom"
            open = {open}
            onClose={()=>{
                onToggleDrawer(false)
            }}
        >
            {
                disbursments != null ? (
                    <div style={{ width: '100vw', paddingTop: '20px' }}>
                        <NormalTable heading={'Disbursments'} OnSelection={onSelection} headers={headers} table_rows={disbursments} />
                    </div>
                ) : (
                    <div style={{ display: 'flex' }}>
                        <CircularProgress />
                    </div>
                )
            }
            

        </Drawer>
    </>
  )
}

Disbursments.propTypes = {
    open: PropTypes.string.isRequired,
    onSelection: PropTypes.func.isRequired,
    onToggleDrawer: PropTypes.func.isRequired,
    loan : PropTypes.string.isRequired,
}
