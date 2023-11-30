import { Link } from "react-router-dom";
import logo from '../../../assets/logo/logo.png'
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { IoNotifications } from "react-icons/io5";
import useSingleCart from "../../../Hooks/useSingleCart";


const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const [cart] = useSingleCart();

    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const navLinks =
        <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/meals'>Meals</Link></li>
            <li><Link to=''>Upcoming Meals</Link></li>
            <li><Link>
                <IoNotifications size={20} color="blue" /> <span className="badge badge-primary badge-outline">+0{cart.length} </span>
            </Link></li>
        </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-28">
                        {navLinks}
                    </ul>
                </div>
                {/* <a className="btn btn-ghost text-xl">daisyUI</a> link with logo */}
                <Link to="/">
                    <img src={logo} alt="logo" width="50" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {/* Join us button conditional..if user logout */}
                {
                    user ?
                        <>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-28">
                                    <li className="text-center">{user?.displayName}</li>
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                    <li onClick={handleLogout}><Link to='/'>Logout</Link></li>
                                </ul>
                            </div>
                        </>
                        :
                        <>

                            <Link to='/login' className="font-bold bg-sky-400 px-5 py-2 rounded-lg">Join Us</Link>
                        </>
                }

            </div>
        </div>
    );
};

export default Navbar;