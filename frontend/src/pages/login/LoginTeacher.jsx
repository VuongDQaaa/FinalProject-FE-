import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Context } from "../../App";
import { Input, Spin, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../../styles/Styles.css";
import { useNavigate } from "react-router-dom";
const styles = makeStyles({
  form: {
    backgroundColor: "#FFF",
    padding: "50px",
    borderRadius: "15px",
    width: "30%",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "-10px 10px 10px -5px rgba(0,0,0,0.75)",
    color: "white",
    margin: "auto",
    border: "3px solid skyblue",
    display: "flex",
  },
  formContainer: {
    padding: "50px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formInput: {
    width: "100%",
    margin: "10px",
    height: "40px",
    borderRadius: "5px",
    border: "1px solid gray",
    padding: "5px",
    fontFamily: "'Roboto', sans-serif",
    color: "black",
    backgroundColor: "white",
  },
  formSubmit: {
    width: "50%",
    padding: "10px",
    borderRadius: "5px",
    color: "white !important",
    fontWeight: "bold",
    fontsize: "30px",
    background: "red",
    border: "2px solid red",
    fontFamily: "'Roboto', sans-serif",
    cursor: "pointer",
  },
  formMarketing: {
    display: "flex",
    margin: "20px",
    alignItems: "center",
  },
  validationText: {
    margin: "0px",
    fontSize: "1em",
    color: "red",
  },
  validContainer: {
    height: "20px",
  },
});
const LOGING = {
  LOADING: "loading",
  FAIL: "fail",
  SUCCESS: "success",
  NONE: "none",
};
const LoginStudent = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useContext(Context);
  const [isLoging, setLoging] = useState(LOGING.NONE);
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required !"),
      password: Yup.string()
        .min(2, "Must be at least 8 characters !")
        .required("Required !"),
    }),

    onSubmit: () => {
      setLoging(LOGING.LOADING);
      axios
        .post(`${process.env.REACT_APP_Backend_URI}Users/Authenticate`, {
          userName: formik.values.username,
          password: formik.values.password,
        })
        .then((response) => {
          setLoginState({
            ...loginState,
            token: response.data.token,
            isLogin: true,
            role: response.data.role,
            username: formik.values.username,
            isfirstlogin: response.data.isFirstLogin,
            id: response.data.userId,
            fullName: response.data.fullName,
          });
          localStorage.setItem(
            "loginState",
            JSON.stringify({
              token: response.data.token,
              isLogin: true,
              role: response.data.role,
              username: formik.values.username,
              isfirstlogin: response.data.isFirstLogin,
              id: response.data.userId,
              fullName: response.data.fullName,
            })
          );
          localStorage.setItem("role",response.data.role );
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.token;
            if(loginState.role ==="Admin"){
              window.location.href = `/employee`;
            }else{
              window.location.href = `/ScheduleOfTeacher`;
            }
         
        })

        .catch((error) => {
          setLoging(LOGING.FAIL);
          axios.defaults.headers.common["Authorization"] = "";
          setError(error.response.data.message);
        });
    },
  });

  const classes = styles();
  const antIcon = <LoadingOutlined style={{ fontSize: "24px" }} spin />;
  return (
    <body class="background">
      <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <img
            alt="logo"
            style={{ width: "100px", height: "100px" }}
            disabled
            width={100}
            src="https://thumbs.dreamstime.com/z/teacher-concept-illustration-icon-isolated-white-background-simple-vector-logo-teacher-concept-illustration-icon-isolated-181941315.jpg"
          />
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
          <Input
            type="username"
            placeholder="Username"
            className={classes.formInput}
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />

          <div className={classes.validContainer}>
            {formik.touched.username && formik.errors.username ? (
              <p className={classes.validationText}>{formik.errors.username}</p>
            ) : null}
          </div>

          <Input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className={classes.formInput}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            suffix={
              isPasswordVisible ? (
                <EyeOutlined
                  onClick={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                />
              ) : (
                <EyeInvisibleOutlined
                  onClick={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                />
              )
            }
          />

          <div className={classes.validContainer}>
            {formik.touched.password && formik.errors.password ? (
              <p className={classes.validationText}>{formik.errors.password}</p>
            ) : null}
          </div>
          <div>
            <Button
              style={{
                width: "150px",
                height: "40px",
                background: "black",
                color: "white",
              }}
              onClick={() => {
                navigate(`/`);
              }}
            >
              <span>Login for student</span>
            </Button>
            <Button
              disabled={isLoging === LOGING.LOADING}
              htmlType="submit"
              style={{
                width: "100px",
                height: "40px",
                background: "#33CCFF",
                color: "white",
              }}
            >
              <span>
                {isLoging === LOGING.LOADING ? (
                  <Spin indicator={antIcon} />
                )  : (
                  "Login"
                )}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </body>
  );
};

export default LoginStudent;
