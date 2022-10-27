import EditUserPage from "../pages/users/AdminUser/EditUserPage";
import Home from "../pages/Home";
import ManageUser from "../pages/users/AdminUser/ManageUser";
import CreateUserPage from "../pages/users/AdminUser/CreateUserPage";
import ManageClassrom from "../pages/classroom/ManageClassrom";
import ReportPage from "../pages/report/ReportPage";
import RequestForReturningPage from "../pages/request/RequestForReturning";
import ManageSubject from "../pages/subject/ManageSubject";

import ManageEmployee from "../pages/users/AdminEmployee/ManageEmployee";
import CreateEmployeePage from "../pages/users/AdminEmployee/CreateEmployeePage";
import EditEmployeePage from "../pages/users/AdminEmployee/EditEmployeePage";
import CreateTask from "../pages/request/CreateTask";

export const AppRoutes = [
  {
    path: "/",
    element: <Home />,
    title: "Home",
  },
  {
    path: "/student",
    element: <ManageUser />,
    title: "Manage Student",
  },
  {
    path: "/employee",
    element: <ManageEmployee />,
    title: "Manage Employee",
  },
  {
    path: "/classroom",
    element: <ManageClassrom />,
    title: "Manage Classroom",
  },
 
  {
    path: "/subject",
    element: <ManageSubject />,
    title: "Manage Subject",
  },

  {
    path: "/tasks",
    element: <RequestForReturningPage />,
    title: "Manage Task",
  },
  {
    path: "/createTask",
    element: <CreateTask />,
    title: "Manage Task > Create Task",
  },

  {
    path: "/report",
    element: <ReportPage />,
    title: "Report",
  },

  {
    path: "/addStudent",
    element: <CreateUserPage />,
    title: "Manage Student > Add Student",
  },
  {
    path: "/editUser/:studentId",
    element: <EditUserPage />,
    title: "Manage User > Edit User",
  },


  {
    path: "/createEmployee",
    element: <CreateEmployeePage />,
    title: "Manage Employee > Create Employee",
  },
  {
    path: "/editEmployee/:userId",
    element: <EditEmployeePage />,
    title: "Manage Employee > Edit Employee",
  },
];
