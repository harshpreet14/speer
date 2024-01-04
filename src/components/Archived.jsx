import { useState, useEffect } from 'react';
const BASE_URL = "https://cerulean-marlin-wig.cyclic.app/";
import {missed, answered, voice, outgreen, archive} from '../assets';
import Loading from './Loading';
import { Link } from 'react-router-dom';
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

    const unarchiveAllCalls = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/reset`, {
                method: 'PATCH', // Using PATCH method as per the API specification
                headers: {
                    'Content-Type': 'application/json',
                },
                // No body is needed if the API doesn't require it for this endpoint
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            await fetchCalls(); // Fetch the updated list of calls after resetting
        } catch (error) {
            console.error("Error resetting calls to initial state:", error);
        } finally {
            setIsLoading(false);
        }
    };
    

    // useEffect to call fetchCalls on component mount
    useEffect(() => {
        fetchCalls();
    }, []);

    if (isLoading) {
        return <Loading/>; 
    }

    return(
        <div className="w-full p-5  border-b">
            <div className="md:max-w-[800px] max-w-[400px] m-auto w-full flex flex-col justify-between items-center md:px-0 px-4">
            <Link to='/inbox'>
            <div className="flex flex-col items-center cursor-pointer focus:outline-none focus:ring focus:border-green-300 mb-5">
        <p className="text-xs font-semibold text-green-600 text-center rounded-full px-4 py-1 bg-green-50 hover:text-green-700 hover:font-bold active:text-green-800" onClick={unarchiveAllCalls}>
            Unarchive All
        </p>
        </div> 
        </Link>
            {calls.filter(call => call.is_archived).reverse().map((call) => (
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