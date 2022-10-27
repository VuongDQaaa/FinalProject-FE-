import React from "react";
import "antd/dist/antd.css";
import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Modal, Form, Input, Button } from "antd";
import { PageHeader } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import { useLocation } from "react-router-dom";
import { AppRoutes } from "../routes/AppRoutes";
import "../styles/Styles.css";

export default function HeaderComponent({ fullname, username, api }) {
  const [isModal, setModal] = React.useState({
    isOpen: false,
    isLoading: false,
  });
  const [password, setPassword] = React.useState({
    userName: username,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changeSuccess, setChangeSuccess] = React.useState(false);
  const [Footer, setFooter] = React.useState({});
  const [error, setError] = React.useState("");
  const [navTitle, setNavTitle] = React.useState("Home");
  let { pathname } = useLocation();

  React.useEffect(() => {
    AppRoutes.forEach((route) => {
      if (route.path === pathname.replace(/\d+/g, ":id")) {
        setNavTitle(route.title);
      }
    });
  });

  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
      offset: 2,
    },
  };

  const handleConfirmLogout = () => {
    Modal.confirm({
      title: "Are you sure?",
      icon: <LogoutOutlined style={{ color: "red" }} />,
      content: "Do you want to log out?",
      okText: "Logout",
      cancelText: "Cancel",
      okButtonProps: { style: { background: "#e30c18", color: "white" } },

      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 5000);
          localStorage.removeItem("loginState");
          window.location.href = `/`;
        });
      },
      onCancel() {},
    });
  };

  const dropdownuser = (
    <Menu>
      <Menu.Item
        key="change password"
        onClick={() => {
          setModal({ ...isModal, isOpen: true });
        }}
      >
        <UserOutlined style={{ color: "red", fontWeight: "bold" }} /> Change
        Password
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={handleConfirmLogout} key="3">
        <LogoutOutlined style={{ color: "red", fontWeight: "bold" }} /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Modal
        afterClose={() => {
          setError("");
        }}
        closable={false}
        cancelText="Cancel"
        okText="Save"
        okButtonProps={{ style: { background: "#e30c18", color: "white" } }}
        visible={isModal.isOpen}
        footer={[
          <Button
            className="buttonSave"
            loading={isModal.isLoading}
            key="save"
            onClick={() => {
              setModal({ ...isModal, isLoading: true });
              setTimeout(() => {
                setModal({ ...isModal, isLoading: false });
              }, 3000);
              axios
                .put(`${process.env.REACT_APP_Backend_URI}` + api, password)
                .then(() => {
                  setChangeSuccess(true);

                  setFooter({
                    footer: (
                      <Button
                        className="buttonSave"
                        onClick={() => {
                          setFooter({});
                          setChangeSuccess(false);
                          setModal({ ...isModal, isOpen: false });
                        }}
                      >
                        Close
                      </Button>
                    ),
                  });
                })
                .catch((error) => {
                  if (!error.response.data.title) {
                    setModal({ ...isModal, isOpen: true });
                    setError(error.response.data.message);
                  } else {
                    setModal({ ...isModal, isOpen: true });
                    setError(error.response.data.title);
                  }
                });
            }}
          >
            Save
          </Button>,
          <Button
            className="buttonCancel"
            disabled={isModal.isLoading === true}
            key="cancel"
            onClick={() => {
              setModal({ ...isModal, isOpen: false });
              setError("");
            }}
          >
            Cancel
          </Button>,
        ]}
        onOk={() => {
          setChangeSuccess(true);

          setFooter({
            footer: (
              <Button
                className="buttonCancel"
                onClick={() => {
                  setFooter({});
                  setChangeSuccess(false);
                  setModal(false);
                }}
              >
                Close
              </Button>
            ),
          });
        }}
        onCancel={() => {
          setModal(false);
          setError("");
        }}
        destroyOnClose={true}
        title="Change Password"
        {...Footer}
      >
        {changeSuccess === false ? (
          <Form {...formItemLayout}>
            <Form.Item
              name="Old Password"
              style={{ marginTop: "20px" }}
              label="Old Password"
              rules={[
                { required: true, max: 50 },
                {
                  pattern: new RegExp("^[a-zA-Z0-9]+$"),
                  message: `Password can't have white space or special characters`,
                },
              ]}
              hasFeedback
            >
              <Input.Password
                disabled={isModal.isLoading === true}
                className="inputForm"
                onChange={(old) => {
                  setPassword({ ...password, oldPassword: old.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, max: 50,  message: `New password must have riquired`},
                {
                  pattern: new RegExp("^[a-zA-Z0-9]+$"),
                  message: `New password can't have white space or special characters`,
                },
                
              ]}
              hasFeedback
            >
              <Input.Password
                disabled={isModal.isLoading === true}
                className="inputForm"
                onChange={(newPass) => {
                  setPassword({
                    ...password,
                    newPassword: newPass.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              name="Confirm New Password"
              label="Confirm New Password"
              rules={[
                { required: true, max: 50, whitespace: true },
                {
                  pattern: new RegExp("^[a-zA-Z0-9]+$"),
                  message: `Confirm new password must match with new password`,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                disabled={isModal.isLoading === true}
                className="inputForm"
                onChange={(confirmPass) => {
                  setPassword({
                    ...password,
                    confirmPassword: confirmPass.target.value,
                  });
                }}
              />
            </Form.Item>
            <p style={{ color: "red" }}>{error}</p>
          </Form>
        ) : (
          <p>Your password has been changed successfully!</p>
        )}
      </Modal>
      <PageHeader className="site-page-header">
        <span
          style={{
            color: "white",
            float: "left",
            marginLeft: "20px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {navTitle}
        </span>
        <Dropdown overlay={dropdownuser} trigger={["click"]}>
          <a
            style={{
              float: "right",
              margin: "auto",
              fontSize: "20px",
              color: "white",
              marginRight: "30px",
            }}
            onClick={(e) => e.preventDefault()}
            href="/#"
          >
            {fullname} <DownOutlined />
          </a>
        </Dropdown>
      </PageHeader>
    </>
  );
}
