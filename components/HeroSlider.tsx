'use client';

import { useState, useEffect } from 'react';
import { supabaseClient } from '@/lib/supabase-client';

const defaultSlides = [
  {
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    title: 'Modern Architecture',
    subtitle: 'Creating spaces that inspire'
  },
  {
    image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg',
    title: 'Innovative Design',
    subtitle: 'Where form meets function'
  },
  {
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
    title: 'Contemporary Living',
    subtitle: 'Redefining residential spaces'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(defaultSlides);

  useEffect(() => {
    loadHeroSlides();
  }, []);

  const loadHeroSlides = async () => {
    try {
      // Try to load from Supabase first
      if (supabaseClient) {
        const { data, error } = await supabaseClient
          .from('site_settings')
          .select('value')
          .eq('key', 'hero_slides')
          .single();
        
        if (!error && data?.value) {
          const heroSlides = JSON.parse(data.value);
          setSlides(heroSlides);
          return;
        }
      }
      
      // Fallback to API route
      const response = await fetch('/api/site-settings/hero_slides');
      if (response.ok) {
        const heroSlides = await response.json();
        setSlides(heroSlides);
      }
    } catch (error) {
      console.error('Error loading hero slides:', error);
      // Keep default slides on error
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-overlay" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="text-gold max-w-4xl px-4" style={{ color: '#FFD700' }}>
              <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wide">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl font-light tracking-wider opacity-90 text-white">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}