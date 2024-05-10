import React, { useEffect } from "react";
import Layout from "./Layout";
import EmployeeList from "../components/EmployeeList";
import { useDispatch, useSelector } from "react-redux";
const Products = () => {
  return (
    <Layout>
      <EmployeeList />
    </Layout>
  );
};

export default Products;