// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../utils/AuthFunctions';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('auth-token'); // Get the token from local storage

    // If there's no token, redirect to the login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Check user role if trying to access SuperUser component
    const role = getUserRole();

    // Check if children is an array (as in the case of multiple children)
    const childType = Array.isArray(children) ? children[0].type.name : children.type.name;

    if (childType === "SuperUser") {
        if (role === "SuperUser") {
            // Allow access to SuperUser
            return children;
        } else {
            // Redirect to login if user is not a SuperUser
            return <Navigate to="/login" />;
        }
    }

    // If token exists and user is not accessing SuperUser component, render the child components
    return children;
};

export default ProtectedRoute;
