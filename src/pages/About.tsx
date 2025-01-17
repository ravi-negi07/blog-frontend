import React from "react";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { FaRegLightbulb } from "react-icons/fa";
import TechImage from "../assets/tech.jpg";
import { Link } from "react-router-dom";
const About: React.FC = () => {
  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.theme === "dark"
  );

  return (
    <div
      className={`bg-slate-200 h-[100%] ${
        isDarkTheme ? "bg-slate-800" : "bg-slate-200"
      }`}
    >
      <Card
        className={`py-10 px-6 mx-auto w-full md:w-3/4 pt-14 mt-10 rounded-lg shadow-lg transition-all duration-300  ${
          isDarkTheme ? "bg-slate-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="relative mb-8 w-full">
          <img
            src={TechImage}
            alt="tech image"
            className="rounded-lg object-cover w-full h-[300px] md:h-[400px]"
          />
        </div>

        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">
          About Us
        </h1>
        <div className="text-lg leading-relaxed">
          <p className="mb-6">
            Welcome to
            <Link
              to="/dashboard"
              className="font-semibold text-blue-600 hover:text-blue-300"
            >
              Synergy Blogs
            </Link>
            ! We are a community of passionate writers and readers who share the
            latest trends, tips, and insights on various topics. Whether you're
            looking for blog posts on tech, lifestyle, or just fun reads, you've
            come to the right place.
          </p>

          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-indigo-500 mb-3">
              <FaRegLightbulb className="inline-block mr-2 text-yellow-500" />
              Our Mission
            </h2>
            <p>
              Our mission is to provide a platform where insightful and helpful
              blog posts are shared with the world. We aim to inspire, educate,
              and entertain our readers with valuable content, no matter where
              they are in their life journey.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-indigo-500 mb-3">
              <FaRegLightbulb className="inline-block mr-2 text-yellow-500" />{" "}
              What We Do
            </h2>
            <p>
              We cover a broad spectrum of topics and bring fresh perspectives
              to familiar issues. From lifestyle hacks to in-depth tech reviews,
              our goal is to make learning enjoyable and accessible.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default About;
