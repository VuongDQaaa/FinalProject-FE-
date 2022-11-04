
import Schedule from "../pages/student/ScheduleStudent";
import { AbsentHistory } from "../pages/student/AbsentHistory";
export const UserRoute = [ 

    {
        path: "/Schedule",
        element: <Schedule/>,
        title: "Schedule",
    },
    {
        path: "/absenthistory",
        element: <AbsentHistory/>,
        title: "Absent History",
    },
]