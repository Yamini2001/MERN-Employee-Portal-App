import express from "express";
import {
    getEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../controllers/Employee.js";
import { verifyUser, adminOnly } from "../middleware/AuthEmployee.js";

const router = express.Router();

router.get('/employees', verifyUser, adminOnly, getEmployees);
router.get('/employees/:id', verifyUser, adminOnly, getEmployeeById);
router.post('/employees', verifyUser,createEmployee);
router.patch('/employees/:id', verifyUser, adminOnly, updateEmployee);
router.delete('/employee/:id', verifyUser, adminOnly, deleteEmployee);

export default router;