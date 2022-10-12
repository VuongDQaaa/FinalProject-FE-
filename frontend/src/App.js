import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MenuComponent from "./components/MenuComponent";
import { AppRoutes } from "./routes/AppRoutes";
import { NavRoutes } from "./routes/NavRoutes";
//import LoginStd from "./pages/login/LoginStudent";
import RouteComponent from "./components/RouteComponent";
import HeaderComponent from "./components/HeaderComponent";
//import ChangePasswordModal from "./components/ChangePasswordModal";
import GridComponent from "./components/GridComponet";
import axios from "axios";

import { UserRoute } from "./routes/UserRoute";
import LoginRoutes from "./routes/LoginRoutes";

export const Context = createContext();

function App() {
  const [loginState, setLoginState] = useState({
    token: localStorage.token,
    isLogin: false,
    role: localStorage.role,
    username: localStorage.username,
    isfirstlogin: localStorage.isfirstlogin,
    id: localStorage.id,
    fullName: localStorage.fullName,
  });

  axios.defaults.baseURL = `${process.env.REACT_APP_UNSPLASH_BASEURL}`;
  axios.defaults.headers.common["Authorization"] = loginState.token;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  axios.interceptors.request.use(
    (request) => {
      // Edit request config
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      // Edit response config
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (localStorage.getItem("loginState") !== null) {
      setLoginState(JSON.parse(localStorage.getItem("loginState")));
    }
  }, [loginState.token]);

  return (
    <Context.Provider value={[loginState, setLoginState]}>
      <BrowserRouter>
        {loginState.isLogin === false ? (
          <RouteComponent routes={LoginRoutes} />
        ) : loginState.role === "Admin" ? (
          <>
            <HeaderComponent username={loginState.fullName} />
            <GridComponent
              leftComp={
                <div>
                  {/* <ChangePasswordModal
                      isOpen={loginState.isfirstlogin}
                      userName={loginState.username}
                    /> */}
                  <MenuComponent routes={NavRoutes} />
                </div>
              }
              rightComp={<RouteComponent routes={AppRoutes} />}
            />
          </>
        ) : (
          <>
            <HeaderComponent username={loginState.fullName} />

            <GridComponent
              leftComp={
                <>
                  {/* <ChangePasswordModal
                  isOpen={loginState.isfirstlogin}
                  userName={loginState.username}}
                /> */}
                  <MenuComponent routes={UserRoute} />
                </>
              }
              rightComp={<RouteComponent routes={AppRoutes} />}
            />
          </>
        )}
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
