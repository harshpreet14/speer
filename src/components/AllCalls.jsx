import axios from 'axios';
import dotenv from 'dotenv';
import { useState, useEffect } from 'react';
import {missed, answered, voice, outgoing} from '../assets';
import Loading from './Loading';
const BASE_URL = "https://cerulean-marlin-wig.cyclic.app/";
import { Link } from 'react-router-dom';

const AllCalls = () =>{
    const [calls, setCalls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCalls = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/activities`); 
            const data = await response.json();
            console.log(data)
            setCalls(data); //API returns an array of entries
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setIsLoading(false);
    };

    // useEffect to call fetchCalls on component mount
    useEffect(() => {
        fetchCalls();
    }, []);

    if (isLoading) {
        return <Loading/>; 
    }


    return(
        <div className="w-full border-b h-full bg-slate-100 p-5">
            <div className="md:max-w-[800px] max-w-[400px] m-auto w-full h-full flex flex-col justify-between items-center md:px-0 px-4">
            {calls.filter(call => !call.is_archived).reverse().map((call) => (
                <Call key={call.id} data={call} /> // Replace Call with your actual Call component and pass necessary data
            ))}
            </div>
        </div>
    )
}



const Call = ({ data }) =>{

    const renderCallIcon = (callType) => {
        switch (callType) {
            case 'answered':
                return <img src={answered} className='w-7'/>;
            case 'missed':
                return <img src={missed} className='w-7' />;
            case 'voicemail':
                return <img src={voice}  className='w-7' />;
            case 'outgoing':
                return <img src={voice}  className='w-7' />;
            default:
                return <img src={outgoing}  className='w-7' />; // Default case if none of the types match
        }
    };

    const formatDateTo12Hour = (dateString) => {
        const date = new Date(dateString);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutesStr = minutes < 10 ? '0'+minutes : minutes;
    
        return `${hours}:${minutesStr} ${ampm}`;
    };

    return(
        <Link to={`/activity/${data.id}`} >

        <div className="flex flex-col w-full items-center text-center">
             <p className="flex flex-row justify-between font-thin text-sm text-center m-1.5">
        ---{new Date(data.created_at).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        })}---
        </p>
        <div className="flex flex-row justify-between p-5 border border-gray-400 w-full h-20 rounded-xl bg-slate-100 shadow-lg  hover:bg-white">
        <div className='p-2 justify-center' >
        {renderCallIcon(data.call_type)}
        </div>

        <div className='flex flex-col w-full items-center text-center justify-center font-semibold text-sm text-gray-600'>
            <div>
                Caller {data.from}
            </div>
                
            <div>
                tried to call on {data.to}
            </div>
        </div>

        <div className='text-xs font-semibold text-gray-600'>
            <div>
                {formatDateTo12Hour(data.created_at)}
            </div>
        </div>

        </div>
       </div>
      </Link>
        
    )
}



export default AllCalls;