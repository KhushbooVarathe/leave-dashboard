import AxiosInstance from '../intercepter/Intercepter';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ApexChart from "./ApexChart";
import LeavePage from "./LeavePage";
import AppliedLeaves from './AppliedLeaves';
const Dashboard = () => {
  const navigate = useNavigate();
  const [isLeave, setIsLeave] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [isAllLeave, setIsAllLeave] = useState(false);
  const [allLeaves, setAllLeaves] = useState([]);
  useEffect(() => {
    fetchEmpLeave();
  }, []);



  const fetchEmpLeave = () => {
    AxiosInstance.get(`${process.env.REACT_APP_API_URL}/get-user-leave`)
      .then((res) => {
        setEmployee(res?.data.users);
        setAllLeaves(res?.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const LogoutFun = async () => {
    try {
      const response = await AxiosInstance.get(`${process.env.REACT_APP_API_URL}/logout`)
      if (response.status == 200) {
        navigate('/')
        localStorage.clear()
      }
    } catch (error) {
      navigate('/')
      localStorage.clear()
    }
  }
  return (
    <React.Fragment>

      <div className="bg-white p-4 rounded shadow-md mb-6">
        <div className="flex items-center justify-between mb-4 mt-5">
          <p className="text-lg font-bold"> Dashboard</p>

          <Link onClick={() => {
            setIsLeave(true);
            setIsAllLeave(false)
          }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Apply Leave
          </Link>
        

          <Link onClick={() => setIsAllLeave(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            See Applied Leave
          </Link>
          <Link onClick={LogoutFun}
            className='bg-slate-200 p-2 rounded-lg'
          >
            Logout        
              </Link>

        </div>
        {
          !isAllLeave &&
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Sick Leaves</th>
                <th className="border px-4 py-2">Casual Leaves</th>
                <th className="border px-4 py-2">Earned Leaves</th>
                <th className="border px-4 py-2">Total Leaves</th>
                <th className="border px-4 py-2">Availed Leaves</th>
                <th className="border px-4 py-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((employee, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{employee.name}</td>
                  <td className="border px-4 py-2">{employee.sick}</td>
                  <td className="border px-4 py-2">{employee.casual}</td>
                  <td className="border px-4 py-2">{employee.earned}</td>
                  <td className="border px-4 py-2">{employee.total}</td>
                  <td className="border px-4 py-2">{employee.availed}</td>
                  <td className="border px-4 py-2">{employee.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }


      </div>
      <div>
        {isAllLeave && <AppliedLeaves allLeaves={allLeaves} />}
      </div>
      <div className="flex flex-wrap min-h-screen">
        {isLeave && (<>
          <div className="w-full md:w-1/2 p-5">
            <LeavePage setIsLeave={setIsLeave} employee={employee[0]} />
          </div>
          <div className="w-full md:w-1/2 p-5">
            <ApexChart employee={employee[0]} />
          </div>
        </>

        )}
        {!isLeave && (
          <div className="flex items-center justify-center w-full h-full">
            <ApexChart employee={employee[0]} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
