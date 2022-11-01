import { HomePage } from "../pages/users/StaffUser/HomePage";
import { AbsentHistory } from "../pages/student/AbsentHistory";
export const UserRoute = [ 

    {
        path: "/",
        element: <HomePage/>,
        title: "Schedule",
    },
    {
        path: "/absenthistory",
        element: <AbsentHistory/>,
        title: "Absent History",
    },
]