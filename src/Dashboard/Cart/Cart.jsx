import Swal from "sweetalert2";
import useSingleCart from "../../Hooks/useSingleCart";
import { FaTrashAlt } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, refetch] = useSingleCart()
    const axiosSecure = useAxios()
    const price = cart.reduce((total, item) => total + item.price, 0)

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/addtocart/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
            <div className="flex justify-around">
                <h2 className="text-4xl">Items : {cart.length}</h2>
                <h2 className="text-4xl">Total Price : {price}</h2>
                {
                    cart.length ? <Link to='/dashboard/payment'>
                        <button className="btn btn-outline btn-info">pay</button>
                    </Link>
                        :
                        <button disabled className="btn btn-outline btn-info">pay</button>
                }
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Meals</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) =>
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-ghost"><FaTrashAlt></FaTrashAlt> </button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;