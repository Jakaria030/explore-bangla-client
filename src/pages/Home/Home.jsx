import Banner from "./Banner";
import ChooseUs from "./ChooseUs";
import NewsLetter from "./NewsLetter";
import Overview from "./Overview";
import PopularStapes from "./PopularStapes";
import Statistic from "./Statistic";
import TourismAndTravelGuide from "./TourismAndTravelGuide";
import TouristStory from "./TouristStory";

const Home = () => {
    return (
        <section className="space-y-8 md:space-y-16 mb-8 md:mb-16">
            <Banner></Banner>
            <Overview></Overview>
            <TourismAndTravelGuide></TourismAndTravelGuide>
            <PopularStapes></PopularStapes>
            <Statistic></Statistic>
            <TouristStory></TouristStory>
            <ChooseUs></ChooseUs>
            <NewsLetter></NewsLetter>
        </section>
    );
};

export default Home;