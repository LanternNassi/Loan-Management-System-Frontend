
import DefaultLayout from "../../layout/DefaultLayout"
import '../../App.css'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';


export default function Dashboard() {
  return (
    <div className = {'root'}>
        <DefaultLayout active_tab={"DASHBOARD"} active_icon={<DashboardCustomizeOutlinedIcon />} />

    </div>
  )
}
