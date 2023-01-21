import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuth } from '@/context/AuthContext';

export default function useFetchTodos() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [todos, setTodos] = useState<{} | null>(null);

    const { currentUser } = useAuth();

    useEffect(() => {
        (async function () {
            if (currentUser) {
                try {
                    const docRef = doc(db, 'users', currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        console.log(docSnap.data().todos);
                        setTodos(docSnap.data().todos);
                    } else {
                        setTodos(null);
                    }
                } catch (err) {
                    setError('Failed to load todos');
                } finally {
                    setLoading(false);
                }
            }
        })();
    }, [currentUser]);

    return { loading, error, todos, setTodos };
}
