import { useState } from "react";
import axios from "axios";

// Define the structure of the result returned by the custom hook
interface UseAxiosResult<T> {
  data: T | null; // The response data, or null if no data is fetched yet
  loading: boolean; // A flag to indicate loading state
  error: string | null; // A string to store any error message
  fetchData: (url: string) => Promise<void>; // Function to fetch data
  postData: (url: string, payload: any) => Promise<void>; // Function to send POST request
  updateData: (url: string, payload: any) => Promise<void>; // Function to send PUT request
  deleteData: (url: string) => Promise<void>; // Function to send DELETE request
}

// Define the custom hook
const useAxios = <T = any,>(): UseAxiosResult<T> => {
  const [data, setData] = useState<T | null>(null); // State to store the fetched data
  const [loading, setLoading] = useState<boolean>(false); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to store error message

  // Helper function to handle API requests
  const handleRequest = async (requestFn: () => Promise<any>) => {
    setLoading(true); // Set loading state to true before API call
    setError(null);
    try {
      const response = await requestFn();
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (url: string) => {
    await handleRequest(() => axios.get(url));
  };

  const postData = async (url: string, payload: any) => {
    const handleRequest = async (request: () => Promise<any>) => {
      try {
        const response = await request();
        return response; // Return the response
      } catch (error) {
        console.error("Request failed", error);
        throw error; // Throw the error so it can be caught in `onSubmitSignup`
      }
    };
  };

  const updateData = async (url: string, payload: any) => {
    await handleRequest(() => axios.put(url, payload));
  };

  const deleteData = async (url: string) => {
    await handleRequest(() => axios.delete(url));
  };

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
    updateData,
    deleteData,
  };
};

export default useAxios;
