import React, { useState, useEffect, useContext } from "react";
import { Table } from "antd";
import axios from "axios";
import "../../styles/Styles.css";
import moment from "moment";
import "antd/dist/antd.css";
import { Context } from "../../App";
export function AbsentHistory() {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
 
  const [loginState] = useContext(Context);

 
  const columns = [
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Created By",
      dataIndex: "teacherFullName",
      key: "teacherFullName",
      sorter: (a, b) => {
        if (a.teacherFullName > b.teacherFullName) {
          return -1;
        }
        if (b.teacherFullName > a.teacherFullName) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Session",
      dataIndex: "session",
      key: "session",
    },
    {
      title: "Slot",
      dataIndex: "slot",
      key: "slot",
    },
    {
      title: "Subject Name",
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

  ];
 
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_Backend_URI}api/AbsentHistory/Get-history-student/${loginState.id}`,
        {}
      )
      .then(function (response) {
        let respData = response.data;
        console.log(respData);

        respData.forEach((element) => {
          //   element.fullName = element.firstName + " " + element.lastName;
          element.createdDate = moment(
            new Date(element.createdDate).toLocaleDateString("en-US")
          ).format("DD/MM/YYYY");
         
        });
        setData(respData);
      }, [])
      .catch(() => {});
  }, [loginState]);
 

  

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
        Absent History
      </p>

        <Table
          key="id"
          rowKey={(data) => data.id}
          columns={columns}
          pagination={pagination}
          dataSource={data}
         
        />
      
    </>
  );
}
