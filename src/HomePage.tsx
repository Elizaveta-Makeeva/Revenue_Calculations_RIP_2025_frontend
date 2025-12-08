import React, { useState } from 'react';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0); 
  const carouselItems = [
    {
      id: 1,
      title: "Метод скользящей средней",
      description: "Точное прогнозирование выручки на основе исторических данных",
      image: "/RIP_2025_frontend/slider1.webp"
    },
    {
      id: 2,
      title: "Анализ периодов",
      description: "Выберите оптимальный период для анализа и прогнозирования",
      image: "/RIP_2025_frontend/slider2.webp"
    },
    {
      id: 3,
      title: "Быстрый результат",
      description: "Мгновенный расчет прогноза выручки на выбранный период",
      image: "/RIP_2025_frontend/slider3.webp"
    }
  ];

  const totalSlides = carouselItems.length;

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };

  // Определяем класс для каждого слайда в зависимости от его позиции
  const getSlideClass = (index: number): string => {
    if (index === activeIndex) return 'active';
    
    const prevIndex = (activeIndex - 1 + totalSlides) % totalSlides;
    const nextIndex = (activeIndex + 1) % totalSlides;
    
    if (index === prevIndex) return 'prev';
    if (index === nextIndex) return 'next';
    
    return 'hidden';
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Прогнозирование выручки методом скользящей средней</h1>

        <div className="home-carousel-container">
          <div className="custom-carousel">
            <div className="carousel-track">
              {carouselItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={`carousel-slide-wrapper ${getSlideClass(index)}`}
                >
                  <div className="carousel-slide">
                    <div className="slide-content">
                      <h3 className="slide-title">{item.title}</h3>
                      <p className="slide-description">{item.description}</p>
                      <div className="slide-image-container">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="slide-image"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement!.innerHTML = `
                                <div class="image-placeholder">
                                  <div class="placeholder-icon">📊</div>
                                  <div class="placeholder-text">${item.title}</div>
                                </div>
                              `;
                            }}
                          />
                        ) : (
                          <div className="image-placeholder">
                            <div className="placeholder-icon">📊</div>
                            <div className="placeholder-text">{item.title}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="carousel-control carousel-control-prev" 
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button 
              className="carousel-control carousel-control-next" 
              onClick={handleNext}
              aria-label="Next slide"
            >
              ›
            </button>
            
            <div className="carousel-indicators">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => handleIndicatorClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;