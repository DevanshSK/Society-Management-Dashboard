import useAuthStore from "../../store/useAuthStore";

const Home = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <div className="bg-red-300">
            <h1>Dashboard Home</h1>
            <h1 className="mb-3">User Login Test: {isAuthenticated ? "Logged IN" : "Logged Out"}</h1>
        </div>
    )
}

export default Home