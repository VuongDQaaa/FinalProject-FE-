// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "../styles/home.css"
// import { Context } from "../../App";
// export default function Home() {
//   const [data, setData] = useState([]);
//   const [loginState] = useContext(Context);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data: response } = await axios.get(
//           `${process.env.REACT_APP_Backend_URI}aapi/Schedule/Get-schedule/student-id-${loginState.id}`
//         );
//         console.log(response.data);
//         setData(response.data);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };
//     fetchData();
//   }, [loginState]);
//   return (
//     <>
//      <div class="table-responsive tablez">
//                     <table class="table table-bordered tablez">
//                         <thead>
//                             <tr class="bg-light-gray">
//                                 <th class="text-uppercase">Slot
//                                 </th>
//                                 <th class="text-uppercase">Monday</th>
//                                 <th class="text-uppercase">Tuesday</th>
//                                 <th class="text-uppercase">Wednesday</th>
//                                 <th class="text-uppercase">Thursday</th>
//                                 <th class="text-uppercase">Friday</th>
//                                 <th class="text-uppercase">Saturday</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td class="align-middle">Slot 1</td>
//                                 <td>
//                                     <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">Dance</span>
//                                     <div class="margin-10px-top font-size14">7:30-8:30</div>
//                                     <div class="font-size13 text-light-gray">Ivana Wong</div>
//                                 </td>
//                                 <td>
//                                     <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Yoga</span>
//                                     <div class="margin-10px-top font-size14">7:30-8:30</div>
//                                     <div class="font-size13 text-light-gray">Marta Healy</div>
//                                 </td>

//                                 <td>
//                                     <span class="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Music</span>
//                                     <div class="margin-10px-top font-size14">7:30-8:30</div>
//                                     <div class="font-size13 text-light-gray">Ivana Wong</div>
//                                 </td>
//                                 <td>
//                                     <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Dance</span>
//                                     <div class="margin-10px-top font-size14">7:30-8:30</div>
//                                     <div class="font-size13 text-light-gray">Ivana Wong</div>
//                                 </td>
//                                 <td>
//                                     <span class="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Art</span>
//                                     <div class="margin-10px-top font-size14">7:30-8:30</div>
//                                     <div class="font-size13 text-light-gray">Kate Alley</div>
//                                 </td>
//                                 <td>
//                                     <span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
//                                     <div class="margin-10px-top font-size14">7:30-8:30</div>
//                                     <div class="font-size13 text-light-gray">James Smith</div>
//                                 </td>
//                             </tr>

//                             <tr>
//                                 <td class="align-middle">Slot 2</td>
//                                 <td>
//                                     <span class="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Music</span>
//                                     <div class="margin-10px-top font-size14">8:30-9:30</div>
//                                     <div class="font-size13 text-light-gray">Ivana Wong</div>
//                                 </td>
//                                 <td class="bg-light-gray">

//                                 </td>
//                                 <td>
//                                     <span class="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Art</span>
//                                     <div class="margin-10px-top font-size14">8:30-9:30</div>
//                                     <div class="font-size13 text-light-gray">Kate Alley</div>
//                                 </td>
//                                 <td>
//                                     <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Yoga</span>
//                                     <div class="margin-10px-top font-size14">8:30-9:30</div>
//                                     <div class="font-size13 text-light-gray">Marta Healy</div>
//                                 </td>
//                                 <td>
//                                     <span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
//                                     <div class="margin-10px-top font-size14">8:30-9:30</div>
//                                     <div class="font-size13 text-light-gray">James Smith</div>
//                                 </td>
//                                 <td class="bg-light-gray">

//                                 </td>
//                             </tr>

//                             <tr>
//                                 <td class="align-middle">Slot 3</td>
//                                 <td>
//                                     <span class="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Break</span>
//                                     <div class="margin-10px-top font-size14">9:30-10:30</div>
//                                 </td>
//                                 <td>
//                                     <span class="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Break</span>
//                                     <div class="margin-10px-top font-size14">9:30-10:30</div>
//                                 </td>
//                                 <td>
//                                     <span class="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Break</span>
//                                     <div class="margin-10px-top font-size14">9:30-10:30</div>
//                                 </td>
//                                 <td>
//                                     <span class="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Break</span>
//                                     <div class="margin-10px-top font-size14">9:30-10:30</div>
//                                 </td>
//                                 <td>
//                                     <span class="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Break</span>
//                                     <div class="margin-10px-top font-size14">9:30-10:30</div>
//                                 </td>
//                                 <td>
//                                     <span class="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Break</span>
//                                     <div class="margin-10px-top font-size14">9:30-10:30</div>
//                                 </td>
//                             </tr>

//                             <tr>
//                                 <td class="align-middle">Slot 4</td>
//                                 <td class="bg-light-gray">

//                                 </td>
//                                 <td>
//                                     <span class="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Art</span>
//                                     <div class="margin-10px-top font-size14">10:30-11:30</div>
//                                     <div class="font-size13 text-light-gray">Kate Alley</div>
//                                 </td>
//                                 <td>
//                                     <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Dance</span>
//                                     <div class="margin-10px-top font-size14">10:30-11:30</div>
//                                     <div class="font-size13 text-light-gray">Ivana Wong</div>
//                                 </td>
//                                 <td>
//                                     <span class="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Music</span>
//                                     <div class="margin-10px-top font-size14">10:30-11:30</div>
//                                     <div class="font-size13 text-light-gray">Ivana Wong</div>
//                                 </td>
//                                 <td class="bg-light-gray">
//                                 </td>
//                                 <td>
//                                     <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Yoga</span>
//                                     <div class="margin-10px-top font-size14">10:30-11:30</div>
//                                     <div class="font-size13 text-light-gray">Marta Healy</div>
//                                 </td>
//                             </tr>

                           
//                         </tbody>
//                     </table>
//                     </div>

//     </>
//   );
// }
