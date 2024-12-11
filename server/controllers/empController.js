 const employeeData =require('../models/index');
 const LeaveDataSchema=require('../models/appliedLeaves')
const { calculateDaysBetweenDates } = require('../utils/Index');

 const getUsersleaveDetails = async (req, res) => {
    try {
        const users = await employeeData.find();
        if(!users){
            res.status(404).json({ message: 'No users found' })
        }
        const allleaves=await LeaveDataSchema.find({user:users[0]._id})

        res.status(200).json({users,data:allleaves})
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const addNewLeave = async (req, res) => {
    const { user_Id, leaveType, startDate, endDate, comments } = req.body;
  
    try {

const createdData=await LeaveDataSchema.create({
  user:user_Id,
  leaveType,startDate,endDate,comments
})
console.log('createdData: ', createdData);
if(!createdData){
  return res.status(404).json({ message: "Can't generate your leave now,try again later" });
}

      const leaveDays = calculateDaysBetweenDates(startDate, endDate);
      const updateFields = {
        $inc: {
          [leaveType]: leaveDays, 
          availed: leaveDays,     
          balance: -leaveDays     
        }
      };
      const updatedEmployee = await employeeData.findByIdAndUpdate(
        user_Id,           
        updateFields,
        { new: true, runValidators: true }
      );
        if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.status(200).json({message:"Leave added successfully",data:createdData});
    } catch (error) {
      console.error("Error updating leave: ", error);
      res.status(500).json({ message: error.message });
    }
  };
  


module.exports = { getUsersleaveDetails,addNewLeave}
