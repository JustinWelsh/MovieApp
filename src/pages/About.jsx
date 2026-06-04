import React from "react";
import { motion } from "framer-motion";
import { SiReact, SiFramer, SiTailwindcss } from "react-icons/si";
import { TbRoute } from "react-icons/tb";
import { MdOutlineMovieFilter } from "react-icons/md";

const techStack = [
  { icon: <SiReact size={22} color="#61dafb" />, label: "React 18" },
  { icon: <TbRoute size={22} color="#f43f5e" />, label: "React Router v6" },
  { icon: <SiFramer size={22} color="#ffffff" />, label: "Framer Motion" },
  { icon: <SiTailwindcss size={22} color="#38bdf8" />, label: "Tailwind CSS" },
  { icon: <MdOutlineMovieFilter size={22} color="#01d277" />, label: "TMDB API" },
];

const features = [
  "Browse popular and trending movies updated daily",
  "Search any movie by title with live results",
  "Watch official trailers directly in-app via YouTube",
  "Save movies to a personal watchlist",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

const sectionProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

const About = () => {
  return (
    <div className="min-h-screen p-8 max-w-3xl">
      <motion.div {...sectionProps}>
        <h1 className="text-5xl font-bold mb-3">About</h1>
        <p className="text-slate-400 text-lg leading-relaxed mb-12">
          A personal project for browsing movies, discovering what's trending,
          and keeping track of what to watch next. Built with a modern React
          stack and powered by the <strong>TMDB API</strong>.
        </p>
      </motion.div>

      <motion.div
        {...sectionProps}
        transition={{ ...sectionProps.transition, delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-xl font-bold mb-5">Features</h2>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <motion.li
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex items-start gap-3 text-slate-300"
            >
              <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-rose-600 flex-shrink-0" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        {...sectionProps}
        transition={{ ...sectionProps.transition, delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-xl font-bold mb-5">Built With</h2>
        <div className="flex flex-wrap gap-3">
          {techStack.map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-300"
            >
              {icon}
              {label}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        {...sectionProps}
        transition={{ ...sectionProps.transition, delay: 0.1 }}
        className="flex items-center gap-4 border-t border-white/10 pt-8"
      >
        <img src="/TMDB.svg" alt="TMDB Logo" className="h-6 opacity-80" />
        <p className="text-slate-500 text-sm">
          Movie data provided by{" "}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 underline hover:text-white transition-colors"
          >
            The Movie Database (TMDB)
          </a>
          . This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
