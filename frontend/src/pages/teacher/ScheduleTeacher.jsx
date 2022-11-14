import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../../App";
import { EditFilled} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DatePicker } from "antd";
import moment from 'moment';

export default function ScheduleTeacher() {
  const [gridData, setGridData] = useState([]);
  const [loginState] = useContext(Context);
  const [year, setYear] = useState();
  const [week, setWeek] = useState();
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
  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_Backend_URI}api/Schedule/Get-Schedule/Teacher-id-${loginState.id}?year=${year}&week=${week}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginState.token}`,
      },
    })
      .then(function (response) {
        setGridData(response.data);
      })
      .catch(function (error) {});
  }, [loginState, year, week]);

  console.log(gridData);
  const MONDAY1 = [];
  const MONDAY2 = [];
  const MONDAY3 = [];
  const MONDAY4 = [];
  const MONDAY5 = [];
  const MONDAY6 = [];
  const MONDAY7 = [];
  const MONDAY8 = [];
  const MONDAY9 = [];
  const TUESDAY1 = [];
  const TUESDAY4 = [];
  const TUESDAY3 = [];
  const TUESDAY5 = [];
  const TUESDAY6 = [];
  const TUESDAY7 = [];
  const TUESDAY8 = [];
  const TUESDAY9 = [];
  const TUESDAY2 = [];
  const WEDNESDAY1 = [];
  const WEDNESDAY2 = [];
  const WEDNESDAY3 = [];
  const WEDNESDAY4 = [];
  const WEDNESDAY5 = [];
  const WEDNESDAY6 = [];
  const WEDNESDAY7 = [];
  const WEDNESDAY8 = [];
  const WEDNESDAY9 = [];
  const THURSDAY1 = [];
  const THURSDAY2 = [];
  const THURSDAY3 = [];
  const THURSDAY4 = [];
  const THURSDAY5 = [];
  const THURSDAY6 = [];
  const THURSDAY7 = [];
  const THURSDAY8 = [];
  const THURSDAY9 = [];
  const FRIDAY1 = [];
  const FRIDAY2 = [];
  const FRIDAY3 = [];
  const FRIDAY4 = [];
  const FRIDAY5 = [];
  const FRIDAY6 = [];
  const FRIDAY7 = [];
  const FRIDAY8 = [];
  const FRIDAY9 = [];
  const SATURDAY1 = [];
  const SATURDAY2 = [];
  const SATURDAY3 = [];
  const SATURDAY4 = [];
  const SATURDAY5 = [];
  const SATURDAY6 = [];
  const SATURDAY7 = [];
  const SATURDAY8 = [];
  const SATURDAY9 = [];
  const SUNDAY1 = [];
  const SUNDAY2 = [];
  const SUNDAY3 = [];
  const SUNDAY4 = [];
  const SUNDAY5 = [];
  const SUNDAY6 = [];
  const SUNDAY7 = [];
  const SUNDAY8 = [];
  const SUNDAY9 = [];
  for (let i = 0; i < gridData.length; i++) {
    
    if (gridData[i].day === "Monday") {
      if (gridData[i].period === 1) {
        MONDAY1.push(
          <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
        );
      }
      if (gridData[i].period === 2) {
        MONDAY2.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
        );
      }
      if (gridData[i].period === 3) {
        MONDAY3.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
        );
      }
      if (gridData[i].period === 4) {
        MONDAY4.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
        );
      }
      if (gridData[i].period === 5) {
        MONDAY5.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
        );
      }
      if (gridData[i].period === 6) {
        MONDAY6.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
        );
      }
      if (gridData[i].period === 7) {
        MONDAY7.push(
          <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
        );
      }
      if (gridData[i].period === 8) {
        MONDAY8.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
        );
      }
      if (gridData[i].period === 9) {
        MONDAY9.push(
          <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
        );
      }
    }
    if (gridData[i].day === "Tusday") {
      if (gridData[i].period === 1) {
        TUESDAY1.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
        );
      }
      if (gridData[i].period === 2) {
        TUESDAY2.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
        );
      }
      if (gridData[i].period === 3) {
        TUESDAY3.push(
          <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
        );
      }
      if (gridData[i].period === 4) {
        TUESDAY4.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
        );
      }
      if (gridData[i].period === 5) {
        TUESDAY5.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
        );
      }
      if (gridData[i].period === 6) {
        TUESDAY6.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
        );
      }
      if (gridData[i].period === 7) {
        TUESDAY7.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
        );
      }
      if (gridData[i].period === 8) {
        TUESDAY8.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
        );
      }
      if (gridData[i].period === 9) {
        TUESDAY9.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
        );
      }
    }
    if (gridData[i].day === "Wednesday") {
        if (gridData[i].period === 1) {
            WEDNESDAY1.push(
              <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
            );
          }
          if (gridData[i].period === 2) {
            WEDNESDAY2.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 3) {
            WEDNESDAY3.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 4) {
            WEDNESDAY4.push(
              <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
            );
          }
          if (gridData[i].period === 5) {
            WEDNESDAY5.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 6) {
            WEDNESDAY6.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 7) {
            WEDNESDAY7.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 8) {
            WEDNESDAY8.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 9) {
            WEDNESDAY9.push(
              <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
            );
          }
    }
    if (gridData[i].day === "Thurday") {
        if (gridData[i].period === 1) {
            THURSDAY1.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 2) {
            THURSDAY2.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 3) {
           THURSDAY3.push(
            <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
            );
          }
          if (gridData[i].period === 4) {
            THURSDAY4.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 5) {
            THURSDAY5.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 6) {
            THURSDAY6.push(
              <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
            );
          }
          if (gridData[i].period === 7) {
            THURSDAY7.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 8) {
            THURSDAY8.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 9) {
            THURSDAY9.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
    }
    if (gridData[i].day === "Friday") {
        if (gridData[i].period === 1) {
            FRIDAY1.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 2) {
            FRIDAY2.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 3) {
            FRIDAY3.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 4) {
            FRIDAY4.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 5) {
            FRIDAY5.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 6) {
            FRIDAY6.push(
              <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
            );
          }
          if (gridData[i].period === 7) {
            FRIDAY7.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 8) {
            FRIDAY8.push(
              <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
            );
          }
          if (gridData[i].period === 9) {
            FRIDAY9.push(
              <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
            );
          }
    }
    if (gridData[i].day === "Satuday") {
        if (gridData[i].period === 1) {
            SATURDAY1.push(
              <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
            );
          }
          if (gridData[i].period === 2) {
            SATURDAY2.push(
              <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
            );
          }
          if (gridData[i].period === 3) {
            SATURDAY3.push(
              <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
            );
          }
          if (gridData[i].period === 4) {
            SATURDAY4.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 5) {
            SATURDAY5.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 6) {
            SATURDAY6.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 7) {
            SATURDAY7.push(
              <div class="absent">
              <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
              {gridData[i].autoFill}
             
            </div>
               <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
             <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
            </Link>
            </div> 
            );
          }
          if (gridData[i].period === 8) {
            SATURDAY8.push(
              <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
            );
          }
          if (gridData[i].period === 9) {
            SATURDAY9.push(
              <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
            );
          }
    }
    if (gridData[i].day === "Sunday") {
      if (gridData[i].period === 1) {
          SUNDAY1.push(
            <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
          );
        }
        if (gridData[i].period === 2) {
          SUNDAY2.push(
            <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
          );
        }
        if (gridData[i].period === 3) {
          SUNDAY3.push(
            <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
          );
        }
        if (gridData[i].period === 4) {
          SUNDAY4.push(
            <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
          );
        }
        if (gridData[i].period === 5) {
          SUNDAY5.push(
            <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
          );
        }
        if (gridData[i].period === 6) {
         SUNDAY6.push(
          <div class="absent">
          <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
          {gridData[i].autoFill}
         
        </div>
           <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
         <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
        </Link>
        </div> 
          );
        }
        if (gridData[i].period === 7) {
          SUNDAY7.push(
            <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
          );
        }
        if (gridData[i].period === 8) {
          SUNDAY8.push(
            <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
          );
        }
        if (gridData[i].period === 9) {
          SUNDAY9.push(
            <div class="absent">
            <div class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white text-center ">
            {gridData[i].autoFill}
           
          </div>
             <Link to={`/TakeAttendace/${gridData[i].classroomId}/${gridData[i].scheduleId}`} id="editButton">
           <EditFilled style={{  fontSize: "25px",display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          </div> 
          );
        }
  }
  }

  return (
    <>
   <DatePicker defaultValue={moment()} format={customWeekStartEndFormat} picker="week" onChange={onChange}/>
   
      <div class="table-responsive tablez">
      <h2>Morning</h2>
        <table class="table table-bordered tablez">
          <thead>
            <tr class="bg-light-gray">
              <th class="text-uppercase">Slot</th>
              <th class="text-uppercase">Monday</th>
              <th class="text-uppercase">Tuesday</th>
              <th class="text-uppercase">Wednesday</th>
              <th class="text-uppercase">Thursday</th>
              <th class="text-uppercase">Friday</th>
              <th class="text-uppercase">Saturday</th>
              <th class="text-uppercase">Sunday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="align-middle">
                <div class="margin-10px-top font-size14">Slot 1</div>
                <div>7:45 - 8:00</div>
              </td>
              <td>{MONDAY1}</td>
              <td>{TUESDAY1}</td>
              <td>{WEDNESDAY1}</td>
              <td>{THURSDAY1}</td>
              <td>{FRIDAY1}</td>
              <td>{SATURDAY1}</td>
              <td>{SUNDAY1}</td>
              
            </tr>

            <tr>
              <td class="align-middle">
                <div class="margin-10px-top font-size14">Slot 2</div>
                <div>8:05 - 8:50</div>
              </td>
              <td>{MONDAY2}</td>
              <td>{TUESDAY2}</td>
              <td>{WEDNESDAY2}</td>
              <td>{THURSDAY2}</td>
              <td>{FRIDAY2}</td>
              <td>{SATURDAY2}</td>
              <td>{SUNDAY2}</td>
            </tr>

            <tr>
              <td class="align-middle">
                <div class="margin-10px-top font-size14">Slot 3</div>
                <div>9:05 - 9:50</div>
              </td>
              <td>{MONDAY3}</td>
              <td>{TUESDAY3}</td>
              <td>{WEDNESDAY3}</td>
              <td>{THURSDAY3}</td>
              <td>{FRIDAY3}</td>
              <td>{SATURDAY3}</td>
              <td>{SUNDAY3}</td>
            </tr>

            <tr>
              <td class="align-middle">
                <div class="margin-10px-top font-size14">Slot 4</div>
                <div>9:55 - 10:40</div>
              </td>
              <td>{MONDAY4}</td>
              <td>{TUESDAY4}</td>
              <td>{WEDNESDAY4}</td>
              <td>{THURSDAY4}</td>
              <td>{FRIDAY4}</td>
              <td>{SATURDAY4}</td>
              <td>{SUNDAY4}</td>
            </tr>
            
            <tr>
              <td class="align-middle">
                <div class="margin-10px-top font-size14">Slot 5</div>
                <div>10:45 - 11:30</div>
              </td>
              <td>{MONDAY5}</td>
              <td>{TUESDAY5}</td>
              <td>{WEDNESDAY5}</td>
              <td>{THURSDAY5}</td>
              <td>{FRIDAY5}</td>
              <td>{SATURDAY5}</td>
              <td>{SUNDAY5}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-responsive tablez">
      <h2>Afternoon</h2>
        <table class="table table-bordered tablez">
          <thead>
            <tr class="bg-light-gray">
              <th class="text-uppercase">Slot</th>
              <th class="text-uppercase">Monday</th>
              <th class="text-uppercase">Tuesday</th>
              <th class="text-uppercase">Wednesday</th>
              <th class="text-uppercase">Thursday</th>
              <th class="text-uppercase">Friday</th>
              <th class="text-uppercase">Saturday</th>
              <th class="text-uppercase">Sunday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="align-middle">
                <div class="margin-10px-top font-size14">Slot 1</div>
                <div>14:00 - 14:30</div>
              </td>
              <td>{MONDAY6}</td>
              <td>{TUESDAY6}</td>
              <td>{WEDNESDAY6}</td>
              <td>{THURSDAY6}</td>
              <td>{FRIDAY6}</td>
              <td>{SATURDAY6}</td>
              <td>{SUNDAY6}</td>
            </tr>

            <tr>
              <td class="align-middle">
                <div class="margin-10px-top font-size14">Slot 2</div>
                <div>14:40 - 15:10</div>
              </td>
              <td>{MONDAY7}</td>
              <td>{TUESDAY7}</td>
              <td>{WEDNESDAY7}</td>
              <td>{THURSDAY7}</td>
              <td>{FRIDAY7}</td>
              <td>{SATURDAY7}</td>
              <td>{SUNDAY7}</td>
            </tr>

            <tr>
              <td class="align-middle">
                <div class="margin-10px-top font-size14">Slot 3</div>
                <div>15:20 - 15:50</div>
              </td>
              <td>{MONDAY8}</td>
              <td>{TUESDAY8}</td>
              <td>{WEDNESDAY8}</td>
              <td>{THURSDAY8}</td>
              <td>{FRIDAY8}</td>
              <td>{SATURDAY8}</td>
              <td>{SUNDAY8}</td>
            </tr>

            <tr>
              <td class="align-middle">
                <div class="margin-10px-top font-size14">Slot 4</div>
                <div>16:00 - 16:30</div>
              </td>
              <td>{MONDAY9}</td>
              <td>{TUESDAY9}</td>
              <td>{WEDNESDAY9}</td>
              <td>{THURSDAY9}</td>
              <td>{FRIDAY9}</td>
              <td>{SATURDAY9}</td>
              <td>{SUNDAY9}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
