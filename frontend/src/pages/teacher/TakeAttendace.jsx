import React, { useState, useEffect, useContext } from "react";
import { Table,Input,Button,Form,Modal } from "antd";
import axios from "axios";
import "../../styles/Styles.css";
import { CloseSquareOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useParams } from "react-router-dom";
import { Context } from "../../App";
export function TakeAttendace() {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const classId = useParams().classid;
  const scheduleId= useParams().scheduleId;
  const [loginState] = useContext(Context);
  const [reasonz,setReasonz] =useState({reason:""});
  const [studentId,setStudentId] =useState("");

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
      offset: 1,
    },
  };
  const [isLoading, setLoading] = useState({ isLoading: false });
  const [form] = Form.useForm();

  const columns = [
 
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
    // {
    //   title: "Reason",
    //   dataIndex: "reason",
    //   key: "reason",

    // },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
  
      },

  ];
  

  const handleAbsent = () => {

    axios
      .post(`${process.env.REACT_APP_Backend_URI}api/AbsentHistory/Add-history?scheduleId=${scheduleId}&teacherId=${loginState.id}&studentId=${studentId}`, reasonz)
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
 
  const [editModal, setEditModal] = useState({
    isOpen: false,
    title: "Absent",
  });
 
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_Backend_URI}api/Student/student-list/classroom-${classId}`,
        {}
      )
      .then(function (response) {
        let respData = response.data;
        console.log(respData);
        respData.forEach((element) => {
      
            // element.reason = [
              
            //   <Form.Item
            //     name="reason"
            //     rules={[
            //       { required: true, message: "Reason must be required" },
  
            //       {
            //         max: 50,
            //         message: "Reason must less than 50 characters",
            //       },
            //     ]}
            //     style={{ display: "block" }}
            //     hasFeedback
            //   >
            //     <Input
            //       onChange={(name) => {
            //         setReasonz({
            //           ...reasonz,
            //           reason: name.target.value,
            //         });
            //       }}
            //       disabled={isLoading.isLoading === true}
            //       maxLength={51}
            //       className="inputForm"
            //     />
            //   </Form.Item>
           
            // ];
            element.action =[
              <Button
             
             style={{ background: "#e30c18", color: "white" }}
          
            onClick={() => {
            
                setEditModal({
                  ...editModal,
                  isOpen: true,
                });
                setStudentId(element.studentId);
                

            }}
          >
            Absent
          </Button>
            ]
           
          });
            
        setData(respData);
      }, [])
      .catch(() => {});
  }, [classId, editModal, form, form.classId, isLoading.isLoading, reasonz]);
 

  

  const pagination = {
    current: page,
    PageSize: pageSize,
    total: data.length,
    pageSizeOptions: [5, 10, 15, 20],
    className: "ant-btn-dangerous",
    dangerous: true,
    onChange: (page, pageSize) => {
      setPage(page);
      setPageSize(pageSize);
    },
   showSizeChanger:true, 
     
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
        Take Attendace
      </p>

        <Table
          key="id"
          rowKey={(data) => data.id}
          columns={columns}
          pagination={pagination}
          dataSource={data}
          
         
        />
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
              handleAbsent();
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
    </>
  );
}
