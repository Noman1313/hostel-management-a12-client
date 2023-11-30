import { NavLink, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { PiBowlFoodFill } from "react-icons/pi";
import { VscDiffAdded, VscPreview } from "react-icons/vsc";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { MdRateReview, MdReviews } from "react-icons/md";
import useAdmin from "../../Hooks/useAdmin";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-sky-500">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                                <li className="text-xl"><NavLink to='/dashboard/adminHome'>Admin Profile <CgProfile /> </NavLink></li>
                                <li className="text-xl"><NavLink to='/dashboard/cart'>My Request <PiBowlFoodFill /> </NavLink></li>
                                <li className="text-xl"><NavLink to='/dashboard/manageUser'>Manage Users<FaUsers /> </NavLink></li>
                                <li className="text-xl"><NavLink to='/dashboard/addMeal'>Add Meal<VscPreview /> </NavLink></li>
                                <li className="text-xl"><NavLink to='/dashboard/allMeal'>All Meal <VscPreview /> </NavLink></li>
                                <li className="text-xl"><NavLink to='/dashboard/review'>All Reviews <MdRateReview /> </NavLink></li>
                                <li className="text-xl"><NavLink to='/dashboard/serveMeals'>Serve Meals <MdReviews /> </NavLink></li>
                                <li className="text-xl"><NavLink to='/dashboard/upcomingMeals'>Upcoming Meals <VscDiffAdded /> </NavLink></li>
                            </>
                            :
                            <>
                                <li className="text-xl"><NavLink to='/dashboard/userHome'>My Profile <CgProfile /> </NavLink></li>
                                <li className="text-xl"><NavLink to='/dashboard/cart'>Meals Request <PiBowlFoodFill /> </NavLink></li>
                                <li className="text-xl"><NavLink to='/dashboard/reviews'>Reviews <VscPreview /> </NavLink></li>
                            </>
                    }
                    <div className="divider"></div>
                    <li className="text-xl"><NavLink to='/'>Home <IoHome /> </NavLink></li>
                </ul>
            </div>
            <div className="flex-1 bg-slate-100 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;