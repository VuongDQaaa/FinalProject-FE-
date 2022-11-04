import {
  Table,
  Modal,
  Button,
  Dropdown,
  Menu,
  Input,
  Col,
  Row,

} from "antd";
import {
 
  FilterOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";

import { Link } from "react-router-dom";

// import {useParams} from 'react-router-dom';
export default function RequestForReturningPage() {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCancelVisible, setIsModalCancelVisible] = useState(false);
  const [idCompleted, setIdCompleted] = useState();
  const [state, setState] = useState("Subject");
  const [searchText, setSearchText] = useState("");
  const [allSubjects, setAllSubjects] = useState();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCheckId = (id) => {
    setIdCompleted(id);
  };

  const handleOk = () => {
    setIsModalVisible(false);

    axios
      .put(
        `${process.env.REACT_APP_UNSPLASH_REQUEST_FOR_RETURNING_PUT}=${idCompleted}`
      )
      .then(() => {
        window.location.reload();
        setIdCompleted(null);
      })
      .catch(() => {});
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModalDelete = () => {
    setIsModalCancelVisible(true);
  };
  const handleCheckDeleteId = (id) => {
    setIdCompleted(id);
  };
  const handleDeleteOk = () => {
    setIsModalCancelVisible(false);
    axios
      .delete(
        `${process.env.REACT_APP_Backend_URI}api/AssignedTask/Delete-task/${idCompleted}`
      )
      .then((res) => {
        setIdCompleted(null);

        window.location.reload();
      })
      .catch((error) => {});
  };
  const handleCancelModal = () => {
    setIsModalCancelVisible(false);
  };
console.log(allSubjects);
  useEffect(() => {
    const fetchData = async () =>{
      try {
        const {data: response} = await axios.get(`${process.env.REACT_APP_Backend_URI}api/Subject/All-subjects`);
        setAllSubjects(response);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
    axios
      .get(`${process.env.REACT_APP_Backend_URI}api/AssignedTask/All-tasks`, {})
      .then(function (response) {
        let respData = response.data;
        console.log(respData);

        respData.forEach((element) => {
            console.log(element);
          element.action = [
            <Button
              className="buttonState"
              disabled={element.state === "Completed"}
              onClick={() => {
                showModal();
                handleCheckId(element.taskId);
              }}
            >
            <Link to={`/editTask/${element.taskId}`} id="editButton">
              Edit
              </Link>
            </Button>,

            <Button
            danger
              className="buttonState"
              disabled={element.state === "Completed"}
              onClick={() => {
                showModalDelete();
                handleCheckDeleteId(element.taskId);
              }}
            >
              Delete
            </Button>,
          ];
        });

        setData(respData);
      })
      .catch(() => {});
  }, []);

  const dataBytype =
    state === "Subject" ? data : data.filter((u) => u.subjectName === state);
  const finalData =
    searchText === ""
      ? dataBytype
      : dataBytype.filter(
          (u) =>
            u.subjectName
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(searchText.toLowerCase().replace(/\s+/g, "")) ||
            u.userName.toLowerCase().includes(searchText.toLowerCase()) ||
            u.autoFill.toLowerCase().includes(searchText.toLowerCase())
        );

  const columns = [
    {
      title: "No.",
      dataIndex: "taskId",
      key: "taskId",
      render: (text, record, id) => id + 1,
    },
    {
      title: "Assigned Task",
      dataIndex: "autoFill",
      key: "assetCode",
      sorter: (a, b) => {
        if (a.assetCode > b.assetCode) {
          return -1;
        }
        if (b.assetCode > a.assetCode) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <>
      <Modal
        closable={false}
        title="Are You Sure?"
        visible={isModalVisible}
        okText="Yes"
        cancelText="No"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div style={{ textAlign: "left" }}>
            <Button
              style={{}}
              key="Yes"
              onClick={handleOk}
              className="buttonSave"
            >
              Yes
            </Button>
            <Button key="No" onClick={handleCancel} className="buttonCancel">
              No
            </Button>
          </div>,
        ]}
      >
        <p>Do you want to edit this task?</p>
      </Modal>

      <Modal
        closable={false}
        title="Are You Sure?"
        visible={isModalCancelVisible}
        okText="Yes"
        cancelText="No"
        onOk={handleDeleteOk}
        onCancel={handleCancelModal}
        footer={[
          <div style={{ textAlign: "left" }}>
            <Button
              style={{}}
              key="Yes"
              onClick={handleDeleteOk}
              className="buttonSave"
            >
              Yes
            </Button>
            <Button
              key="No"
              onClick={handleCancelModal}
              className="buttonCancel"
            >
              No
            </Button>
          </div>,
        ]}
      >
        <p>Do you want to delete this task?</p>
      </Modal>
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
        Task List
      </p>
      <Row gutter={45} style={{ marginBottom: "30px" }}>
        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={7}>
          <Dropdown.Button
            style={{ float: "left" }}
            placement="bottom"
            icon={<FilterOutlined />}
            overlay={
              <Menu>
                {allSubjects?.map(item => <Menu.Item
                  value={item.subjectName}
                  onClick={() => {
                    setState(`${item.subjectName}`);
                  }}
                >
                  {item.subjectName}
                </Menu.Item>)}
              </Menu>
            }
          >
            {state}
          </Dropdown.Button>
        </Col>
        <Col xs={8} sm={8} md={6} lg={6} xl={6} xxl={6}>
          <Input.Search
            maxLength={255}
            allowClear
            onSearch={(e) => {
              setSearchText(e.replace(/ /g, ""));
            }}
            onEnter={(e) => {
              setSearchText(e.replace(/ /g, ""));
            }}
          />
        </Col>
        <Col xs={8} sm={8} md={7} lg={7} xl={9} xxl={9}>
          <Button style={{ background: "#33CCFF", color: "white" }}>
            <Link to="/createTask"> Assign new task</Link>
          </Button>
        </Col>
      </Row>
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
        <Table size="large" columns={columns} dataSource={finalData}></Table>
      )}
    </>
  );
}
