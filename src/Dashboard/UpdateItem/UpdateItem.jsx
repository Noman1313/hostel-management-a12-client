import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const UpdateItem = () => {
    const item = useLoaderData()
    const {title, price, category, description, _id } = item
    const { register, handleSubmit, reset } = useForm()


    const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`

    const axiosSecure = useAxios()
    const axiosPublic = useAxiosPublic()
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
            const cart = await axiosSecure.patch(`/carts/${_id}`, cartItem)
            if (cart.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully Updated to the cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <div>
            <h3 className="text-2xl font-semibold text-center">UPDATE MEALS</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full my-5">
                    <label className="label">
                        <span className="label-text">Meal Title</span>
                    </label>
                    <input {...register("title", { required: true })} defaultValue={title} type="text" placeholder="Title" className="input input-bordered w-full" />
                </div>
                <div className="flex gap-4">
                    {/* category */}
                    <div className="form-control w-full my-5">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select  {...register("category", { required: true })} defaultValue={category} className="select select-bordered w-full">
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
                    <textarea {...register("description", { required: true })} defaultValue={description}  className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                </label>
                <div className="flex gap-4">
                    {/* price */}
                    <div className="form-control w-full my-5">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input {...register("price", { required: true })} defaultValue={price} type="number" placeholder="Price" className="input input-bordered w-full" />
                    </div>
                    {/* rating */}
                    <div className="form-control w-full my-5">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <input {...register("rating", { required: true })} type="number" placeholder="Rating" className="input input-bordered w-full" />
                    </div>
                </div>
                <button className="btn btn-info">Update Meals Item</button>
            </form>
        </div>
    );
};

export default UpdateItem;