import React from 'react'
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import ErrorPage from "./pages/ErrorPage";
import RequireAuth from "./pages/RequireAuth";
import Layout from "./pages/Layout";
import { Routes, Route } from 'react-router-dom';


//TODO:Configure to use proper accountTypes and ensure it works.
const ADMIN = "ADMIN";
const USER = "USER";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="admin" element={<AdminPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="user" element={<UserPage />} />

                <Route element={<RequireAuth allowedRoles={[ADMIN]} />}>

                </Route>
                <Route element={<RequireAuth allowedRoles={[USER]} />}>

                </Route>
            </Route>
        </Routes >
    );
}

export default App