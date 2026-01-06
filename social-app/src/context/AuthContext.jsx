import { createContext, useEffect, useState } from "react";
import { getLoggedUserData } from "../services/authServices";

export const authContext = createContext();
export default function AuthContextProvider({ children }) {
  const [token, settoken] = useState(localStorage.getItem("userToken"));
  const [userData, setuserData] = useState("")
  const [isLoading, setisLoading] = useState(false)
  
  async function getUserData() {
    try {
      const { data } = await getLoggedUserData();
      setisLoading(true)
      console.log(data);
      setuserData(data.user)
    } catch (error) {
      console.log(error);
    }finally{
      setisLoading(false)
    }
  }

  useEffect(() => {
    if(token){
      getUserData()
    }
  }, [token])
  
  return (
    <authContext.Provider value={{ token, settoken,userData,isLoading}}>
      {children}
    </authContext.Provider>
  );
}
