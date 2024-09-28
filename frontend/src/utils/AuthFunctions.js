import { jwtDecode } from 'jwt-decode';

// Function to get the token from localStorage
export function getAuthToken() {
    return localStorage.getItem('authToken');
}

export function getUserFromToken() {
    const token = getAuthToken();
    if (!token) {
        return null;
    }

    try {
        const decoded = jwtDecode(token);
        return decoded.user;  // Assuming 'user' contains id, role, etc.
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}

// Function to extract the user's role
export function getUserRole() {
    const user = getUserFromToken();

    return user ? user.role : null;
}

// Function to extract the user's ID
export function getUserId() {
    const user = getUserFromToken();
    return user ? user.id : null;
}
export function getUserName() {
    const user = getUserFromToken();
    return user ? user.name : null;
}
// Utility to check if the user is authenticated
export function isAuthenticated() {
    const token = getAuthToken();
    return !!token;  // If token exists, user is authenticated
}
