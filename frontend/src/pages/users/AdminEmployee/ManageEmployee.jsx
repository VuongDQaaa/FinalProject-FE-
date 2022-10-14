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

import "antd/dist/antd.css";

export default function ManageEmployee() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [type, setType] = useState("Type");

  const [modal, setModal] = useState({
    isOpen: false,
    data: {},
  });

  const columns = [
    {
      title: "Employee code",
      dataIndex: "userCode",
      key: "userCode",

      sorter: (a, b) => {
        if (a.userCode > b.userCode) {
          return -1;
        }
        if (b.userCode > a.userCode) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Employee Name",
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
      title: "User name",
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    title: "Are you sure?",
    content: <p>Do you want to disable employee?</p>,
    footer: (
      <div style={{ textAlign: "left" }}>
        <Button className="buttonSave">Disable</Button>
        <Button className="buttonCancel">Cancel</Button>
      </div>
    ),
  });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_Backend_URI}Users/all`, {})
      .then(function (response) {
        let respData = response.data;
        console.log(respData);

        respData.forEach((element) => {
          element.action = [
            <Link to={`/editEmployee/${element.userId}`} id="editButton">
              <EditFilled style={{ color: "green", fontSize: "13px" }} />
            </Link>,
            <CloseCircleOutlined
              onClick={() => {
                setDeleteModal({
                  ...deleteModal,
                  footer: (
                    <div style={{ textAlign: "left" }}>
                      <Button
                        className="buttonSave"
                        onClick={() => {
                          axios
                            .put(
                              `${process.env.REACT_APP_Backend_URI}api/Users/Disable/${element.userId}`
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
                      <Button
                        className="buttonCancel"
                        onClick={() => {
                          setDeleteModal({ ...deleteModal, isOpen: false });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ),
                  isOpen: true,
                });
              }}
              style={{ color: "red", fontSize: "13px", marginLeft: "10px" }}
            />,
          ];
        });
        setData(
          respData.sort((a, b) => {
            if (
              a.userCode.trim().toLowerCase() > b.userCode.trim().toLowerCase()
            ) {
              return 1;
            }
            if (
              b.userCode.trim().toLowerCase() > a.userCode.trim().toLowerCase()
            ) {
              return -1;
            }
            return 0;
          })
        );
      }, [])
      .catch(() => {});
  }, [deleteModal]);

  const dataBytype =
    type === "Type" ? data : data.filter((u) => u.role === type);
  const finalData =
    searchText === ""
      ? dataBytype
      : dataBytype.filter(
          (u) =>
            u.fullName
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(searchText.toLowerCase().replace(/\s+/g, "")) ||
            u.userCode.toLowerCase().includes(searchText.toLowerCase())
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
        Employee List
      </p>
      <Row gutter={45} style={{ marginBottom: "30px" }}>
        <Col xs={8} sm={8} md={7} lg={7} xl={6} xxl={5}>
          <Dropdown.Button
            placement="bottom"
            icon={<FilterOutlined />}
            overlay={
              <Menu>
                <Menu.Item
                  value="Teacher"
                  onClick={() => {
                    setType("Teacher");
                  }}
                >
                  Teacher
                </Menu.Item>
                <Menu.Item
                  value="Admin"
                  onClick={() => {
                    setType("Admin");
                  }}
                >
                  {" "}
                  Admin
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    setType("Type");
                  }}
                >
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
            placeholder="Search Employee"
            maxLength={255}
            allowClear
            onSearch={(e) => {
              setPage(1);
              setSearchText(e.replace(/ /g, ""));
            }}
          />
        </Col>
        <Col xs={8} sm={8} md={7} lg={7} xl={9} xxl={9}>
          <Button style={{ background: "#e30c18", color: "white" }}>
            <Link to="/createEmployee"> Create new employee</Link>
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
              {modal.data.userId}
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
              {modal.data.userCode}
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
            <td style={{ fontSize: "18px", color: "#838688" }}>Role</td>
            <td
              style={{
                fontSize: "18px",
                color: "#838688",
                textAlign: "justify",
                paddingLeft: "35px",
              }}
            >
              {modal.data.role}
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
                      userId: record.userId,
                      userCode: record.userCode,
                      fullName: record.fullName,
                      role: record.role,
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
