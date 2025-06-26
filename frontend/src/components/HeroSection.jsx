import React, { useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const cards = [
    {
      title: "Jobs",
      description: "Launch your career with real-world experience",
      link: "/jobs",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
        </svg>
      )
    },
    {
      title: "DSA Practice",
      description: "Master algorithms with daily challenges",
      link: "https://leetcode.com/problemset/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h18v18H3V3zm4.73 15.04c.39.39 1.04.39 1.43 0l4.48-4.48a1.01 1.01 0 0 0 0-1.43l-4.48-4.48a1.01 1.01 0 0 0-1.43 0 1.01 1.01 0 0 0 0 1.43l3.89 3.89-3.89 3.89c-.39.4-.39 1.04 0 1.43zM17 15.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z"/>
        </svg>
      )
    },
    {
      title: "Interview Prep",
      description: "Ace your technical interviews",
      link: "https://grow.google/certificates/interview-warmup/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
      )
    },
    {
      title: "Courses",
      description: "Upskill with industry-relevant content",
      link: "https://www.udemy.com/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
        </svg>
      )
    }
  ];

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12"
      style={{ backgroundColor: "#EEF5FF" }}
    >
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#050C9C] to-[#176B87]">
          Transform Your Career Path
        </h1>
        <p className="text-xl md:text-2xl text-[#050C9C] font-medium">
          Find Talent, Get Hired!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {cards.map((card, index) => (
          <div 
            key={index}
            className={`relative p-8 rounded-2xl transition-all duration-300 ${
              hoveredCard === index 
                ? "transform scale-105 shadow-2xl bg-[#97DEFF]" 
                : "shadow-xl bg-[#C9EEFF]"
            }`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="mb-6 text-[#050C9C]">
              {card.icon}
            </div>
            <h3 className="text-2xl font-bold text-[#050C9C] mb-4">
              {card.title}
            </h3>
            <p className="text-[#176B87] mb-6">
              {card.description}
            </p>
            {card.link.startsWith("http") ? (
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-full font-medium transition-colors"
                style={{
                  backgroundColor: "#176B87",
                  color: "#C9EEFF",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#050C9C";
                  e.target.style.color = "#97DEFF";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#176B87";
                  e.target.style.color = "#C9EEFF";
                }}
              >
                Get Started →
              </a>
            ) : (
              <Link
                to={card.link}
                className="inline-block px-6 py-3 rounded-full font-medium transition-colors"
                style={{
                  backgroundColor: "#176B87",
                  color: "#C9EEFF",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#050C9C";
                  e.target.style.color = "#97DEFF";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#176B87";
                  e.target.style.color = "#C9EEFF";
                }}
              >
                Explore →
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="flex space-x-6">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              hoveredCard === index ? "bg-[#050C9C]" : "bg-[#97DEFF]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;