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

  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 3000); // Resume auto-play after 3 seconds
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 3000); // Resume auto-play after 3 seconds
  };

  const currentTestimonial = testimonials[currentIndex];
  const otherTestimonials = testimonials.filter((_, index) => index !== currentIndex);

  return (
    <section className="py-16 px-4 bg-testimonial-bg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <h2 className="text-2xl font-bold text-foreground">Customer Reviews</h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Customer Avatars */}
          <div className="relative">
            <div className="flex flex-col items-center space-y-6">
              {/* Main Active Customer */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-ring"></div>
                <Avatar className="w-24 h-24 border-4 border-primary shadow-lg relative z-10">
                  <AvatarImage 
                    src={currentTestimonial.avatar} 
                    alt={currentTestimonial.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                    {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Other Customers */}
              <div className="flex space-x-4">
                {otherTestimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.id}
                    onClick={() => {
                      setCurrentIndex(testimonials.findIndex(t => t.id === testimonial.id));
                      setIsPlaying(false);
                      setTimeout(() => setIsPlaying(true), 3000);
                    }}
                    className="transition-all duration-300 hover:scale-110 opacity-60 hover:opacity-100"
                  >
                    <Avatar className="w-16 h-16 border-2 border-border shadow-md">
                      <AvatarImage 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-sm font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Testimonial Content */}
          <div className="relative">
            <div 
              key={currentTestimonial.id} 
              className="bg-card rounded-2xl p-8 shadow-xl border border-testimonial-border/20 animate-slide-in"
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
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsPlaying(false);
                        setTimeout(() => setIsPlaying(true), 3000);
                      }}
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
