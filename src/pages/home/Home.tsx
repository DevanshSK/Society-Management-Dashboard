import useAuthStore from "../../store/useAuthStore";

const Home = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <div className="min-h-screen p-4 pt-[77px] bg-neutral-100">
            <h1>Dashboard Home</h1>
            <h1 className="mb-3">User Login Test: {isAuthenticated ? "Logged IN" : "Logged Out"}</h1>
        </div>
    )
}

export default Home