import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Employee = db.define('Employee', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    mobileNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true // Assuming designation is optional
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true // Assuming gender is optional
    },
    course: {
        type: DataTypes.STRING,
        allowNull: true // Assuming course is optional
    },
    imgUpload: {
        type: DataTypes.STRING,
        allowNull: true // Assuming image upload path is optional
    }
}, {
    freezeTableName: true
});

export default Employee;
