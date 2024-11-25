import { db, auth } from "@/firebaseConfig";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

// Constants for roles
export const ROLES = {
    ADMIN: "admin",
    USER: "user",
    MODERATOR: "moderator",
};

// Create a new user with role and email in Firestore
export const createUserRole = async (userId, email, role = ROLES.USER) => {
    try {
        const userRef = doc(db, "users", userId);
        await setDoc(userRef, {
            email: email, // Save the user's email
            role: role,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return true;
    } catch (error) {
        console.error("Error creating user role:", error);
        return false;
    }
};

// Get user's role
export const getUserRole = async (userId) => {
    try {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            return userDoc.data().role;
        }
        return null;
    } catch (error) {
        console.error("Error getting user role:", error);
        return null;
    }
};

// Update user's role and optionally email
export const updateUserRole = async (userId, newRole, email = null) => {
    try {
        const userRef = doc(db, "users", userId);
        const updateData = {
            role: newRole,
            updatedAt: new Date(),
            email: email ?? "",
        };

        await setDoc(userRef, updateData, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating user role:", error);
        return false;
    }
};

// Custom hook to get current user's role
export const useUserRole = () => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const unsubscribeRole = onSnapshot(userRef, (doc) => {
                    if (doc.exists()) {
                        setRole(doc.data().role);
                    } else {
                        setRole(null);
                    }
                    setLoading(false);
                });
                return () => unsubscribeRole();
            } else {
                setRole(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return { role, loading };
};

// Higher-order component to protect routes based on roles
export const withRoleAccess = (allowedRoles) => (WrappedComponent) => {
    return function WithRoleAccessComponent(props) {
        const { role, loading } = useUserRole();
        const [isAuthorized, setIsAuthorized] = useState(false);

        useEffect(() => {
            if (!loading) {
                setIsAuthorized(role && allowedRoles.includes(role));
            }
        }, [role, loading]);

        if (loading) {
            return <div>Loading...</div>; // Replace with your loading component
        }

        if (!isAuthorized) {
            return <div>Access Denied</div>; // Replace with your unauthorized component
        }

        return <WrappedComponent {...props} />;
    };
};
