import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import laurenAvatar from '@/assets/avatar-lauren.jpg';
import edwardAvatar from '@/assets/avatar-edward.jpg';
import dianaAvatar from '@/assets/avatar-diana.jpg';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Edward Alexander",
    avatar: edwardAvatar,
    rating: 4.9,
    date: "29 Aug, 2017",
    review: "They have awesome customer service. I wouldn't recommend going to anyone else. All of you guys are awesome. Definitely love the way appscript works"
  },
  {
    id: 2,
    name: "Diana Johnston", 
    avatar: dianaAvatar,
    rating: 4.9,
    date: "29 Aug, 2017",
    review: "Overall pleasurable experience. Pay a little first and Pay a little during the development of the app as milestones are achieved, which made me feel very confident and comfortable. Seamless and Easy process."
  },
  {
    id: 3,
    name: "Lauren Contreras",
    avatar: laurenAvatar,
    rating: 4.9,
    date: "28 Aug, 2017", 
    review: "Exceptional service from start to finish. The team was professional, responsive, and delivered exactly what we needed. Would definitely work with them again on future projects."
  }
];

export const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [wheelRotation, setWheelRotation] = useState(0);

  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % testimonials.length;
        // Rotate wheel to position the active avatar at the front
        setWheelRotation(nextIndex * (360 / testimonials.length));
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const selectTestimonial = (index: number) => {
    setCurrentIndex(index);
    setWheelRotation(index * (360 / testimonials.length));
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 3000);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    selectTestimonial(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    selectTestimonial(newIndex);
  };

  const currentTestimonial = testimonials[currentIndex];

  // Calculate positions for avatars in the wheel
  const getAvatarPosition = (index: number) => {
    const angle = (index * (360 / testimonials.length)) - wheelRotation;
    const radius = 150; // Distance from center
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    return {
      x,
      y,
      angle,
      isActive: index === currentIndex,
      zIndex: index === currentIndex ? 50 : Math.round(10 + Math.cos(radian) * 10)
    };
  };

  return (
    <section className="py-16 px-4 bg-testimonial-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <h2 className="text-2xl font-bold text-foreground">Customer Reviews</h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative flex items-center min-h-[500px]">
          {/* Left Side - Avatar Wheel (Half Visible) */}
          <div className="absolute -left-48 top-1/2 -translate-y-1/2 z-10">
            <div className="relative w-80 h-80">
              {/* Wheel Background */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent"></div>
              
              {/* Avatar Wheel */}
              <div 
                className="relative w-full h-full transition-transform duration-1000 ease-out"
                style={{ 
                  transform: `rotate(${-wheelRotation}deg)` 
                }}
              >
                {testimonials.map((testimonial, index) => {
                  const position = getAvatarPosition(index);
                  const isVisible = position.x > -100; // Only show avatars that are somewhat visible
                  
                  return (
                    <button
                      key={testimonial.id}
                      onClick={() => selectTestimonial(index)}
                      className={`absolute transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100' : 'opacity-30'
                      }`}
                      style={{
                        left: `50%`,
                        top: `50%`,
                        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) rotate(${wheelRotation}deg)`,
                        zIndex: position.zIndex
                      }}
                    >
                      <div className={`relative transition-all duration-500 ${
                        position.isActive 
                          ? 'scale-125' 
                          : isVisible 
                            ? 'scale-100 hover:scale-110' 
                            : 'scale-75'
                      }`}>
                        {/* Active Ring */}
                        {position.isActive && (
                          <div className="absolute inset-0 bg-primary/30 rounded-full animate-pulse-ring -z-10"></div>
                        )}
                        
                        {/* Avatar */}
                        <Avatar className={`border-4 shadow-lg transition-all duration-500 ${
                          position.isActive 
                            ? 'w-20 h-20 border-primary shadow-xl' 
                            : 'w-16 h-16 border-border hover:border-primary/50'
                        }`}>
                          <AvatarImage 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="object-cover"
                          />
                          <AvatarFallback className={`font-semibold transition-colors ${
                            position.isActive 
                              ? 'bg-primary text-primary-foreground text-base' 
                              : 'text-sm'
                          }`}>
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>

                        {/* Floating Animation for Active Avatar */}
                        {position.isActive && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-avatar-float">
                            <Star className="w-3 h-3 fill-primary-foreground text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Center Dot */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 z-20"></div>
            </div>
          </div>

          {/* Right Side - Testimonial Content */}
          <div className="flex-1 ml-32 lg:ml-48">
            <div 
              key={currentTestimonial.id} 
              className="bg-card rounded-2xl p-8 shadow-xl border border-testimonial-border/20 animate-slide-in max-w-2xl"
            >
              {/* Quote Icon */}
              <div className="text-6xl text-primary/20 font-serif mb-4">"</div>
              
              {/* Customer Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {currentTestimonial.name}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-star text-star" />
                    <span className="font-semibold text-foreground">
                      {currentTestimonial.rating}
                    </span>
                  </div>
                  <span className="text-date text-sm">on {currentTestimonial.date}</span>
                </div>
              </div>

              {/* Review Text */}
              <blockquote className="text-quote text-lg leading-relaxed italic mb-6">
                "{currentTestimonial.review}"
              </blockquote>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => selectTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-primary w-8' 
                          : 'bg-border hover:bg-primary/50'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrevious}
                    className="w-10 h-10 p-0 rounded-full border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNext}
                    className="w-10 h-10 p-0 rounded-full border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
