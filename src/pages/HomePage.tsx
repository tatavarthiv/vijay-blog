import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [typedText, setTypedText] = useState("");
  const [showGlassBox, setShowGlassBox] = useState(false);
  const fullText = "Hello! Meet Vijay.";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Small delay before showing glass box
        setTimeout(() => {
          setShowGlassBox(true);
        }, 300);
      }
    }, 100); // Typing speed

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="home-page">
      {/* Main Title with Typing Effect */}
      <div className="hero-section">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {typedText}
          <span className="typing-cursor"></span>
        </motion.h1>
      </div>

      {/* Glass Box sliding up from bottom */}
      <motion.div
        className="glass-info-box"
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: showGlassBox ? 0 : 100,
          opacity: showGlassBox ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8,
        }}
      >
        <div className="glass-content">
          <h2 className="glass-title">Full Stack Developer</h2>
          <p className="glass-description">
            Crafting digital experiences with modern technologies. Passionate
            about clean code, innovative solutions, and bringing ideas to life.
          </p>
          <div className="glass-actions">
            <Link to="/projects" className="primary-button">
              <span>View My Work</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="secondary-button">
              About Me
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
