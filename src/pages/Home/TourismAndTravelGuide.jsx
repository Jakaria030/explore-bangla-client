import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OurPackages from '../components/OurPackages';
import SectionTitle from '../components/SectionTitle';

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
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        </section>
    );
};

export default TourismAndTravelGuide;