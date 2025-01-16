import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OurPackages from '../components/OurPackages';

const TourismAndTravelGuide = () => {

    return (
        <section className="max-w-8xl mx-auto px-5">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-charcoal text-center">Tourism and Travel Guide</h1>
                <div className='w-32 h-[2px] bg-teal mx-auto'></div>
            </div>
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