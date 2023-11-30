import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import useSingleCart from "../../Hooks/useSingleCart";


const Order = () => {
    const { user } = useAuth()
    const data = useLoaderData();
    const axiosSecure = useAxios()
    const [, refetch] = useSingleCart()

    const handleAddToCart = () => {
        if(user && user.email){
            const cartItem ={
                 cartId: data._id,
                 email: user.email,
                 image: data.image,
                 name: data.title,
                 price: data.price
            }
            axiosSecure.post('/addtocart', cartItem)
            .then(res=>{
                if(res.data.insertedId){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully Added To Cart",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
        }
    }

    return (
        <div className="flex justify-center my-10">
            <Helmet>
                <title>Hostel Management || Order</title>
            </Helmet>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure><img src={data.image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{data.title}</h2>
                    <p>{data.description}</p>
                    <p className="font-semibold">Price: $ {data.price}</p>
                    <div className="card-actions justify-end">
                        <button onClick={handleAddToCart} className="btn btn-primary">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;