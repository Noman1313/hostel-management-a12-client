
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";



const useCart = () => {
    const axiosPublic = useAxiosPublic();

    const { data: cart = [], isPending: loading, refetch } = useQuery({
        queryKey: ['carts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/carts');
            return res.data
        }
    })

    return [cart, loading, refetch]
};

export default useCart;