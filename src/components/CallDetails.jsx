import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { useState, useEffect } from "react";
const BASE_URL = "https://cerulean-marlin-wig.cyclic.app/";
import { missed, message, video, outgoing, archive, contact, callnow, outgreen } from "../assets";


export const CallStructure = {
    transcript: ' ',
    updated_at: ' ',
}


const CallDetails = () =>{

    let {id} = useParams()
    const [call, setCall] = useState(CallStructure);
    const [isLoading, setIsLoading] = useState(true);


    const archiveCall = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`${BASE_URL}/activities/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              is_archived: true,
            }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          // Update state or perform any actions needed after archiving the call
        } catch (error) {
          console.error("Error updating call to archived:", error);
        } finally {
          setIsLoading(false);
        }
      };
      


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
      
    
      
    useEffect(() => {
        fetchCall();
      }, []);

    
    if (isLoading) {
        return <Loading/>; 
    }

    return(
        <div className="w-full h-screen bg-gray-100 border-b items-center ">
        <div className="md:max-w-[800px] max-w-[400px] p-5 m-auto w-full h-full flex flex-col items-center md:px-0 px-4 ">
        <img src={contact} className="w-20 h-20"/>
        <p className="text-center font-semibold text-gray-500 text-md mb-10">Caller {call.from}</p>
        <div className="flex flex-row justify-between gap-10">
            <div className="flex flex-col items-center">
            <img src={message} className="w-10"/>
            <p className="text-xs font-semibold text-blue-300 text-center">Message</p>
            </div>
            <div className="flex flex-col items-center">
            <img src={callnow} className="w-10 p-0.5"/>
            <p className="text-xs font-semibold text-green-500 text-center">Call</p>
            </div>
            <div className="flex flex-col items-center">
            <img src={video} className="w-10"/>
            <p className="text-xs font-semibold text-red-300 text-center">Video call</p>
            </div>
        </div>
        <div className="border-b p-5 font-semibold text-gray-600">
            tried to call on Xavier
        </div>
        <div className="flex flex-row justify-between gap-20 border-b p-5 mb-10">
            <div className="flex flex-row justify-between gap-5">
            <img src={outgreen} className="w-5"/>
            <p className="text-gray-400 font-semibold text-sm">
            {call.direction === 'outbound' ? 'Outgoing' : 
                call.direction === 'inbound' ? 'Incoming' : 
                call.call_type === 'voicemail' ? 'Voicemail' : 
                'Unknown'}
            </p>
            </div>
            <div className="flex flex-row justify-between gap-2">
            <p className="text-gray-400 font-thin text-sm"> {formatDate(call.created_at)}</p>
            <p className="text-gray-400 font-thin text-sm"> {formatTime(call.created_at)}</p>
            </div>
        </div>
        { !call.is_archived ? 
        <div className="flex flex-col items-center cursor-pointer focus:outline-none focus:ring focus:border-green-300">
        <img src={archive} alt="Archive" className="w-5 mb-1" />
        <p className="text-xs font-semibold text-green-600 text-center rounded-full px-4 py-1 bg-green-50 hover:text-green-700 hover:font-bold active:text-green-800">
            Archive Now
        </p>
        </div> : null}
        
      </div>
      </div>
    )
}

export default CallDetails;