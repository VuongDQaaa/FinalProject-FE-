import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Radio,
  AutoComplete,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../../styles/Styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateSchedule = () => {
  const dataSchedule = {
    day: useParams().day,
    period: Number(useParams().period),
    session: useParams().session,
    classId: Number(useParams().classId),
  };
  const [isLoading, setLoading] = useState({ isLoading: false });
  const navigate = useNavigate();
  const [listTeacher, setListTeacher] = useState();
  const [allTasks, setAllTasks] = useState();
  const options = listTeacher?.map((item) => ({ value: item.suggestion }));
  console.log(listTeacher);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_Backend_URI}Users/search-teacher`
        );
        setListTeacher(response);
      } catch (error) {
        console.error(error.message);
      }
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_Backend_URI}api/AssignedTask/All-tasks`
        );
        setAllTasks(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);
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
  const onFinish =async (fieldsValue) => {
    const request = {
      userName: fieldsValue.teacherName.split("-")[2].replace(/ /g, ""),
      taskId: fieldsValue.taskId,
      session: dataSchedule.session,
      day: dataSchedule.day,
      period: dataSchedule.period,
    };
    console.log(request);
   await axios.post(
        `${process.env.REACT_APP_Backend_URI}api/Schedule/Add-schedule?classId=${dataSchedule.classId}`,
        request
      )
      .then((response) => {
        setTimeout(() => {
          setLoading({ isLoading: false });
        }, 3000);
        navigate(`/view-schedule/${dataSchedule.classId}`);
        message.success('Add schedule successfully !');
      })
      .catch((error) => {
        console.log(error);
        message.error('Add Error !');
      });
  };

  return (
    <div>
      <Row>
        <Col span={12} offset={6}>
          <div className="content">
            <Row style={{ marginBottom: "10px" }} className="fontHeaderContent">
              Add Schedule
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
                      {
                        required: true,
                        message: "Teacher name must be required",
                      },
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

                <Form.Item label="Select Task">
                  <Form.Item
                    name="taskId"
                    rules={[{ required: true }]}
                    style={{ display: "block" }}
                  >
                    <Select
                      disabled={isLoading.isLoading === true}
                      showSearch
                      name="taskId"
                      className="inputForm"
                      style={{ display: "block" }}
                      optionFilterProp="children"
                      placeholder={"Select Task"}
                    >
                      {allTasks?.map((item) => (
                        <Option key={item.taskId} value={item.taskId}>
                          {item.autoFill}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Form.Item>

                <Form.Item label="Session">
                  <Form.Item name="session" style={{ display: "block" }}>
                    <Select
                      disabled={true}
                      defaultValue={dataSchedule.session}
                      name="session"
                      className="inputForm"
                      style={{ display: "block" }}
                      optionFilterProp="children"
                    >
                      <Option value={dataSchedule.session}>
                        {dataSchedule.session}
                      </Option>
                    </Select>
                  </Form.Item>
                </Form.Item>

                <Form.Item label="Day">
                  <Form.Item name="day">
                    <Select
                      disabled={true}
                      defaultValue={dataSchedule.day}
                      name="day"
                      className="inputForm"
                      style={{ display: "block" }}
                      optionFilterProp="children"
                    >
                      <Option value={dataSchedule.day}>
                        {dataSchedule.day}
                      </Option>
                    </Select>
                  </Form.Item>
                </Form.Item>

                <Form.Item label="Period">
                  <Form.Item name="period" style={{ display: "block" }}>
                    <Select
                      disabled={true}
                      defaultValue={dataSchedule.period}
                      className="inputForm"
                      style={{ display: "block" }}
                      optionFilterProp="children"
                    >
                      <Option value={dataSchedule.period}>
                        {dataSchedule.period}
                      </Option>
                    </Select>
                  </Form.Item>
                </Form.Item>

                <Form.Item shouldUpdate>
                  {() => (
                    <Row style={{ float: "right" }}>
                      <Button
                        disabled={
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
    </div>
  );
};

export default CreateSchedule;
