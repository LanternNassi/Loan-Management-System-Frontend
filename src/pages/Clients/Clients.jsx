import "../../App.css"
import DefaultLayout from "../../layout/DefaultLayout"
import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import CircularProgress from '@mui/material/CircularProgress';

import Divider from '@mui/material/Divider';
import NormalTable from "../../components/NormalTable";
import CustomSearch from "../../components/CustomSearch";
import styled from "@emotion/styled";

import { Custom_Axios} from "../../AxiosInstance";
// import { add_token } from "../../redux/state";

// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Edit from "../../components/Edit";

// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import FeedBack from "../../components/FeedBack";

import { useSelector, useDispatch } from 'react-redux';

import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';

const Statistics = styled('div')(() => ({
    positions: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    top: 20,
    width: '85vw',
    height: '30vh',
}));

const Actions = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '50vw',
    height: '10vh',
}));


export default function Clients() {
    const [clients, setClients] = React.useState(null);
    const [headers, setHeaders] = React.useState([]);
    const [selected_items, setSelectedClients] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [edit , setedit] = React.useState(false)
    const [submitting, setsubmitting] = React.useState(false)
    const [feedback , setfeedback] = React.useState(null)
    // const searchInputRef = React.useRef(null);

    const [active_id , setactive_id] = React.useState('')
    const [firstName , setfirstName] = React.useState('')
    const [otherNames, setotherNames] = React.useState('')
    const [contact , setcontact] = React.useState('')
    const [address , setaddress] = React.useState('')
    const [nin , setnin] = React.useState('')


    const token = useSelector(state => state.AppReducer.token);
    var CustomAxios = Custom_Axios(token)

    const OnSelection = React.useCallback((selected) => {
        setSelectedClients(selected);
    }, []);

    const SearchClient = React.useCallback((keywords) => {
        const params = { keywords };
        CustomAxios.get('/Clients', { params }).then((response) => {
            if (response.status === 200) {
                setClients(response.data);
            }
        });
    }, []);

    
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
                label: 'Date Joined',
                date : true
            }
        ];
        setHeaders(headers);
    }, []);

    React.useEffect(() => {
        FetchClients()
    }, []);

    const FetchClients = () => {
        setClients(null)
        CustomAxios.get('/Clients').then((response) => {
            if (response.status === 200) {
                setClients(response.data);
                createClientHeaders();
            }
        });
    }

    const GetClientById = (id , onComplete) => {
        CustomAxios.get('/Clients/' + id).then((response) => {
            if (response.status === 200) {
                onComplete(response.data)
            }
        });
    }

    const clearFields = () => {
        setfirstName('')
        setotherNames('')
        setcontact('')
        setaddress('')
        setnin('')
        setactive_id('')
    }

    const AddClient = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const client = {}
        for(const[key , value] of formData.entries()){
            client[key] = value
        }
        setsubmitting(true)

        CustomAxios.post('/Clients' , client).then((response)=>{
            if (response.status === 201){
                setfeedback({
                    'status' : 'success',
                    'message' : 'Saved successfully' 
                })
                setsubmitting(false)
                setedit(false)
                FetchClients()

                setTimeout(()=>{
                    setfeedback(null)
                },4000)

                clearFields()
            }
        })

    }


    const UpdateClient = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const client = {
            'id' : active_id
        }
        for(const[key , value] of formData.entries()){
            client[key] = value
        }
        setsubmitting(true)

        CustomAxios.put('/Clients/'+active_id , client).then((response)=>{
            if (response.status === 204){
                setfeedback({
                    'status' : 'success',
                    'message' : 'Updated successfully' 
                })
                setsubmitting(false)
                setedit(false)
                FetchClients()

                setTimeout(()=>{
                    setfeedback(null)
                },4000)

                clearFields()
            }
        })

    }

    const DeleteClient = (id) => {
        CustomAxios.delete('/Clients/'+id).then((response)=>{
            if (response.status == 204){
                setfeedback({
                    'status' : 'success',
                    'message' : 'Deleted successfully' 
                })
                FetchClients()
                setTimeout(()=>{
                    setfeedback(null)
                },4000)

                clearFields()
            }
        })
    }

    console.log(firstName)

    const Fields = () => (
        <>
            {/* <TextField sx = {{width : '25vw'}} onChange={(event) => {setfirstName(event.target.value)}} value = {firstName} name="firstName" label="First Name" variant="outlined" /> */}

            <TextField sx = {{width : '25vw'}} defaultValue = {firstName} name="firstName" label="First Name" variant="outlined" />
            <TextField sx = {{width : '25vw'}} defaultValue = {otherNames} name="otherNames" label="Other Name" variant="outlined" />
            <TextField sx = {{width : '25vw'}} defaultValue={contact} name="contact" label="Telephone" variant="outlined" />
            <TextField sx = {{width : '25vw'}} defaultValue={address} name="address" label="Address" variant="outlined" />
            <TextField sx = {{width : '25vw'}} defaultValue={nin} name="nin" label="NIN" variant="outlined" />
            <LoadingButton
                type = 'submit'
                sx = {{width : '25vw' , height : '8vh'}}
                variant="contained"
                tabIndex={-1}
                loading = {submitting}
                loadingPosition="start"
                startIcon={<SaveIcon fontSize="large" />}
            >
                <span>Submit</span>
            </LoadingButton>
        </>
    )

    const toggleEditDrawer = (newOpen) => {
        setedit(newOpen);
    };


  return (
    <div className='root'>

            <DefaultLayout active_tab={"Clients"} active_icon={<CircleNotificationsOutlinedIcon />} />

            {/* <FeedBack open ={(feedback != null)?(true):(false)} message={feedback.message} status={feedback.status} /> */}
            <FeedBack open ={(feedback != null)?(true):(false)} message={(feedback != null)?(feedback.message):('')} status={(feedback != null)?(feedback.status):('success')} />

            <Statistics>
                <Card sx={{ minWidth: 275 }}>
                    <CardHeader title={'Number of Clients'} />
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            24
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ minWidth: 275 }}>
                    <CardHeader title={'Loan Applications'} />
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            24
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ minWidth: 275 }}>
                    <CardHeader title={'Total Disbursments'} />
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                            14
                        </Typography>
                    </CardContent>
                </Card>
            </Statistics>

            <div style={{
                display: 'flex',
                position: 'relative',
                top: 10,
                width: '85vw',
                height: '10vh',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Actions>
                    <Button onClick={()=>{
                        if (active_id){
                            clearFields()
                        }
                        setedit(true)
                    }} variant="outlined" startIcon={<AddOutlinedIcon />}>
                        Add
                    </Button>

                    <Button onClick={async ()=>{

                        GetClientById(selected_items[0] , (data)=>{
                            setfirstName(data.firstName)
                            setotherNames(data.otherNames)
                            setcontact(data.contact)
                            setaddress(data.address)
                            setnin(data.nin)
                            setactive_id(data.id)
                            setedit(true)
                        })

                    }} disabled = {!selected_items.length} variant="outlined" startIcon={<SyncAltOutlinedIcon />}>
                        Update
                    </Button>

                    <Button onClick={()=>{
                        GetClientById(selected_items[0] , (data)=>{
                            setfirstName(data.firstName)
                            setotherNames(data.otherNames)
                            setcontact(data.contact)
                            setaddress(data.address)
                            setnin(data.nin)
                            setactive_id(data.id)
                            DeleteClient(data.id)
                        })
                        
                    }} disabled = {!selected_items.length} variant="outlined" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>

                    <Button onClick={()=>{
                        console.log(selected_items)
                    }} variant="outlined" startIcon={<ExitToAppOutlinedIcon />}>
                        EXCEL
                    </Button>
                </Actions>
            </div>

            <div style={{
                position: 'relative',
                top: 20,
                width: '90vw',
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}>
                <Divider style={{ width: '80vw' }} textAlign="center">
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        ACTIONS
                    </Typography>
                </Divider>

                <div style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '90vw',
                    height: '10vh',
                }}>
                    <CustomSearch
                        value={searchValue}
                        onChange={(value) => {
                            setSearchValue(value);
                            if (value.length >= 3){
                                SearchClient(value)
                            }
                            if (value == ''){
                                SearchClient(null)
                            }
                        }}
                        placeholder="Search Client"
                        icon_1={<SearchIcon />}
                        icon_2={<MenuIcon />}
                    />
                </div>
                  
                {clients != null ? (
                    <div style={{ width: '90vw', paddingTop: '20px' }}>
                        <NormalTable heading={'Clients'} OnSelection={OnSelection} headers={headers} table_rows={clients} />
                    </div>
                ) : (
                    <div style={{ display: 'flex' }}>
                        <CircularProgress />
                    </div>
                )}
            </div>

            <Edit open={edit} Heading= {active_id ? ('UPDATE ' + firstName) : ('ADD CLIENT')} onSubmit={active_id ? (UpdateClient) : (AddClient)} toggleDrawer={toggleEditDrawer}>
                <Fields/>
            </Edit>

        </div>


  )
}
