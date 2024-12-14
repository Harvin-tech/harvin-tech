'use client';
import React from 'react';
import { DotButton, useDotButton } from '.';
import useEmblaCarousel from 'embla-carousel-react';
import './embla.css';

interface EmblaCarouselProps {
  slides: any[];
  options?: any;
  renderSlide?: (item: any, index: number) => React.ReactNode;
  showDots?: boolean;
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({
  slides,
  options,
  renderSlide,
  showDots = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              {renderSlide ? (
                renderSlide(item, index)
              ) : (
                <div className="embla__slide__number">{index + 1}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showDots && (
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default EmblaCarousel;
