import React from 'react'

const AppliedLeaves = ({ allLeaves = [] }) => {
  return (
    <div className='p-3 shadow-md'>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Leave Type</th>
            <th className="border px-4 py-2">From Date</th>
            <th className="border px-4 py-2">To Date</th>
            <th className="border px-4 py-2">Reason for leave</th>
          </tr>
        </thead>
        <tbody>
          {allLeaves?.map((data, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{data?.leaveType}</td>
              <td className="border px-4 py-2">{data?.startDate}</td>
              <td className="border px-4 py-2">{data?.endDate}</td>
              <td className="border px-4 py-2">{data?.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>    </div>
  )
}

export default AppliedLeaves
