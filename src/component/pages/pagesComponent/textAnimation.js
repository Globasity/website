import React, { useState, useEffect } from 'react';
import './TextAnimation.css'; // Import CSS for animation (you can define your own animation styles)

const TextAnimation = ({ textArray, duration }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState(textArray[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, duration);

    return () => clearInterval(interval);
  }, [currentIndex, duration, textArray.length]);

  useEffect(() => {
    const textElement = document.getElementById('textAnimation');

    if (textElement) {
      textElement.classList.add('fade-out'); // Add fade-out animation
      setTimeout(() => {
        setCurrentText(textArray[currentIndex]);
        textElement.classList.remove('fade-out');
      }, 500); // Adjust this value to match your CSS animation duration
    }
  }, [currentIndex, textArray]);

  return (
    <div className="text-animation-container">
      <div id="textAnimation" className="text-animation">
        {currentText}
      </div>
    </div>
  );
};

export default TextAnimation;
