import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import FoodCart from "../FoodCart/FoodCart";
import useCart from "../../../Hooks/useCart";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";

const Home = () => {
    const [cart] = useCart();
    const [tabs, setTabs] = useState(0)

    const breakfast = cart.filter(item => item.category === 'breakfast')
    const lunch = cart.filter(item => item.category === 'lunch')
    const dinner = cart.filter(item => item.category === 'dinner')
    return (
        <div>
            <Helmet>
                <title>Hostel Management || Home</title>
            </Helmet>
            <Banner></Banner>
            {/* food cart  */}
            <div>
                <Tabs defaultIndex={tabs} onSelect={(index) => setTabs(index)}>
                    <TabList className="text-center my-4">
                        <Tab>All</Tab>
                        <Tab>Breakfast</Tab>
                        <Tab>Lunch</Tab>
                        <Tab>Dinner</Tab>
                    </TabList>
                    <TabPanel>
                        <FoodCart cart={cart}></FoodCart>
                    </TabPanel>
                    <TabPanel>
                        <FoodCart cart={breakfast}></FoodCart>
                    </TabPanel>
                    <TabPanel>
                        <FoodCart cart={lunch}></FoodCart>
                    </TabPanel>
                    <TabPanel>
                        <FoodCart cart={dinner}></FoodCart>
                    </TabPanel>
                </Tabs>
            </div>

        </div>
    );
};

export default Home;