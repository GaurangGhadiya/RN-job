// import { RAPID_API_KEY } from "@env";

import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = ( endpoint, query ) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": "8a1c623cacmsh4ad2bac6eef03cdp1f00a9jsne67543c6aeaa",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
    
  };


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response?.data?.data);
      setIsLoading(false);
    } catch (err) {
        console.log('error', error)
      setError(err);
      alert("Could not fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
