import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Meals from "../Pages/Meals/Meals";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Signup/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import Cart from "../Dashboard/Cart/Cart";
import UserHome from "../Dashboard/UserHome/UserHome";
import Manageuser from "../Dashboard/ManageUser/Manageuser";
import AddMeals from "../Dashboard/AddMeals/AddMeals";
import AdminRoute from "./AdminRoute";
import AdminHome from "../Dashboard/AdminHome/AdminHome";
import AllMeals from "../Dashboard/AllMeals/AllMeals";
import Review from "../Dashboard/Review/Review";
import UpdateItem from "../Dashboard/UpdateItem/UpdateItem";
import Payment from "../Dashboard/Payment/Payment";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'meals',
                element: <Meals></Meals>
            },
            {
                path: '/order/:id',
                element: <PrivateRoute><Order></Order></PrivateRoute>,
                loader: ({ params }) => fetch(`https://hostel-management-server-one.vercel.app/carts/${params.id}`)
            }
        ]
    },
    {
        path: 'login',
        element: <Login></Login>
    },
    {
        path: 'signup',
        element: <SignUp></SignUp>
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            //users
            {
                path: 'cart',
                element: <Cart></Cart>
            },
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'reviews',
                element: <Review></Review>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            //admin
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'manageUser',
                element: <AdminRoute><Manageuser></Manageuser></AdminRoute>
            },
            {
                path: 'addMeal',
                element: <AdminRoute><AddMeals></AddMeals></AdminRoute>
            },
            {
                path: 'allMeal',
                element: <AdminRoute><AllMeals></AllMeals></AdminRoute>
            },
            {
                path: 'updateItem/:id',
                element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader: ({params})=> fetch(`https://hostel-management-server-one.vercel.app/carts/${params.id}`)
            },
            {
                path: 'review',
                element: <AdminRoute><Review></Review></AdminRoute>
            },
            {
                path: 'serveMeals',
                element: <AdminRoute><Review></Review></AdminRoute>
            },
            {
                path: 'upcomingMeals',
                element: <AdminRoute><Review></Review></AdminRoute>
            },
        ]
    }
])