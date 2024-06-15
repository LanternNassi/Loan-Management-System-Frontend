
import "../../App.css"
import DefaultLayout from "../../layout/DefaultLayout"

import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';





export default function LoanRepayments() {
  return (

    <div className="root">
        <DefaultLayout active_tab={"Repayments"} active_icon={<CircleNotificationsOutlinedIcon />} />
    

    </div>

  )
}
