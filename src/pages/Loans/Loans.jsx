import "../../App.css"
import DefaultLayout from "../../layout/DefaultLayout"

import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';




export default function Loans() {
  return (
    <div className="root">
        <DefaultLayout active_tab={"Loans"} active_icon={<CircleNotificationsOutlinedIcon />} />
    

    </div>
  )
}
