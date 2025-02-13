import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/navbar/Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";
import Create from "./Create";
import MyBlog from "./MyBlog";
import Detailes from "../components/Detailes";
import Update from "./Update";
import AuthCheck from "../components/authcheck/AuthCheck";
import Protected from "../components/authcheck/Protected";
import PageNotFound from "../components/PageNotFound";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;

const Pages = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthCheck />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={Protected}>
          <Route path="/create" element={<Create />} />
          <Route path="/blog/myblog" element={<MyBlog />} />
          <Route path="/blog/update/:id" element={<Update />} />
        </Route>
        <Route path="/blogdetails/:id" element={<Detailes />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
