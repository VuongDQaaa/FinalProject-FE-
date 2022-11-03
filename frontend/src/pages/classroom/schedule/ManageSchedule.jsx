import { Button, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ManageSchedule() {
  const classroomId = useParams().classroomId;
  const [classroomDetail, setClassroomDetail] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_Backend_URI}api/Schedule/Get-Schedule/Classroom-id-${classroomId}`
        );
        setClassroomDetail([
          {
            scheduleId: 1,
            session: "Morning",
            period: 1,
            day: "Monday",
            autoFill: "Sinh - Teacher",
          },
          {
            scheduleId: 2,
            session: "Morning",
            period: 2,
            day: "Friday",
            autoFill: "Van - Teacher",
          },
          {
            scheduleId: 3,
            session: "Morning",
            period: 3,
            day: "Tuesday",
            autoFill: "Hoa - Teacher",
          },
          {
            scheduleId: 4,
            session: "Morning",
            period: 1,
            day: "Thursday",
            autoFill: "Anh - Teacher",
          },
        ]);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [classroomId]);
  useEffect(() => {
    const fillData = () => {
      let result = [];
      classroomDetail?.forEach((item, index) => {
        if (result.some((el) => el.key === item.period)) {
          const indexOfEl = result.findIndex((el) => el.key === item.period);
          result[indexOfEl] = {
            ...result[indexOfEl],
            [item.day.toLowerCase()]: item.autoFill,
          };
        } else {
          result = [
            ...result,
            {
              ...result[index],
              [item.day.toLowerCase()]: item.autoFill,
              key: item.period,
            },
          ];
        }
      });
      setData(result);
    };
    fillData();
  }, [classroomDetail]);
  console.log(data);
  const columns = [
    {
      title: "Monday",
      dataIndex: "monday",
      render:  ((text, record, index) => (text?<div>
        <div>{text}</div>
        <div>{index}</div>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>:<Link to={`/add-schedule/monday/morning/${index+1}/${classroomId}`}>
      <Button danger>Add</Button>
      </Link>))  
    },
    {
      title: "Tuesday",
      dataIndex: "tuesday",
      render:  ((text, record, index) => (text?<div>
        <div>{text}</div>
        <div>{index}</div>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>:<Link to={`/add-schedule/tuesday/morning/${index+1}/${classroomId}`}>
      <Button danger>Add</Button>
      </Link>))  
    },
    {
      title: "Wednesday",
      dataIndex: "wednesday",
      render:  ((text, record, index) => (text?<div>
        <div>{text}</div>
        <div>{index}</div>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>:<Link to={`/add-schedule/wednesday/morning/${index+1}/${classroomId}`}>
      <Button danger>Add</Button>
      </Link>))    
    },
    {
      title: "Thursday",
      dataIndex: "thursday",
      render: ((text, record, index) => (text?<div>
        <div>{text}</div>
        <div>{index}</div>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>:<Link to={`/add-schedule/thursday/morning/${index+1}/${classroomId}`}>
      <Button danger>Add</Button>
      </Link>))   
    },
    {
      title: "Friday",
      dataIndex: "friday",
      render:  ((text, record, index) => (text?<div>
        <div>{text}</div>
        <div>{index}</div>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>:<Link to={`/add-schedule/friday/morning/${index+1}/${classroomId}`}>
      <Button danger>Add</Button>
      </Link>))  
    },
    {
      title: "Saturday",
      dataIndex: "saturday",
      render:  ((text, record, index) => (text?<div>
        <div>{text}</div>
        <div>{index}</div>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>:<Link to={`/add-schedule/saturday/morning/${index+1}/${classroomId}`}>
      <Button danger>Add</Button>
      </Link>)) 
    },
  ];
  // console.log(otherValArr);

  return (
    <div>
      {JSON.stringify(classroomDetail)}
      <div>Morning</div>
      <Table columns={columns} dataSource={data} />
      <div>Afternoon</div>
      {/* <Table columns={columns} dataSource={data} /> */}
    </div>
  );
}
