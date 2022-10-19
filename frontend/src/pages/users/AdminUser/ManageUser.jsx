import React, { useState, useEffect } from "react";
import { Table, Input, Button, Menu, Dropdown, Row, Col, Modal } from "antd";
import {
  FilterOutlined,
  EditFilled,
  CloseCircleOutlined,
  CloseSquareOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/Styles.css";
import moment from "moment";
import "antd/dist/antd.css";

export default function ManageUser() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [type, setType] = useState("Gender");
  const [classz, setClassz] = useState("Class");
  const [classData, setClassData] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    data: {},
  });

  const columns = [
    {
      title: "Student code",
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
      width: "10%",
    },
    {
      title: "Student Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => {
        if (a.fullName > b.fullName) {
          return -1;
        }
        if (b.fullName > a.fullName) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "UserName",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => {
        if (a.userName > b.userName) {
          return -1;
        }
        if (b.userName > a.userName) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
     
    },
   
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Class",
      dataIndex: "classroomName",
      key: "classroomName",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      
    },
  ];
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    title: "Notice",
    content: <p>Do you want to disable student?</p>,
    footer: (
      <div style={{ textAlign: "left" }}>
        <Button className="buttonSave">Disable</Button>
       
      </div>
    ),
  });
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_Backend_URI}api/Student/GetAllActiveStudent`,
        {}
      )
      .then(function (response) {
        let respData = response.data;
        console.log(respData);

        respData.forEach((element) => {
          //   element.fullName = element.firstName + " " + element.lastName;
          element.dateOfBirth = moment(
            new Date(element.dateOfBirth).toLocaleDateString("en-US")
          ).format("DD/MM/YYYY");
          element.action = [
            <Link to={`/editUser/${element.studentId}`} id="editButton">
              <EditFilled style={{ color: "green", fontSize: "25px" }} />
            </Link>,
            <CloseCircleOutlined
              onClick={() => {
                setDeleteModal({
                  ...deleteModal,
                  footer: (
                    <div >
                      <Button 
                        className="ant-btn ant-btn-danger"
                        onClick={() => {
                          axios
                            .put(
                              `${process.env.REACT_APP_Backend_URI}api/Student/Diable/${element.studentId}`
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
                                title: "Can not disable user",
                                content: (
                                  <p>
                                    There are valid assignments belonging to
                                    this user. Please Close all assignments
                                    before disabling user.
                                  </p>
                                ),
                              });
                            });
                        }}
                      >
                        Disable
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
      }, [])
      .catch(() => {});
  }, [deleteModal]);
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

  const dataBytype =
    type === "Gender" ? data : data.filter((u) => u.gender === type);
    const dataClass= classz === "Class" ? dataBytype : dataBytype.filter((u) => u.classroomName === classz);
  const finalData =
    searchText === ""
      ? dataClass
      : (dataClass.filter(
          (u) =>
            u.fullName
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(searchText.toLowerCase().replace(/\s+/g, "")) ||
            u.studentCode.toLowerCase().includes(searchText.toLowerCase())
        ) 
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
        User List
      </p>
      <Row gutter={45} style={{ marginBottom: "30px" }}>
        <Col xs={8} sm={8} md={7} lg={7} xl={6} xxl={5}>
          <Dropdown.Button
            placement="bottom"
            icon={<FilterOutlined />}
            overlay={
              <Menu>
                <Menu.Item
                  value="Male"
                  onClick={() => {
                    setType("Male");
                  }}
                >
                  {" "}
                  Male
                </Menu.Item>
                <Menu.Item
                  value="Female"
                  onClick={() => {
                    setType("Female");
                  }}
                >
                  {" "}
                  Female
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    setType("Gender");
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
          <Dropdown.Button
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
                    setClassz("Class");
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
        </Col>
        <Col xs={8} sm={8} md={7} lg={7} xl={8} xxl={8}>
          <Input.Search
            placeholder="Search Student"
            maxLength={255}
            allowClear
            onSearch={(e) => {
              setPage(1);
              setSearchText(e.replace(/ /g, ""));
            }}
          />
        </Col>
        <Col xs={8} sm={8} md={7} lg={7} xl={9} xxl={9}>
          <Button style={{ background: "#33CCFF", color: "white" }}>
            <Link to="/createUser"> Add new user</Link>
          </Button>
        </Col>
      </Row>
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
        title="Detail User"
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
            <td style={{ fontSize: "18px", color: "#838688" }}>Student ID</td>
            <td
              style={{
                fontSize: "18px",
                color: "#838688",
                textAlign: "justify",
                paddingLeft: "35px",
              }}
            >
              {modal.data.studentId}
            </td>
          </tr>
          <tr>
            <td style={{ fontSize: "18px", color: "#838688" }}>Student Code</td>
            <td
              style={{
                fontSize: "18px",
                color: "#838688",
                textAlign: "justify",
                paddingLeft: "35px",
              }}
            >
              {modal.data.studentCode}
            </td>
          </tr>
          <tr>
            <td style={{ fontSize: "18px", color: "#838688" }}>Full Name</td>
            <td
              style={{
                fontSize: "18px",
                color: "#838688",
                textAlign: "justify",
                paddingLeft: "35px",
              }}
            >
              {modal.data.fullName}
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
            <td style={{ fontSize: "18px", color: "#838688" }}>Gender</td>
            <td
              style={{
                fontSize: "18px",
                color: "#838688",
                textAlign: "justify",
                paddingLeft: "35px",
              }}
            >
              {modal.data.gender}
            </td>
          </tr>
          <tr>
            <td style={{ fontSize: "18px", color: "#838688" }}>
              Date of Birth
            </td>
            <td
              style={{
                fontSize: "18px",
                color: "#838688",
                textAlign: "justify",
                paddingLeft: "35px",
              }}
            >
              {modal.data.dob}
            </td>
          </tr>
        </table>
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
                      studentId: record.studentId,
                      studentCode: record.studentCode,
                      fullName: record.fullName,
                      classroomName: record.classroomName,
                      dob: record.dateOfBirth,
                      gender: record.gender,
                    },
                  });
                  console.log(modal.data.dob);
                } else if (
                  e.target.className ===
                  "ant-table-cell ant-table-column-sort ant-table-cell-row-hover"
                ) {
                  setModal({
                    ...modal,
                    isOpen: true,
                    data: {
                      id: record.id,
                      sutdentCode: record.sutdentCode,
                      fullName: record.fullName,
                      classroomName: record.classroomName,
                      dob: record.dateOfBirth,
                      gender: record.gender,
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
