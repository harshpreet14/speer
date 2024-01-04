import { dialpad, settings, contactblue, recording } from "../assets"

const Footer = () =>{
    return(
      <footer className=" fixed bottom-0 w-full h-[75px] bg-gray-100 border-t">
      <div className="md:max-w-[800px] max-w-[400px] m-auto w-full h-full flex justify-between items-center md:px-0 px-4">
        <img src={contactblue} className="w-8 hover:w-10"/>
        <img src={dialpad} className="w-8 hover:w-10"/>
        <img src={settings} className="w-8 hover:w-10"/>
        <img src={recording} className="w-8 hover:w-10"/>
      </div>
     </footer>    
    )
}

export default Footer