import { useState, useEffect } from 'react';
const BASE_URL = "https://cerulean-marlin-wig.cyclic.app/";
import {missed, answered, voice} from '../assets';
import Loading from './Loading';

const Archived = () =>{
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
        <div className="w-full p-5 h-full border-b bg-slate-100">
            <div className="md:max-w-[800px] max-w-[400px] m-auto w-full flex flex-col justify-between items-center md:px-0 px-4">
            {calls.filter(call => call.is_archived).reverse().map((call) => (
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
            default:
                return null; // Default case if none of the types match
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
    )
}



export default Archived;

/*{new Date(data.created_at).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })}*/


const Test = () => {
    return (
        <div>
            <img src={answered} alt="Answered Call" />
            <img src={missed} alt="Missed Call" />
            <img src={voice} alt="Voicemail" />
        </div>
    );
};