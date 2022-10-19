import { Row, Col, Form, Input, Select, Button, DatePicker, Radio } from "antd";
import React, { useState, useEffect } from "react";
import moment from "moment";
import "../../../styles/Styles.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "antd/dist/antd.css";

export default function EditUserPage() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = useParams().userId;
  const [form] = Form.useForm();
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
      offset: 1,
    },
  };
  console.log(userId);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_Backend_URI}Users/detail/${userId}`)
      .then(function (response) {
        console.log(response.data);
        form.setFieldsValue({
          Firstname: response.data.firstName,
          Lastname: response.data.lastName,
          DateOfBirth: moment(response.data.dateOfBirth),
          Gender: response.data.gender,
          Role: response.data.role,
        });
      })
      .catch(() => {});
  }, [form, userId]);

  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      firstname: fieldsValue["Firstname"],
      lastname: fieldsValue["Lastname"],
      role: fieldsValue["Role"],
      dateOfBirth: fieldsValue["DateOfBirth"],
      gender: fieldsValue["Gender"],
    };
    axios
      .put(`${process.env.REACT_APP_Backend_URI}Users/Update/${userId}`, {
        firstname: values.Firstname,
        lastname: values.Lastname,
        role: values.Role,
        dateOfBirth: values.DateOfBirth,
        gender: values.Gender,
      })
      .then(() => {
        sessionStorage.setItem("changeStatus", true);
        navigate("/employee");
      });
  };
  return (
    <Row>
      <Col span={12} offset={6}>
        <div className="content">
          <Row style={{ marginBottom: "10px" }} className="fontHeaderContent">
            Edit User
          </Row>
          <Row
            style={{ marginTop: "10px", marginLeft: "5px", display: "block" }}
          >
            {/* Form */}
            <Form
              form={form}
              name="complex-form"
              onFinish={onFinish}
              {...formItemLayout}
              labelAlign="left"
            >
              <Form.Item label="First Name" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="Firstname"
                  rules={[{ required: true }]}
                  style={{ display: "block" }}
                >
                  <Input className="inputForm" disabled />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Last Name" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="Lastname"
                  rules={[{ required: true }]}
                  style={{ display: "block" }}
                >
                  <Input className="inputForm" disabled />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Date Of Birth" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="DateOfBirth"
                  rules={[
                    {
                      required: true,
                      message: "Date of birth must be required",
                    },
                    () => ({
                      validator(_, value) {
                          if ((new Date().getFullYear() - value._d.getFullYear()) < 18) {
                              return Promise.reject("User is under 18. Please select a different date")
                          }
                          return Promise.resolve();
                      }
                  })
                  ]}
                  style={{ display: "block" }}
                >
                  <DatePicker
                    disabled={isLoading.isLoading === true}
                    style={{ display: "block" }}
                    format="DD-MM-YYYY"
                    className="inputForm"
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item label="Gender" style={{ marginBottom: 0 }}>
                <Form.Item name="Gender" rules={[{ required: true }]}>
                  <Radio.Group disabled={isLoading.isLoading === true}>
                    <Radio value="Female">Female</Radio>
                    <Radio value="Male">Male</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form.Item>

              <Form.Item label="Role">
                <Form.Item
                  name="Role"
                  rules={[{ required: true }]}
                  style={{ display: "block" }}
                >
                  <Select
                    disabled={isLoading.isLoading === true}
                    showSearch
                    name="Role"
                    className="inputForm"
                    style={{ display: "block" }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    <Option value="Teacher">Teacher</Option>
                    <Option value="Admin">Admin</Option>
                  </Select>
                </Form.Item>
              </Form.Item>

              <Form.Item shouldUpdate>
                {() => (
                  <Row style={{ float: "right" }}>
                    <Button
                      disabled={
                        !form.isFieldsTouched(true) ||
                        form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length > 0
                      }
                      className="buttonSave"
                      loading={isLoading}
                      onClick={() => {
                        setLoading({ isLoading: true });
                        setTimeout(() => {
                          setLoading({ isLoading: false });
                        }, 3000);
                        onFinish();
                      }}
                      htmlType="submit"
                    >
                      Save
                    </Button>
                    <Button
                      className="buttonCancel"
                      disabled={isLoading.isLoading === true}
                      onClick={() => {
                        navigate("/user");
                      }}
                    >
                      Cancel
                    </Button>
                  </Row>
                )}
              </Form.Item>
            </Form>
          </Row>
        </div>
      </Col>
    </Row>
  );
}
