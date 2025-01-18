import SectionTitle from "../components/SectionTitle";
import aboutUs from "../../assets/profile-eb.jpeg";
import seaHeaven from "../../assets/sea-haven.png";
import visaCare from "../../assets/visa-care.png";
import msa from "../../assets/msa.png";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import { useState } from "react";

const About = () => {
    const projects = [
        { id: 1, name: "Sea Haven", image: seaHeaven, description: "Sea Haven is a web-based hotel booking platform designed to provide users with an effortless way to find and book their dream stay near the sea. The platform showcases a curated list of seaside hotels, offers detailed room information, and enables smooth online bookings. This project demonstrates innovative solutions for managing hotel reservations with a focus on user experience.", frontEnd: "HTML, CSS, Tailwind CSS, React", backEnd: "ExpressJs, NodeJs", database: "MongoDB", authentication: "Firebase", challenges: "Some challenges in building the Sea Haven website include optimizing the design for showcasing ocean-view hotels and implementing real-time room availability and booking features seamlessly.", liveLink: "https://sea-haven-7a097.web.app/" },
        { id: 2, name: "MSA School", image: msa, description: "MSA School is an educational platform designed to facilitate learning and provide easy access to resources for students. The platform offers a user-friendly interface where students can manage their profiles, view courses, track progress, and engage with educational content effectively.", frontEnd: "HTML, CSS, Tailwind CSS", backEnd: "N/A", database: "N/A", authentication: "N/A", challenges: "Some difficulties faced while using the GSAP animation library include managing complex timelines for smooth animations and ensuring compatibility across different browsers and devices.", liveLink: "https://msa-school.netlify.app/" },
        { id: 3, name: "Visa Care", image: visaCare, description: "Visa Care is a web-based platform designed to streamline the visa application process, making it easy for users to check visa requirements and add visa details. This system offers a user-friendly interface to simplify complex visa procedures. The project demonstrates practical solutions for managing visa-related information efficiently.", frontEnd: "HTML, CSS, Tailwind CSS, React", backEnd: "ExpressJs, NodeJs", database: "MongoDB", authentication: "Firebase", challenges: "Some challenges faced while building the Visa Care website include implementing a seamless user experience for form submissions and managing dynamic data, and displaying visa application statuses in real time.", liveLink: "https://visa-care.web.app/" },
    ];

    const [project , setProject] = useState({});

    const handleModal = (id) => {
        const project = projects.filter(project => project.id === id);
        setProject(project[0])
        document.getElementById("projects_details_modal").showModal();
    };

    return (
        <section className="max-w-8xl mx-auto px-5 mb-8 md:mb-16">
            {/* about me section */}
            <div className="my-8">
                <SectionTitle title={"About Me"}></SectionTitle>
            </div>
            <div className="flex flex-col lg:flex-row gap-10 md:gap-20 items-center pb-8">
                <div className="basis-1/4 shrink-0">
                    <img className="w-72 md:w-80 rounded-md border-4 border-dark shadow-lg" src={aboutUs} />
                </div>
                <div className="basis-3/4 mx-auto space-y-2">
                    <h2 className="text-2xl font-bold">Aspiring Tech Enthusiast and Problem Solver.</h2>
                    <p className="text-justify font-poppins">Hi, I'm Gulam Jakaria, an Honours final-year Computer Science and Engineering student. My programming journey began after enrolling in the CSE program. During my studies, I developed a passion for competitive programming, achieving the 'Pupil' rank on Codeforces and a 3-star rating on CodeChef. I have solved over 1,500 problems across various online judges, enhancing my problem-solving skills. In my leisure time, I enjoy playing chess, a game that sharpens my strategic thinking and complements my analytical abilities in programming.</p>
                </div>
            </div>

            {/* project section */}
            <div className="my-8">
                <SectionTitle title={"My Projects"}></SectionTitle>
            </div>
            <section className="bg-dark">
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            projects.map(project => <ProjectCard
                                key={project.id}
                                project={project}
                                handleModal={handleModal}
                            ></ProjectCard>)
                        }
                    </div>

                    {/* Modal */}
                    <dialog id="projects_details_modal" className="modal">
                        <div className="modal-box text-dark rounded-md">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle bg-orange text-white absolute right-2 top-2">✕</button>
                            </form>
                            <div className="pt-5 space-y-2">
                                <figure>
                                    <img src={project?.image} />
                                </figure>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-medium">Name:{project?.name}</h2>
                                    <h2><span className="text-xl font-medium">Description: </span><span className="font-poppins">{project?.description}</span></h2>
                                    <h2 className="text-xl font-medium">Technology Used:</h2>
                                    <ul>
                                        <li className="font-poppins"><span className="font-medium">Frontend: </span> <span>{project?.frontEnd}</span></li>
                                        <li className="font-poppins"><span className="font-medium">Backend: </span> <span>{project?.backEnd}</span></li>
                                        <li className="font-poppins"><span className="font-medium">Database: </span> <span>{project?.database}</span></li>
                                        <li className="font-poppins"><span className="font-medium">Authentication: </span> <span>{project?.authentication}</span></li>
                                        <li className="font-poppins"><span className="font-medium">Challenges Faced: </span> <span>{project?.challenges}</span></li>
                                    </ul>

                                    <Link to={project?.liveLink} target="_blank" className="font-medium underline text-blue-500">Visit Site</Link>
                                </div>
                            </div>
                        </div>
                    </dialog>
                </div>
            </section>
        </section>
    );
};

export default About;