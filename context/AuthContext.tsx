import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    UserCredential,
} from 'firebase/auth';

interface IProps {
    children: React.ReactNode;
}

interface IAuthContext {
    currentUser: User | null;
    login: (email: string, password: string) => Promise<UserCredential>;
    signup: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }: IProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    function signup(email: string, password: string): Promise<UserCredential> {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout(): Promise<void> {
        return signOut(auth);
    }

    useEffect(() => {
        onAuthStateChanged(auth, async user => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    const value: IAuthContext = {
        currentUser,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
