import Employee from '../models/EmployeeModel.js';

export const createEmployee = async (req, res) => {
    const { name, email, mobileNo, designation, gender, course, imgUpload } = req.body;

    try {
        const employee = await Employee.create({
            name,
            email,
            mobileNo,
            designation,
            gender,
            course,
            imgUpload
        });

        res.status(201).json({ success: true, msg: "Employee created successfully", employee });
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
}

export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, email, mobileNo, designation, gender, course, imgUpload } = req.body;

    try {
        let employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({ success: false, msg: "Employee not found" });
        }

        employee = await employee.update({
            name,
            email,
            mobileNo,
            designation,
            gender,
            course,
            imgUpload
        });

        res.status(200).json({ success: true, msg: "Employee updated successfully", employee });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
}

export const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({ success: false, msg: "Employee not found" });
        }

        await employee.destroy();

        res.status(200).json({ success: true, msg: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
}
