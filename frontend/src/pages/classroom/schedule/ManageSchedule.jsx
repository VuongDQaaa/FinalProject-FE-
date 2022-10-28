import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ManageSchedule() {
  const classroomId = useParams().classroomId;
  const [classroomDetail, setClassroomDetail] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_Backend_URI}api/Schedule/Get-Schedule/Classroom-id-${classroomId}`
        );
        setClassroomDetail(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [classroomId]);
  console.log(classroomDetail);
  const columns = [
    {
      title: "Monday",
      dataIndex: "monday",
    },
    {
      title: "Tuesday",
      dataIndex: "tuesday",
    },
    {
      title: "Wednesday",
      dataIndex: "wednesday",
    },
    {
      title: "Thursday",
      dataIndex: "thursday",
    },
    {
      title: "Friday",
      dataIndex: "friday",
    },
    {
      title: "Saturday",
      dataIndex: "saturday",
    },
  ];
// console.log(otherValArr);
  const data = [
    {
      key: '1',
      monday: 'John Brown',
    },
  ];

  return (
    <div>
      {JSON.stringify(classroomDetail)}
      <div>Morning</div>
      <Table columns={columns} dataSource={data} />
      <div>Afternoon</div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
