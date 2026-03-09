import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"

const Sidebar = ({sidebarOpen,setSidebarOpen}) => {
    const navigate=useNavigate();
  return (
    <section className={`bg-pink-50 w-60 xl:w-72 border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${sidebarOpen?'translate-x-0':'max-sm:translate-x-full'} transition-all duration-300 ease-in-out`}>
        <div>
            <img src={assets.Logo} alt="" className="w-26 ml-7 my-2" onClick={()=>navigate('/')} />
            <hr className="border-gray-300 mb-8"/>
            
        </div>
    </section>
  )
}

export default Sidebar
