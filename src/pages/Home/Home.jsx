import Banner from "./Banner";
import Overview from "./Overview";
import TourismAndTravelGuide from "./TourismAndTravelGuide";
import TouristStory from "./TouristStory";

const Home = () => {
    return (
        <section className="space-y-8 md:space-y-16 mb-8 md:mb-16">
            <Banner></Banner>
            <Overview></Overview>
            <TourismAndTravelGuide></TourismAndTravelGuide>
            <TouristStory></TouristStory>
        </section>
    );
};

export default Home;