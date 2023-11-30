// import Title from "../../../Components/Title";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { Link } from "react-router-dom";
// import useCart from "../../../Hooks/useCart";


const FoodCart = ({ cart }) => {
    // console.log(cart);
    // const [cart]= useCart();

    return (
        <div>
            {/* <div className="">
                <Title
                    heading={'Order Now'}>
                </Title>
                <h3 className="text-end -mt-5 p-2">Noman</h3> category
            </div> */}
            <div className=" grid lg:grid-cols-3 lg:gap-10 md:grid-cols-2 gap-5">
                {
                    cart.map(item =>
                        <div
                            key={item._id}
                            className="card bg-base-100 shadow-xl">
                            <figure><img src={item.image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.title}</h2>
                                <p>{item.description} </p>
                                <div className="flex justify-between">
                                    <h2>Price : $ {item.price}</h2>
                                    <h2><Rating
                                        style={{ maxWidth: 180 }}
                                        value={item.rating}
                                        readOnly
                                    /></h2>
                                </div>
                                <div className="card-actions justify-end">
                                    <Link
                                        to={`/order/${item._id}`}
                                        // items={cart}
                                        className="btn btn-primary">{item.button}</Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FoodCart;