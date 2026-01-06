import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { Button } from "@heroui/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserProfile() {
  const { userData } = useContext(authContext)

  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('You follow this account successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }, 2000);
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start space-x-4">
            <img
              src={userData.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-gray-600">{userData.email}</p>
              <p className="mt-2 text-gray-700">{userData.dateOfBirth}</p>
              
              <button 
                onClick={handleFollow}
                disabled={isLoading}
                className="mt-4 px-6 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                  </span>
                ) : (
                  'Follow'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}