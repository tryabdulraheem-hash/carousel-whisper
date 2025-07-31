import { TestimonialCarousel } from '@/components/TestimonialCarousel';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="py-20 px-4 text-center bg-gradient-to-br from-background to-testimonial-bg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Customer <span className="text-primary">Testimonials</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            See what our amazing customers have to say about their experience
          </p>
        </div>
      </div>

      {/* Testimonial Carousel */}
      <TestimonialCarousel />
      
      {/* Additional Content Section */}
      <div className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Ready to Join Our Happy Customers?
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience the same exceptional service that our customers love
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
