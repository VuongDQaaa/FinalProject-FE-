import { Button, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CloseSquareOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import moment from 'moment';

export default function AfternoonSchedule() {
  const classroomId = useParams().classroomId;
  const [classroomDetail, setClassroomDetail] = useState();
  const [data, setData] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    title: "Notice",
    content: <p>Do you want to delete this schedule?</p>,
    footer: (
      <div style={{ textAlign: "left" }}>
        <Button className="buttonSave">Delete</Button>
      </div>
    ),
  });
  const [year, setYear] = useState();
  const [week, setWeek] = useState("");
  const weekFormat = 'DD/MM';
  const customWeekStartEndFormat = (value) =>
  `${moment(value).startOf('week').format(weekFormat)} - ${moment(value)
    .endOf('week')
    .format(weekFormat)}`;
    const onChange = (date, dateString) => {
      setYear(date.year());
      setWeek(dateString);
      console.log(date.year(), dateString, date.week());
    };
  const findScheduleId = (day, period) => {
    let result;
    classroomDetail.forEach(
      (i) => i.day === day && i.period === period && (result = i.scheduleId)
    );
    return result;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_Backend_URI}api/Schedule/Get-Schedule/Classroom-id-${classroomId}?year=${year}&week=${week}`
        )
        setClassroomDetail(response.filter(itemInArray => itemInArray.session === "Afternoon"));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [classroomId, year, week]);
  useEffect(() => {
    const fillData = () => {
      let result = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }];
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

  const columns = [
    {title: "Slot",
    dataIndex: "slot",
    render: (text, record, index) =>(<>{`Slot ${index + 1}`}</>)},
    {
      title: (
        <div>
          <div>Monday</div>
          <div>
            {moment(moment(`${week.split(" - ")[0]}/${year}`, "DD/MM/YYYY").add(1, "d")).format(
              "DD/MM/YYYY"
            )}
          </div>
        </div>
      ),
      dataIndex: "monday",
      render: (text, record, index) =>
        text ? (
          <div>
            <div>{text}</div>
            <Button
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
                              `${
                                process.env.REACT_APP_Backend_URI
                              }api/Schedule/Delete-schedule/${findScheduleId(
                                "Monday",
                                index + 1
                              )}`
                            )
                            .then(() => {
                              setDeleteModal({
                                ...deleteModal,
                                isOpen: false,
                              });
                              window.location.reload();
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
            >
              Delete
            </Button>
          </div>
        ) : (
          <Link
          to={`/add-schedule/monday/afternon/${index + 1}/${classroomId}/date${moment(moment(`${week.split(" - ")[0]}/${year}`, "DD/MM/YYYY").add(1, "d")).format(
            "DD-MM-YYYY"
          )}`}
          >
            <Button danger>Add</Button>
          </Link>
        ),
    },
    {
      title: (
        <div>
          <div>Tuesday</div>
          <div>
            {moment(moment(`${week.split(" - ")[0]}/${year}`, "DD/MM/YYYY").add(2, "d")).format(
              "DD/MM/YYYY"
            )}
          </div>
        </div>
      ),
      dataIndex: "tuesday",
      render: (text, record, index) =>
        text ? (
          <div>
            <div>{text}</div>
            <Button
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
                              `${
                                process.env.REACT_APP_Backend_URI
                              }api/Schedule/Delete-schedule/${findScheduleId(
                                "Tuesday",
                                index + 1
                              )}`
                            )
                            .then(() => {
                              setDeleteModal({
                                ...deleteModal,
                                isOpen: false,
                              });
                              window.location.reload();
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
            >
              Delete
            </Button>
          </div>
        ) : (
          <Link
          to={`/add-schedule/tuesday/afternon/${index + 1}/${classroomId}/date${moment(moment(`${week.split(" - ")[0]}/${year}`, "DD/MM/YYYY").add(2, "d")).format(
            "DD-MM-YYYY"
          )}`}
          >
            <Button danger>Add</Button>
          </Link>
        ),
    },
    {
      title: (
        <div>
          <div>Wednesday</div>
          <div>
            {moment(moment(`${week.split(" - ")[0]}/${year}`, "DD/MM/YYYY").add(3, "d")).format(
              "DD/MM/YYYY"
            )}
          </div>
        </div>
      ),
      dataIndex: "wednesday",
      render: (text, record, index) =>
        text ? (
          <div>
            <div>{text}</div>
            <Button
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
                              `${
                                process.env.REACT_APP_Backend_URI
                              }api/Schedule/Delete-schedule/${findScheduleId(
                                "Wednesday",
                                index + 1
                              )}`
                            )
                            .then(() => {
                              setDeleteModal({
                                ...deleteModal,
                                isOpen: false,
                              });
                              window.location.reload();
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
            >
              Delete
            </Button>
          </div>
        ) : (
          <Link
          to={`/add-schedule/wednessday/afternon/${index + 1}/${classroomId}/date${moment(moment(`${week.split(" - ")[0]}/${year}`, "DD/MM/YYYY").add(3, "d")).format(
            "DD-MM-YYYY"
          )}`}
          >
            <Button danger>Add</Button>
          </Link>
        ),
    },
    {
      title: (
        <div>
          <div>Thursday</div>
          <div>
            {moment(moment(`${week.split(" - ")[0]}/${year}`, "DD/MM/YYYY").add(4, "d")).format(
              "DD/MM/YYYY"
            )}
          </div>
        </div>
      ),
      dataIndex: "thursday",
      render: (text, record, index) =>
        text ? (
          <div>
            <div>{text}</div>
            <Button
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
                              `${
                                process.env.REACT_APP_Backend_URI
                              }api/Schedule/Delete-schedule/${findScheduleId(
                                "Thursday",
                                index + 1
                              )}`
                            )
                            .then(() => {
                              setDeleteModal({
                                ...deleteModal,
                                isOpen: false,
                              });
                              window.location.reload();
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
            >
              Delete
            </Button>
          </div>
        ) : (
          <Link
          to={`/add-schedule/thusday/afternon/${index + 1}/${classroomId}/date${moment(moment(`${week.split(" - ")[0]}/${year}`, "DD/MM/YYYY").add(4, "d")).format(
            "DD-MM-YYYY"
          )}`}
          >
            <Button danger>Add</Button>
          </Link>
        ),
    },
    {
      title: (
        <div>
          <div>Friday</div>
          <div>
            {moment(moment(`${week.split(" - ")[0]}/${year}`, "DD/MM/YYYY").add(5, "d")).format(
              "DD/MM/YYYY"
            )}
          </div>
        </div>
      ),
      dataIndex: "friday",
      render: (text, record, index) =>
        text ? (
          <div>
            <div>{text}</div>
            <Button
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
                              `${
                                process.env.REACT_APP_Backend_URI
                              }api/Schedule/Delete-schedule/${findScheduleId(
                                "Friday",
                                index + 1
                              )}`
                            )
                            .then(() => {
                              setDeleteModal({
                                ...deleteModal,
                                isOpen: false,
                              });
                              window.location.reload();
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
            >
              Delete
            </Button>
          </div>
        ) : (
          <Link
          to={`/add-schedule/monday/afternon/${index + 1}/${classroomId}/date${moment(moment(`${week.split(" - ")[0]}/${year}`, "DD/MM/YYYY").add(5, "d")).format(
            "DD-MM-YYYY"
          )}`}
          >
            <Button danger>Add</Button>
          </Link>
        ),
    },
    {
      title: (
        <div>
          <div>Saturday</div>
          <div>
            {moment(moment(`${week.split(" - ")[0]}/${year}`, "DD/MM/YYYY").add(6, "d")).format(
              "DD/MM/YYYY"
            )}
          </div>
        </div>
      ),
      dataIndex: "saturday",
      render: (text, record, index) =>
        text ? (
          <div>
            <div>{text}</div>
            <Button
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
                              `${
                                process.env.REACT_APP_Backend_URI
                              }api/Schedule/Delete-schedule/${findScheduleId(
                                "Saturday",
                                index + 1
                              )}`
                            )
                            .then(() => {
                              setDeleteModal({
                                ...deleteModal,
                                isOpen: false,
                              });
                              window.location.reload();
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
            >
              Delete
            </Button>
          </div>
        ) : (
          <Link
          to={`/add-schedule/monday/afternon/${index + 1}/${classroomId}/date${moment(moment(`${week.split(" - ")[0]}/${year}`, "DD/MM/YYYY").add(6, "d")).format(
            "DD-MM-YYYY"
          )}`}
          >
            <Button danger>Add</Button>
          </Link>
        ),
    },
  ];

  return (
    <div>
   <DatePicker defaultValue={moment()} format={customWeekStartEndFormat} picker="week" onChange={onChange}/>
      <Table columns={columns} dataSource={data} pagination={false}/>
      {/* <Table columns={columns} dataSource={data} /> */}
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
    </div>
  );
}
