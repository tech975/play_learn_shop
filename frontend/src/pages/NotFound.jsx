import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/login"); 
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Oops! Page Not Found</p>
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-[#00df9a] text-black font-semibold rounded-lg shadow-md hover:bg-[#00b87d] transition duration-300"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PageNotFound;
