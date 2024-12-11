import axios from "axios";
import React, { useState } from "react";

const LeavePage = ({ setIsLeave,employee }) => {
  const [formData, setFormData] = useState({
    user_Id:employee?._id,
    leaveType: "",
    startDate: "",
    endDate: "",
    comments: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('formData: ', formData);
    const response= await axios.patch(`${process.env.REACT_APP_API_URL}/add-new-leave`,formData);
    console.log('response: ', response);
    if(response.status===200){
      setIsLeave(false);
      setFormData({ leaveType: "", startDate: "", endDate: "", comments: "" });
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-center mb-6">Apply for Leave</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Leave Type</label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              >
              <option value="">Select Leave Type</option>
              <option value="sick">Sick leave</option>
              <option value="casual">Casual</option>
              <option value="earned">Earned</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={today} 
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border  px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={formData.startDate || today} 
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full border  px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({ leaveType: "", startDate: "", endDate: "", comments: "" });
                setIsLeave(false); 
              }}
              className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeavePage;
