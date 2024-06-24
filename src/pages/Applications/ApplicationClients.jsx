import * as React from 'react';
import { Drawer } from "@mui/material"
import PropTypes from 'prop-types';
// import Typography from '@mui/material/Typography';
import { Custom_Axios } from '../../AxiosInstance';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

import NormalTable from "../../components/NormalTable";

export default function ApplicationClients({open  , onToggleDrawer , onSelection}) {

    const [clients , setclients] = React.useState(null)
    const [headers, setHeaders] = React.useState([]);

    const createClientHeaders = React.useCallback(() => {
        const headers = [
            {
                id: 'id',
                numeric: false,
                disablePadding: false,
                label: 'Client ID',
                alignment: 'left',
            },
            {
                id: 'firstName',
                numeric: false,
                disablePadding: false,
                label: 'Names',
                alignment: 'left',
            },
            {
                id: 'contact',
                numeric: false,
                disablePadding: true,
                label: 'Contacts',
                alignment: 'left',
            },
            {
                id: 'address',
                numeric: false,
                disablePadding: true,
                label: 'Address',
                alignment: 'left',
            },
            {
                id: 'nin',
                numeric: false,
                disablePadding: true,
                label: 'NIN number'
            },
            {
                id: 'addedAt',
                numeric: false,
                disablePadding: true,
                label: 'Date Joined'
            }
        ];
        setHeaders(headers);
    }, []);

    const token = useSelector(state => state.AppReducer.token);
    var CustomAxios = Custom_Axios(token)

    const GetClients = () => {
        setclients(null)
        CustomAxios.get('/Clients').then((response) => {
            if (response.status === 200) {
                setclients(response.data);
                createClientHeaders();
            }
        });
    }

    React.useEffect(()=>{
        GetClients()
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
                clients != null ? (
                    <div style={{ width: '100vw', paddingTop: '20px' }}>
                        <NormalTable heading={'Select a Client'} OnSelection={onSelection} headers={headers} table_rows={clients} />
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

ApplicationClients.propTypes = {
    open: PropTypes.string.isRequired,
    onSelection: PropTypes.func.isRequired,
    onToggleDrawer: PropTypes.func.isRequired,
}
