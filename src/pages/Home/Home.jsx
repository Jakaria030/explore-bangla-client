import Banner from "./Banner";
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
            <TouristStory></TouristStory>
            <Statistic></Statistic>
            <NewsLetter></NewsLetter>
        </section>
    );
};

export default Home;