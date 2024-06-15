import "../../App.css"
import DefaultLayout from "../../layout/DefaultLayout"
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';


export default function LoanApplications() {
  return (
    <div className = 'root'>
        <DefaultLayout active_tab={"Applications"} active_icon={<CircleNotificationsOutlinedIcon />} />
    </div>
  )
}
