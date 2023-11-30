import { Helmet } from "react-helmet-async";
import useCart from "../../Hooks/useCart";
import Title from "../../Components/Title";
import FoodCart from "../Home/FoodCart/FoodCart";


const Meals = () => {
    const [cart] = useCart();
    const breakfast = cart.filter(item => item.category === 'breakfast')
    const lunch = cart.filter(item => item.category === 'lunch')
    const dinner = cart.filter(item => item.category === 'dinner')
    return (
        <div>
            <Helmet>
                <title>Hostel Management || Meals</title>
            </Helmet>
            <Title
                heading={'Breakfast'}
                subHeading={'6:30 am to 11:30 am'}
            ></Title>
            <FoodCart cart={breakfast} ></FoodCart>
            <Title
                heading={'Lunch'}
                subHeading={'12:00 am to 5:30 pm'}
            ></Title>
            <FoodCart cart={lunch} ></FoodCart>
            <Title
                heading={'Dinner'}
                subHeading={'7:30 am to 12:30 pm'}
            ></Title>
            <FoodCart cart={dinner} ></FoodCart>

        </div>
    );
};

export default Meals;