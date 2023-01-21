import { useAuth } from '../context/AuthContext';

export default function Header() {
    const { logout } = useAuth();
    return (
        <>
            <div className="sticky top-0 w-full left-0 bg-inherit flex items-center justify-between p-4 border-b border-solid border-white">
                <h1 className="text-2xl select-none sm:text-1xl">TODO LIST</h1>
                <button
                    className="btn border-b py-2 border=solid border-white px-8 bg-cyan-500  hover:bg-purple-500"
                    onClick={() => {
                        logout();
                    }}
                >
                    Logout
                </button>
            </div>
        </>
    );
}
