import  LoginStudent  from "../pages/login/LoginStudent";
import  LoginTeacher  from "../pages/login/LoginTeacher";

const Loginoutes = [ 

    {
        path: "/",
        element: <LoginStudent/>,
        title: "Login Student",
    },
    {
        path: "/login/teacher",
        element: <LoginTeacher/>,
        title: "Login Teacher",
    },

];
export default Loginoutes;