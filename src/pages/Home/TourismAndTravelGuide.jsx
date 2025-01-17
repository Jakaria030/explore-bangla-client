import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OurPackages from '../components/OurPackages';
import SectionTitle from '../components/SectionTitle';
import MeetOurTourGuides from '../components/MeetOurTourGuides';

const TourismAndTravelGuide = () => {

    return (
        <section className="max-w-8xl mx-auto px-5">
            <SectionTitle title={"Tourism and Travel Guide"}></SectionTitle>

            <Tabs>
                <TabList>
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Our Tour Guides</Tab>
                </TabList>

                <TabPanel>
                    <OurPackages></OurPackages>
                </TabPanel>
                <TabPanel>
                    <MeetOurTourGuides></MeetOurTourGuides>
                </TabPanel>
            </Tabs>
        </section>
    );
};

export default TourismAndTravelGuide;