import {
  Row,
  Col,
  Form,
  Button,
  Select,
  AutoComplete,
  message
} from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../styles/Styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [isLoading, setLoading] = useState({ isLoading: false });
  const navigate = useNavigate();
  const [listTeacher, setListTeacher] = useState()
  const [allSubjects, setAllSubjects] = useState();
  const options = listTeacher?.map((item) => ({value: item.suggestion}))
  useEffect(() => {
    const fetchData = async () =>{
      try {
        const {data: response} = await axios.get(`${process.env.REACT_APP_Backend_URI}Users/search-teacher`);
        setListTeacher(response);
      } catch (error) {
        console.error(error.message);
      };
      try {
        const {data: response} = await axios.get(`${process.env.REACT_APP_Backend_URI}api/Subject/All-subjects`);
        setAllSubjects(response);
      } catch (error) {
        console.error(error.message);
      };
    }
    fetchData();},[])
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
  const onFinish = (fieldsValue) => {
    // const values = {
    //   ...fieldsValue,
    // };

    axios
      .post(`${process.env.REACT_APP_Backend_URI}api/AssignedTask/Add-task`, {
        userName: fieldsValue.teacherName.split('-')[2].replace(/ /g,''),
        subjectName: fieldsValue.subjectName,
      })
      .then(() => {
        setTimeout(() => {
          setLoading({ isLoading: false });
        }, 3000);
        
        navigate("/tasks");
      })
      .catch((error) => {
        console.log(error);
        message.error('This subject have been created');
      });
  };

  return (
    <Row>
      <Col span={12} offset={6}>
        <div className="content">
          <Row style={{ marginBottom: "10px" }} className="fontHeaderContent">
            Assign New Task
          </Row>
          <Row
            style={{ marginTop: "10px", marginLeft: "5px", display: "block" }}
          >
            <Form
              form={form}
              // initialValues={{Gender: 'Female'}}
              name="complex-form"
              onFinish={onFinish}
              {...formItemLayout}
              labelAlign="left"
            >
              <Form.Item label="Find Teacher" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="teacherName"
                  rules={[
                    { required: true, message: "Teacher name must be required" },
                    {
                      max: 50,
                      message: "Teacher name must less than 50 characters",
                    },
                  ]}
                  style={{ display: "block" }}
                  hasFeedback
                >
                  <AutoComplete
                    disabled={isLoading.isLoading === true}
                    maxLength={51}
                    className="inputForm"
                    options={options}
                    placeholder="Input Name Teacher"
                    filterOption={(inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Select Subject">
                <Form.Item
                  name="subjectName"
                  rules={[{ required: true }]}
                  style={{ display: "block" }}
                >
                  <Select
                    disabled={isLoading.isLoading === true}
                    showSearch
                    name="subjectName"
                    className="inputForm"
                    style={{ display: "block" }}
                    optionFilterProp="children"
                  >
                    {allSubjects?.map(item => <Option value={item.subjectName}>{item.subjectName}</Option>)}
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
                      style={{ background: "#e30c18", color: "white" }}
                      loading={isLoading.isLoading}
                      htmlType="submit"
                      onClick={() => {
                        setLoading({ isLoading: true });
                        setTimeout(() => {
                          setLoading({ isLoading: false });
                        }, 2000);
                        onFinish();
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      className="buttonCancel"
                      disabled={isLoading.isLoading === true}
                      onClick={() => {
                        navigate("/request");
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
};

export default CreateTask;
