import { FaTrashAlt, FaUpload } from 'react-icons/fa';
import useCart from '../../Hooks/useCart';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';
import { Link } from 'react-router-dom';

const AllMeals = () => {
    const [cart, , refetch] = useCart()
    const axiosSecure = useAxios();


    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/carts/${item._id}`)
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }

            }
        });
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) =>
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.title}
                                    </td>
                                    <td>{item.price}</td>
                                    <td>
                                    <Link to={`/dashboard/updateItem/${item._id}`}><button className="btn btn-ghost btn-md"><FaUpload></FaUpload></button></Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-md"><FaTrashAlt></FaTrashAlt></button>
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

export default AllMeals;