import React from 'react'
import Marquee from 'react-fast-marquee'

const Testimonial = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Hear it from our students...
        </h2>
        
        <div className="flex flex-col gap-8">
          <Marquee
            speed={40}
            gradient={true}
            gradientWidth={50}
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
            gradientWidth={50}
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
  )
}

const TestimonialCard = ({ image, name, role, rating, review }: { image: string; name: string; role: string; rating: number; review: string }) => {
  return (
    <div className="w-[350px] bg-white rounded-xl shadow-sm p-6 mx-3">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <div className="text-yellow-400 mb-3">{'⭐'.repeat(rating)}</div>
      <p className="text-gray-600 text-sm line-clamp-3">{review}</p>
    </div>
  )
}

const testimonials = [
  {
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'James Wilson',
    role: 'Web Development Student',
    rating: 5,
    review: "The course structure and content quality exceeded my expectations. I've learned more in two months than I did in a year of self-study.",
  },
  {
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Sarah Chen',
    role: 'UI/UX Design Student',
    rating: 5,
    review: "The practical projects and mentor feedback helped me build a strong portfolio. I landed my dream job right after completing the course!",
  },
  {
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'Michael Rodriguez',
    role: 'Full Stack Developer',
    rating: 4,
    review: "Comprehensive curriculum and excellent support system. The community of learners is incredibly helpful and encouraging.",
  },
  {
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    name: 'Emily Thompson',
    role: 'Data Science Student',
    rating: 5,
    review: "The hands-on approach to learning and real-world projects made complex concepts much easier to grasp. Highly recommended!",
  },
]

export default Testimonial
