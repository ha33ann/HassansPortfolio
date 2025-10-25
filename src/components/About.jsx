import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
      </motion.div>
      <motion.div
  variants={fadeIn("", "", 0.1, 1)}
  className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
>
  <h3 className="text-white text-[24px] font-bold">Passionate Java Developer | Building Full-Stack Solutions</h3>
  
  <p className="mt-4">
    Hello! I'm a passionate and ambitious Java Developer, a recent graduate from Grit Academy in Malmö, now seeking my next challenge as a system developer. I thrive in full-stack environments where I can leverage my skills in Java Spring Boot, React JS, and modern database technologies to create robust and user-friendly applications.
  </p>
  
  <p className="mt-4">
    My journey through a comprehensive Higher Vocational Education program has equipped me with a versatile skill set, from advanced backend development to dynamic frontend creation. I am driven by a love for clean code, agile methodologies, and collaborative problem-solving.
  </p>

  <h3 className="text-white text-[24px] font-bold mt-6">My Core Competencies:</h3>
  <ul className="mt-4 list-disc ml-5 space-y-2">
    <li><strong>Backend:</strong> Advanced Java development with <strong>Spring Boot</strong>.</li>
    <li><strong>Frontend:</strong> Strong proficiency in JavaScript, specializing in <strong>React JS</strong> (with experience in Vue JS).</li>
    <li><strong>Databases:</strong> Skilled in designing and managing <strong>MySQL</strong> and <strong>PostgreSQL</strong> databases.</li>
    <li><strong>DevOps & Containers:</strong> Proficient in containerization using <strong>Docker</strong>.</li>
    <li><strong>Mobile Development:</strong> Experience with native <strong>Android</strong> development and foundational knowledge of <strong>Flutter</strong> and <strong>React Native</strong>.</li>
  </ul>

  <h3 className="text-white text-[24px] font-bold mt-6">Hands-On Experience:</h3>
  <p className="mt-4">
    During my internships, I translated academic knowledge into real-world results. At <strong>Skolon AB</strong>, I independently and collaboratively developed widgets and took ownership of website testing to ensure flawless functionality. At <strong>Limitlessinteractions</strong>, I was part of a team that built a mobile application using Flutter. Both experiences solidified my skills in agile workflows, project management, and Test-Driven Development (TDD).
  </p>

  <p className="mt-4">
    I am eager to bring my motivation and technical skills to a forward-thinking team. If you're looking for a dedicated developer ready to make a valuable contribution, let's connect!
  </p>
</motion.div>
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
