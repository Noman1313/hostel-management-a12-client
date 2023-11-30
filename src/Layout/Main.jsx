import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <div className='max-w-[1400px] mx-auto lg:px-14'>
                <Navbar></Navbar>
            </div>
            <div className='max-w-screen-xl mx-auto'>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;