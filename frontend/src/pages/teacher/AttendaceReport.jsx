import React, { useState, useEffect, useContext } from "react";
import { Table, Input, Button, Row, Col, Modal, Form, Menu, Dropdown} from "antd";
import axios from "axios";
import "../../styles/Styles.css";
import moment from "moment";
import "antd/dist/antd.css";
import { Context } from "../../App";
import { EditFilled, CloseCircleOutlined,CloseSquareOutlined,FilterOutlined } from "@ant-design/icons";

export function AttendaceReport() {
  const [data, setData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [form] = Form.useForm();
  const [loginState] = useContext(Context);
  const [classz, setClassz] = useState("All");
  const [subject, setSubject] = useState("All");
  const [reasonz, setReasonz] = useState({ reason: "" });
  const [historyId,setHistoryId] = useState("");
  const [isLoading, setLoading] = useState({ isLoading: false });
  const columns = [
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Classroom",
      dataIndex: "classroomName",
      key: "classroomName",
      sorter: (a, b) => {
        if (a.classroomName > b.classroomName) {
          return -1;
        }
        if (b.classroomName > a.classroomName) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Student Code",
      dataIndex: "studentCode",
      key: "studentCode",
      sorter: (a, b) => {
        if (a.studentCode > b.studentCode) {
          return -1;
        }
        if (b.studentCode > a.studentCode) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Student Name",
      dataIndex: "studentFullName",
      key: "studentFullName",
      sorter: (a, b) => {
        if (a.studentFullName > b.studentFullName) {
          return -1;
        }
        if (b.studentFullName > a.studentFullName) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Subject",
      dataIndex: "subjectName",
      key: "subjectName",
      sorter: (a, b) => {
        if (a.subjectName > b.subjectName) {
          return -1;
        }
        if (b.subjectName > a.subjectName) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    title: "Delete",
    content:<p>Do you want to delete this absent ?</p>,
    footer: (
      <div style={{ textAlign: "left" }}>
        <Button className="buttonSave">Delete</Button>
      </div>
    ),
  });
  const [editModal, setEditModal] = useState({
    isOpen: false,
    title: "Edit classroom",
  });
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
      offset: 1,
    },
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_Backend_URI}api/AbsentHistory/Get-history-teacher/${loginState.id}`,
        {}
      )
      .then(function (response) {
        let respData = response.data;
        console.log(respData);
        setData(
          respData.sort((a, b) => {
            if (
              a.studentCode.trim().toLowerCase() >
              b.studentCode.trim().toLowerCase()
            ) {
              return 1;
            }
            if (
              b.studentCode.trim().toLowerCase() >
              a.studentCode.trim().toLowerCase()
            ) {
              return -1;
            }
            return 0;
          })
        );
        respData.forEach((element) => {
          //   element.fullName = element.firstName + " " + element.lastName;
          element.createdDate = moment(
            new Date(element.createdDate).toLocaleDateString("en-US")
          ).format("DD/MM/YYYY");
          element.action = [
            <EditFilled
              onClick={() => {
                form.setFieldsValue({
                  reason: element.reason,
                });
                setEditModal({
                  ...editModal,
                  isOpen: true,
                });
                setReasonz({
                  ...reasonz,
                  reason: element.reason,
                 
                });
                setHistoryId(element.historyId);
                console.log(form);
              }}
              style={{ color: "#1e94f9", fontSize: "25px" }}
            />,

            <CloseCircleOutlined
              onClick={() => {
                setDeleteModal({
                  ...deleteModal,
                 
                  footer: (
                    <div>
                      <Button
                        className="ant-btn ant-btn-danger"
                        onClick={() => {
                          axios
                            .delete(
                              `${process.env.REACT_APP_Backend_URI}api/AbsentHistory/Delete-history/${element.historyId}`
                            )
                            .then(() => {
                              setDeleteModal({
                                ...deleteModal,
                                isOpen: false,
                                
                              });
                             
                            })
                            .catch(() => {
                              setDeleteModal({
                                ...deleteModal,
                                isOpen: true,
                                footer: null,
                                title: "Notice",
                                content: <p>Can not delete class !</p>,
                              });
                            });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  ),
                  isOpen: true,
                });
              }}
              style={{ color: "red", fontSize: "25px", marginLeft: "10px" }}
            />,
          ];
        });
        setData(respData);
      }, [])
      .catch(() => {});
      
  }, [deleteModal, editModal, form, loginState, reasonz]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_Backend_URI}api/Classroom/All-classroom`,
        {}
      )
      .then((response) => {
        let respData = response.data;
        setClassData(respData);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_Backend_URI}api/Subject/All-subjects`,
        {}
      )
      .then((response) => {
        let respData = response.data;
        setSubjectData(respData);
      })
      .catch(() => {});
  }, []);

  const [searchText, setSearchText] = useState("");
  const dataBytype =
    classz === "All" ? data : data.filter((u) => u.classroomName === classz);
  const dataBySubject =
    subject === "All"
      ? dataBytype
      : dataBytype.filter((u) => u.subjectName === subject);
  const finalData =
    searchText === ""
      ? dataBySubject
      : dataBySubject.filter((u) =>
          u.classroomName
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(searchText.toLowerCase().replace(/\s+/g, "")) ||
            u.subjectName.toLowerCase().includes(searchText.toLowerCase())
        );

  const pagination = {
    current: page,
    PageSize: pageSize,
    total: finalData.length,
    pageSizeOptions: [5, 10, 15, 20],
    className: "ant-btn-dangerous",
    dangerous: true,
    onChange: (page, pageSize) => {
      setPage(page);
      setPageSize(pageSize);
    },
    showSizeChanger: true,
  };
  const handleEdit = () => {

    axios
      .put(`${process.env.REACT_APP_Backend_URI}api/AbsentHistory/Update-reason/${historyId}`, reasonz)
      .then(() => {
        setEditModal({...editModal,isOpen: false});
        form.setFieldsValue({
          reason: "",              
        });
      })
      .catch((error) => {
       
        console.log(error);
      });
  };
  return (
    <>
    <p
        style={{
          display: "block",
          fontSize: "20px",
          margin: "0 auto",
          textAlign: "left",
          color: " red",
          fontWeight: "bold",
          paddingBottom: "20px",
        }}
      >
        Absent History
      </p>
      <Row gutter={45} style={{ marginBottom: "30px" }}>
        <Col xs={8} sm={8} md={8} lg={7} xl={8} xxl={8}>
          Class: <Dropdown.Button
            placement="bottom"
            icon={<FilterOutlined />}
            overlay={
              <Menu>
                {classData.map((item) => (
                      <Menu.Item
                      value={item.classroomName}
                      onClick={() => {
                        setClassz(item.classroomName);
                      }}
                    >
                      {" "}
                      {item.classroomName}
                    </Menu.Item>
                    ))}
              
               
                <Menu.Item
                  onClick={() => {
                    setClassz("All");
                  }}
                >
                  {" "}
                  All
                </Menu.Item>
              </Menu>
            }
          >
            {classz}
          </Dropdown.Button>
          
          Subject:
             <Dropdown.Button
            placement="bottom"
            icon={<FilterOutlined />}
            overlay={
              <Menu>
                {subjectData.map((item) => (
                      <Menu.Item
                      value={item.subjectName}
                      onClick={() => {
                        setSubject(item.subjectName);
                      }}
                    >
                      {" "}
                      {item.subjectName}
                    </Menu.Item>
                    ))}
              
               
                <Menu.Item
                  onClick={() => {
                    setSubject("All");
                  }}
                >
                  {" "}
                  All
                </Menu.Item>
              </Menu>
            }
          >
            {subject}
            </Dropdown.Button> 
        </Col>
        <Col xs={8} sm={8} md={7} lg={7} xl={8} xxl={8}>
          <Input.Search
            placeholder="Search "
            maxLength={255}
            allowClear
            onSearch={(e) => {
              setPage(1);
              setSearchText(e.replace(/ /g, ""));
            }}
          />
        </Col>
        
      </Row>
      {/* Edit Modal */}
      <Modal
        visible={editModal.isOpen}
        title={editModal.title}
        onCancel={() => {
          setEditModal({ ...editModal, isOpen: false });
        }}
        destroyOnClose={true}
        closeIcon={<CloseSquareOutlined style={{ fontSize: "20px" }} />}
        footer={[
          <Button
            className="buttonSave"
            style={{ background: "#e30c18", color: "white" }}
            loading={isLoading.isLoading}
            htmlType="submit"
            onClick={() => {
              setLoading({ isLoading: true });
              setTimeout(() => {
                setLoading({ isLoading: false });
              }, 2000);
              handleEdit();
            }}
          >
            Absent
          </Button>,
          <Button
            key="back"
            onClick={() => {
              setEditModal({ ...editModal, isOpen: false });
              form.setFieldsValue({
                reason: "",              
              });
            }}
          >
            Cancel
          </Button>,
        ]}
        maskClosable={false}
        closable={false}
      >
        <Form
          name="complex-form"
          // initialValues={{State: 'Available'}}
          {...formItemLayout}
          labelAlign="left"
          form={form}
        >
          <Form.Item label="Reason" style={{ marginBottom: 0 }}>
            <Form.Item
              name="reason"
              rules={[
                { required: true, message: "Reason must be required" },

                {
                  max: 255,
                  message: "Reasonmust less than 50 characters",
                },
              ]}
              style={{ display: "block" }}
              hasFeedback
            >
              <Input
                onChange={(name) => {
                  setReasonz({
                    ...reasonz,
                    reason: name.target.value,
                  });
                }}
                disabled={isLoading.isLoading === true}
                maxLength={51}
                className="inputForm"
              />
            </Form.Item>
           
          </Form.Item>

         
        </Form>
      </Modal>
                {/* Delete Modal */}
      <Modal
        visible={deleteModal.isOpen}
        title={deleteModal.title}
        footer={deleteModal.footer}
        onCancel={() => {
          setDeleteModal({ ...deleteModal, isOpen: false });
        }}
        destroyOnClose={true}
        closeIcon={
          <CloseSquareOutlined style={{ color: "red", fontSize: "20px" }} />
        }
      >
        {deleteModal.content}
      </Modal>
      <Table
        key="id"
        rowKey={(data) => data.id}
        columns={columns}
        pagination={pagination}
        //dataSource={data}
        dataSource={finalData}
      />
      
    </>
  );
}
