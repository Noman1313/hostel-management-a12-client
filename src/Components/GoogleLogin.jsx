import { FcGoogle } from "react-icons/fc";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const GoogleLogin = () => {
    const { googleSignIn } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();

    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then(result=>{
            const userInfo={
                email: result.user?.email,
                name: result.user?.displayName,
            }
            axiosPublic.post('/users', userInfo)
            .then(()=>{
                navigate('/');
            })
        })
    }
    return (
        <div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
            <FcGoogle size={32} />

            <p>Continue with Google</p>
        </div>
    );
};

export default GoogleLogin;