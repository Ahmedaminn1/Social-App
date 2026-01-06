import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useGet(apiLink) {
  const [data, setdata] = useState("");
  async function getData(api) {
    try {
      const response = await axios.get(api);
      setdata(response)
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(() => {
    getData(apiLink)
  }, [])
  
  return data;
}
