import React, { useState, useEffect } from "react";
import { Table, Input, Button, Menu, Dropdown, Row, Col, Modal,Form } from "antd";
import {
  FilterOutlined,
  EditFilled,
  CloseCircleOutlined,
  CloseSquareOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import axios from "axios";
import "../../styles/Styles.css";

import "antd/dist/antd.css";

export default function ManageUser() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [type, setType] = useState("All");
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState({ isLoading: false });
  const [classData, setClassData] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    data: {},
  });
  const [create, setCreate] = useState(false);
  const [submitData, setSubmitData] = useState({
    classroomName: "",
});
const [editData, setEditData] = useState({
  classroomId:"",
  classroomName: "",
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
  const columns = [
    {
      title: "Class",
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: '20%',
    },
  ];
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    title: "Notice",
    content: <p>Do you want to delete this classroom?</p>,
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
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_Backend_URI}api/Classroom/All-classroom`,
        {}
      )
      .then(function (response) {
        let respData = response.data;
        console.log(respData);
        setClassData(respData);
        respData.forEach((element) => {
          //   element.fullName = element.firstName + " " + element.lastName;
          
          element.action = [
           
              <EditFilled onClick={() => {
                form.setFieldsValue({classroomName: element.classroomName});
                setEditModal({
                  ...editModal,
                  isOpen: true,
                });
                setEditData({
                  ...editData,
                  classroomName: element.classroomName,
                  classroomId: element.classroomId,
                })
                console.log(editModal);
              }} style={{ color: "green", fontSize: "25px" }} />,
          
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
                              `${process.env.REACT_APP_Backend_URI}api/Classroom/Delete-classroom/${element.classroomId}`
                            )
                            .then(() => {
                             
                              setDeleteModal({
                                ...deleteModal,
                                isOpen: false,
                              });
                              window.location.reload();
                            })
                            .catch(() => {
                              setDeleteModal({
                                ...deleteModal,
                                isOpen: true,
                                footer: null,
                                title: "Notice",
                                content: (
                                  <p>
                                   Can not delete class !
                                  </p>
                                ),
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
        setData(
          respData.sort((a, b) => {
            if (
              a.classroomName.trim().toLowerCase() >
              b.classroomName.trim().toLowerCase()
            ) {
              return 1;
            }
            if (
              b.classroomName.trim().toLowerCase() >
              a.classroomName.trim().toLowerCase()
            ) {
              return -1;
            }
            return 0;
          })
        );
      }, [])
      .catch(() => {});
  }, [deleteModal,editData,editModal,form]);
   const handleCreate = () => {
    axios
    .post(`${process.env.REACT_APP_Backend_URI}api/Classroom/New-classroom`, 
      submitData
      )
      .then(() => {
        setTimeout(() => {
          setLoading({ isLoading: false });
        }, 3000);

        window.location.reload();
      })
      .catch(() => {});
  };
  
  const handleEdit = () => {
    axios
    .put(
      `${process.env.REACT_APP_Backend_URI}api/Classroom/Update-classroom/${editData.classroomId}`,editData
    )
      .then(() => {
        setTimeout(() => {
          setLoading({ isLoading: false });
        }, 3000);

        window.location.reload();
      })
      .catch(() => {});
  };

  const dataBytype =
    type === "All" ? data : data.filter((u) => u.classroomName === type);
  
  const finalData =
    searchText === ""
      ? dataBytype
      : dataBytype.filter(
          (u) =>
            u.classroomName
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(searchText.toLowerCase().replace(/\s+/g, ""))
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
    showTotal:total => `Total ${total} Class`,
    responsive:true, 
    showSizeChanger:true
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
         Classroom List
      </p>
      <Row gutter={45} style={{ marginBottom: "30px" }}>
        <Col xs={8} sm={8} md={7} lg={7} xl={6} xxl={5}>
          <Dropdown.Button
            placement="bottom"
            icon={<FilterOutlined />}
            overlay={
              <Menu>
                {classData.map((item) => (
                      <Menu.Item
                      value={item.classroomName}
                      onClick={() => {
                        setType(item.classroomName);
                      }}
                    >
                      {" "}
                      {item.classroomName}
                    </Menu.Item>
                    ))}
              
                <Menu.Item
                  onClick={() => {
                    setType("All");
                  }}
                >
                  {" "}
                  All
                </Menu.Item>
              </Menu>
            }
          >
            {type}
          </Dropdown.Button>
        </Col>
        <Col xs={8} sm={8} md={7} lg={7} xl={8} xxl={8}>
          <Input.Search
            placeholder="Search Classroom"
            maxLength={255}
            allowClear
            onSearch={(e) => {
              setPage(1);
              setSearchText(e.replace(/ /g, ""));
            }}
          />
        </Col>
        <Col xs={8} sm={8} md={7} lg={7} xl={9} xxl={9}>
          <Button style={{ background: "#33CCFF", color: "white" }}
          onClick={(e) =>{
            setCreate(true);
          }}
          >
            Add new classroom
          </Button>
        </Col>
      </Row>
      {/*Edit Classroom */}
      <Modal
         visible={editModal.isOpen}
         title={editModal.title}
         onCancel={() => {
          setEditModal({ ...editModal, isOpen: false });
        }}
        destroyOnClose={true}
        closeIcon={
          <CloseSquareOutlined style={{  fontSize: "20px" }} />
        }
        footer={[
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
            handleEdit();
          }}
        >
          Save
        </Button>,
          <Button  key="back" onClick={() => {
            setEditModal({ ...editModal, isOpen: false });
            form.setFieldsValue({classroomName:""});
          }}>Cancel</Button>
      ]}
        maskClosable={false}
        closable={false}
      >
        
        <Form  name="complex-form"
                            // initialValues={{State: 'Available'}}
                            {...formItemLayout}
                            
                            labelAlign="left"
                            form={form}>
       <Form.Item label="Classroom Name" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="classroomName"
                  rules={[
                    { required: true, message: "Classname name must be required" },
                   
                    {
                      max: 50,
                      message: "Classroom name must less than 50 characters",
                    },
                  ]}
                  style={{ display: "block" }}
                  hasFeedback
                >
                  <Input
                   onChange={(name) => {

                    setEditData({
                        ...editData,
                        classroomName:name.target.value,
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
      <Modal
        visible={modal.isOpen}
        title="Detail Classroom"
        onOk={() => {
          setModal({ ...modal, isOpen: false });
        }}
        footer={[
          <Button
            style={{ background: "#e30c18", color: "white" }}
            key="back"
            onClick={() => {
              setModal({ ...modal, isOpen: false });
            }}
          >
            Close
          </Button>,
        ]}
        closable={false}
      >
        <table>
        <tr>
            <td style={{ fontSize: "18px", color: "#838688" }}>Class ID</td>
            <td
              style={{
                fontSize: "18px",
                color: "#838688",
                textAlign: "justify",
                paddingLeft: "35px",
              }}
            >
              {modal.data.classroomId}
            </td>
          </tr>
          <tr>
            <td style={{ fontSize: "18px", color: "#838688" }}>Class Name</td>
            <td
              style={{
                fontSize: "18px",
                color: "#838688",
                textAlign: "justify",
                paddingLeft: "35px",
              }}
            >
              {modal.data.classroomName}
            </td>
          </tr>
           <tr>
            <td style={{ fontSize: "18px", color: "#838688" }}>Student</td>
            <td
              style={{
                fontSize: "18px",
                color: "#838688",
                textAlign: "justify",
                paddingLeft: "35px",
              }}
            >
              {modal.data.students}
            </td>
          </tr>
        </table>
      </Modal>
      <Modal
        visible={create}
        title="Create Classroom"
        onOk={() => {
          setModal({ ...modal, isOpen: false });
        }}
        footer={[
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
            handleCreate();
          }}
        >
          Save
        </Button>,
          <Button  key="back" onClick={() => {
            setCreate(false);
            form.setFieldsValue({classroomName:""});
          }}>Cancel</Button>
      ]}
      
        destroyOnClose={true}
        maskClosable={false}
        closable={false}
      >
        
        <Form  name="complex-form"
                            // initialValues={{State: 'Available'}}
                            {...formItemLayout}
                            
                            labelAlign="left"
                            form={form}>
       <Form.Item label="Classroom Name" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="classroomName"
                  rules={[
                    { required: true, message: "Classname name must be required" },
                   
                    {
                      max: 50,
                      message: "Classroom name must less than 50 characters",
                    },
                  ]}
                  style={{ display: "block" }}
                  hasFeedback
                >
                  <Input
                  onChange={(name) => {

                    setSubmitData({
                        ...submitData,
                        classroomName:name.target.value,
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
      {data.length === 0 ? (
        <Table
          loading={{
            indicator: (
              <LoadingOutlined style={{ fontSize: "60px", color: "red" }} />
            ),
            spinning: true,
          }}
        />
      ) : (
        <Table
          key="id"
         
          rowKey={(data) => data.id}
          columns={columns}
          pagination={pagination}
          dataSource={finalData}
          onRow={(record) => {
            return {
              onClick: (e) => {
                if (
                  e.target.className ===
                  "ant-table-cell ant-table-cell-row-hover"
                ) {
                  setModal({
                    ...modal,
                    isOpen: true,
                    data: {
                      classroomId: record.classroomId,
                      classroomName: record.classroomName,
                      students: record.students,
                    },
                  });
                 
                } else if (
                  e.target.className ===
                  "ant-table-cell ant-table-column-sort ant-table-cell-row-hover"
                ) {
                  setModal({
                    ...modal,
                    isOpen: true,
                    data: {
                        classroomId: record.classroomId,
                        classroomName: record.classroomName,
                        students: record.students,
                    },
                  });
                  console.log(modal.data);
                } else {
                  setModal({ ...modal, isOpen: false });
                }
              },
            };
          }}
        />
      )}
    </>
  );
}