'use client';
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

const Testimonial = () => {
  return (
    <section className="py-16 bg-background ">
      <div className=" mx-auto px-4">
        <h2 className="text-4xl md:text-5xl text-foreground font-bold tracking-tight md:leading-tight text-center">
          Hear It From Our Students
        </h2>
        <p className="text-foreground/80 text-sm md:text-lg tracking-tight text-center mb-6 max-w-2xl mx-auto">
          Discover what our students have to say about their learning journey
          with us
        </p>

        <div className="flex flex-col gap-4">
          <Marquee
            speed={40}
            gradient={true}
            gradientWidth={100}
            direction="left"
            autoFill
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </Marquee>

          <Marquee
            speed={40}
            gradient={true}
            gradientWidth={100}
            direction="right"
            autoFill
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  image,
  name,
  role,
  rating,
  review,
}: {
  image: string;
  name: string;
  role: string;
  rating: number;
  review: string;
}) => {
  return (
    <div className="w-[350px] bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 mx-2 border border-border">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative size-14 bg-muted rounded-full overflow-hidden">
          <Image
            fill
            src={image}
            alt={name}
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className =
                  'flex items-center justify-center size-full bg-muted';
                fallback.innerHTML =
                  '<svg class="size-6 text-muted-foreground" viewBox="0 0 24 24"><use href="#image-off"/></svg>';
                parent.appendChild(fallback);
              }
            }}
          />
        </div>
        <div>
          <h3 className="font-semibold text-card-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <div className="flex text-primary mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} className="size-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <p className="text-muted-foreground text-sm line-clamp-3">{review}</p>
    </div>
  );
};

const testimonials = [
  {
    image: '/Images/home/review1.png',
    name: 'James Wilson',
    role: 'Web Development Student',
    rating: 5,
    review:
      "The course structure and content quality exceeded my expectations. I've learned more in two months than I did in a year of self-study.",
  },
  {
    image: '/Images/home/review2.jpeg',
    name: 'Sarah Chen',
    role: 'UI/UX Design Student',
    rating: 3,
    review:
      'The practical projects and mentor feedback helped me build a strong portfolio. I landed my dream job right after completing the course!',
  },
  {
    image: '/Images/home/review3.jpeg',
    name: 'Michael Rodriguez',
    role: 'Full Stack Developer',
    rating: 4,
    review:
      'Comprehensive curriculum and excellent support system. The community of learners is incredibly helpful and encouraging.',
  },
  {
    image: '/Images/home/review4.jpeg',
    name: 'Emily Thompson',
    role: 'Data Science Student',
    rating: 5,
    review:
      'The hands-on approach to learning and real-world projects made complex concepts much easier to grasp. Highly recommended!',
  },
  {
    image: '/Images/home/review5.jpeg',
    name: 'Emily Thompson',
    role: 'Data Science Student',
    rating: 3,
    review:
      'Comprehensive curriculum and excellent support system. The community of learners is incredibly helpful and encouraging.',
  },
];

export default Testimonial;
