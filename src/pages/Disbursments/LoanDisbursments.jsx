import "../../App.css"
import DefaultLayout from "../../layout/DefaultLayout"

import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';



export default function LoanDisbursments() {
  return (
    <div className="root">
        <DefaultLayout active_tab={"Disbursments"} active_icon={<CircleNotificationsOutlinedIcon />} />
    

    </div>
    )
}
