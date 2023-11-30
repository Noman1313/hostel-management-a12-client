import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`

const AddMeals = () => {
    const { register, handleSubmit, reset} = useForm()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxios()
    const onSubmit = async (data) => {
        const imgFile = { image: data.image[0] }
        const res = await axiosPublic.post(imgHostingApi, imgFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const cartItem = {
                title: data.title,
                category: data.category,
                description: data.description,
                price: parseInt(data.price),
                rating: parseInt(data.rating),
                image: res.data.data.display_url,
                button: 'Order Now'
            }
            const cart = await axiosSecure.post('/carts', cartItem)
            if (cart.data.insertedId) {
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully added to the cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
    return (
        <div>
            <h2 className="text-2xl font-semibold text-center">ADD MEALS</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full my-5">
                    <label className="label">
                        <span className="label-text">Meal Title</span>
                    </label>
                    <input {...register("title", { required: true })} type="text" placeholder="Title" className="input input-bordered w-full" />
                </div>
                <div className="flex gap-4">
                    {/* category */}
                    <div className="form-control w-full my-5">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select defaultValue="default" {...register("category", { required: true })} className="select select-bordered w-full">
                            <option disabled value="default">Catagory</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                        </select>
                    </div>

                    {/* img url */}
                    <div className="form-control w-full my-5">
                        <label className="label">
                            <span className="label-text">ImageURL</span>
                        </label>
                        <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full" />
                    </div>
                </div>
                {/* Description */}
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>
                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                </label>
                <div className="flex gap-4">
                    {/* price */}
                    <div className="form-control w-full my-5">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input {...register("price", { required: true })} type="number" placeholder="Price" className="input input-bordered w-full" />
                    </div>
                    {/* rating */}
                    <div className="form-control w-full my-5">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <input {...register("rating", { required: true })} type="number" placeholder="Rating" className="input input-bordered w-full" />
                    </div>
                </div>
                <button className="btn btn-info">Add Item</button>
            </form>
        </div>
    );
};

export default AddMeals;