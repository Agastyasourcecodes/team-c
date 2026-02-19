import React, { useState, useEffect, useRef } from 'react';
import './CardSwap.css';

export const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default function CardSwap({
  children,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const cards = React.Children.toArray(children);
  const cardCount = cards.length;

  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setTimeout(() => {
        if (!isPaused) {
          setActiveIndex((prev) => (prev + 1) % cardCount);
        }
      }, delay);
    };

    startTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, delay, isPaused, cardCount]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setIsPaused(false);
  };

  return (
    <div
      className="card-swap-container"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cards-wrapper">
        {cards.map((card, index) => {
          const offset = (index - activeIndex + cardCount) % cardCount;
          const isActive = offset === 0;
          const isNext = offset === 1;
          const isPrev = offset === cardCount - 1;

          let translateX = 0;
          let translateY = 0;
          let opacity = 0;
          let zIndex = 0;

          if (isActive) {
            translateX = 0;
            translateY = 0;
            opacity = 1;
            zIndex = 30;
          } else if (isNext) {
            translateX = cardDistance;
            translateY = verticalDistance;
            opacity = 0.6;
            zIndex = 20;
          } else if (isPrev) {
            translateX = -cardDistance;
            translateY = verticalDistance;
            opacity = 0.6;
            zIndex = 20;
          } else {
            translateX = 0;
            translateY = verticalDistance * 2;
            opacity = 0.3;
            zIndex = 10;
          }

          const handleCardClick = () => {
            setActiveIndex(index);
            setIsPaused(false);
          };

          return (
            <div
              key={index}
              className={`card-item ${isActive ? 'active' : ''}`}
              onClick={handleCardClick}
              style={{
                transform: `translateX(${translateX}px) translateY(${translateY}px)`,
                opacity,
                zIndex,
                transition: 'all 0.8s ease-in-out',
                cursor: 'pointer'
              }}
            >
              {card}
            </div>
          );
        })}
      </div>

      {cardCount > 1 && (
        <div className="card-dots">
          {cards.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
