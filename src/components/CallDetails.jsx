import { contact } from "../assets"
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { useState, useEffect } from "react";
const BASE_URL = "https://cerulean-marlin-wig.cyclic.app/";


export const CallStructure = {
    transcript: ' ',
    updated_at: ' ',
}


const CallDetails = () =>{

    let {id} = useParams()
    const [call, setCall] = useState(CallStructure);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCall = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/activities/${id}`); 
            const data = await response.json();
            console.log(data)
            setCall(data); //API returns an array of entries
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCall();
      }, []);

    
    if (isLoading) {
        return <Loading/>; 
    }

    return(
        <div className="w-full h-[75px] bg-gray-100 border-b">
      <div className="md:max-w-[800px] max-w-[400px] m-auto w-full h-full flex-col justify-center text-center items-center md:px-0 px-4">
        <img src={contact} className="w-20 h-20"/>
      </div>
      </div>
    )
}

export default CallDetails;