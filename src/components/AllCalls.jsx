import axios from 'axios';
import dotenv from 'dotenv';
import { useState, useEffect } from 'react';
import {missed, answered, voice, outgoing, outgreen} from '../assets';
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
        <div className="w-full border-b h-full p-5">
            <div className="md:max-w-[800px] max-w-[400px] m-auto w-full h-full flex flex-col justify-between items-center md:px-0 px-4">
            {calls.filter(call => !call.is_archived).reverse().map((call) => (
                <Call key={call.id} data={call} /> // Replace Call with your actual Call component and pass necessary data
            ))}
            </div>
        </div>
    )
}


const Call = ({ data }) =>{




    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-indexed
        const day = date.getDate().toString().padStart(2, '0');
      
        return `${year}/${month}/${day}`;
    }

    function formatTime(isoDateString) {
        const date = new Date(isoDateString);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
      
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
      
        return `${hours}:${minutes} ${ampm}`;
    }
    
    const renderCallIcon = (callType, callDirection) => {
        if (callDirection === 'outbound') {
            switch (callType) {
                case 'answered':
                    return <img src={outgreen} className='w-5'/>; // Replace 'outgreen' with the actual source
                case 'missed':
                    return <img src={missed} className='w-5' />; // Replace 'outred' with the actual source
                // Add more cases if necessary
            }
        } else if (callDirection === 'inbound') {
            switch (callType) {
                case 'answered':
                    return <img src={answered} className='w-5'/>;
                case 'missed':
                    return <img src={missed} className='w-5' />;
                case 'voicemail':
                    return <img src={voice} className='w-5' />;
                // Add more cases if necessary
            }
        }
    
        return <img src={voice} className='w-5' />; // Default case if none of the types or directions match
    };
    

    return(
        <Link to={`/activity/${data.id}`} className='w-full' >
             <div className="flex flex-row w-full justify-between border-b p-5 mb-3 hover:bg-gray-100 hover:shadow-lg  transition-duration-200 ease-in-out transform hover:-translate-y-1 cursor-pointer hover:scale-110 transition-transform">
            <div className="flex flex-row justify-between gap-2">
            {renderCallIcon(data.call_type, data.direction)}
            <p className="text-gray-400 font-semibold text-sm">
            {data.direction === 'outbound' ? 'Outgoing' : 
                data.direction === 'inbound' ? 'Incoming' : 
                data.call_type === 'voicemail' ? 'Voicemail' : 
                'Voicemail'}
            </p>
            </div>
            <div className="text-black font-light text-sm hidden md:block">
            Caller {data.from} tried to call on {data.to}
            </div>
            <div className="flex flex-row justify-between gap-2">
            <p className="text-gray-400 font-thin text-sm"> {formatDate(data.created_at)}</p>
            <p className="text-gray-400 font-thin text-sm"> {formatTime(data.created_at)}</p>
            </div>
        </div>
        </Link>
       
    )
}


export default AllCalls;