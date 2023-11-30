import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../../assets/banner/breakfest.jpg'
import img2 from '../../../assets/banner/lunch.jpg'
import img3 from '../../../assets/banner/dinner.jpg'

const Banner = () => {
    return (
        <Carousel className="text-center">
                <div>
                    <img src={img1} />
                    <p className="legend">Breakfast</p>
                </div>
                <div>
                    <img src={img2} />
                    <p className="legend">Lunch</p>
                </div>
                <div>
                    <img src={img3} />
                    <p className="legend">Dinner</p>
                </div>
            </Carousel>
    );
};

export default Banner;