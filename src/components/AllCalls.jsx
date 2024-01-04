import axios from 'axios';
import dotenv from 'dotenv';
import { useState, useEffect } from 'react';

const BASE_URL = "https://cerulean-marlin-wig.cyclic.app/";


const AllCalls = () =>{
    const [calls, setCalls] = useState([]);

    const fetchCalls = async () => {
        try {
            const response = await fetch(`${BASE_URL}/activities`); 
            const data = await response.json();
            console.log(data)
            setCalls(data); //API returns an array of entries
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // useEffect to call fetchCalls on component mount
    useEffect(() => {
        fetchCalls();
    }, []);

    return(
        <div className="w-full h-dvh bg-gray-700 border-b">
            <div className="md:max-w-[800px] max-w-[400px] m-auto w-full h-full flex flex-col justify-between items-center md:px-0 px-4">
            {calls.filter(call => !call.is_archived).map((call) => (
                <Call key={call.id} data={call} /> // Replace Call with your actual Call component and pass necessary data
            ))}
            </div>
        </div>
    )
}



const Call = ({ data }) =>{
    return(
        <div>
        {data.direction}
        </div>
    )
}



export default AllCalls;