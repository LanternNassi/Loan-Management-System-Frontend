import "../../App.css"
import DefaultLayout from "../../layout/DefaultLayout"

import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';


export default function Clients() {
  return (
    <div className="root">
        <DefaultLayout active_tab={"Clients"} active_icon={<CircleNotificationsOutlinedIcon />} />
    

    </div>

  )
}
