import Loader from "../../Components/Loader";
import useSingleCart from "../../Hooks/useSingleCart";


const UserHome = () => {
    const [cart] = useSingleCart()
    console.log(cart);
    return (
        <div>
            <Loader></Loader>
        </div>
    );
};

export default UserHome;