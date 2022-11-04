
import ScheduleTeacher from "../pages/teacher/ScheduleTeacher";
import { AttendaceReport } from "../pages/teacher/AttendaceReport";
export const TeacherRoute = [ 

    {
        path: "/ScheduleOfTeacher",
        element: <ScheduleTeacher/>,
        title: "Schedule",
    },
    {
        path: "/AttendaceReport",
        element: <AttendaceReport/>,
        title: "Attendace Report ",
    },
]