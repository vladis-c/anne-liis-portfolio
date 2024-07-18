'use client';

import {HTMLMotionProps, motion, useAnimation} from 'framer-motion';
import React, {useEffect, useState, useCallback, useRef} from 'react';

type ScrollProps = {children: React.ReactNode} & HTMLMotionProps<'div'>;

const DESKTOP_SCROLL_OFFSET = 2;
const MOBILE_SCROLL_OFFSET = 50;

const Scroll = ({children, ...rest}: ScrollProps) => {
  const controls = useAnimation();
  const [currentSection, setCurrentSection] = useState(1);
  const sections = React.Children.count(children);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const touchStartY = useRef<number | null>(null);

  const scrollToSection = useCallback(
    (sectionIndex: number) => {
      if (sectionRefs.current[sectionIndex]) {
        const topOffset = sectionRefs.current[sectionIndex].offsetTop;
        controls.start({
          y: -topOffset,
          transition: {type: 'spring', stiffness: 100, damping: 20},
        });
        setCurrentSection(sectionIndex);
      }
    },
    [controls],
  );

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > DESKTOP_SCROLL_OFFSET) {
        scrollToSection(Math.min(currentSection + 1, sections - 1));
      } else if (event.deltaY < DESKTOP_SCROLL_OFFSET) {
        scrollToSection(Math.max(currentSection - 1, 0));
      }
    };

    /// TODO: Mobile phone handling (Same as on desktop, or???)
    /// Phone window does not fit everything
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (touchStartY.current !== null) {
        const touchEndY = event.changedTouches[0].clientY;
        const deltaY = touchStartY.current - touchEndY;

        if (deltaY > MOBILE_SCROLL_OFFSET) {
          scrollToSection(Math.min(currentSection + 1, sections - 1));
        } else if (deltaY < -MOBILE_SCROLL_OFFSET) {
          scrollToSection(Math.max(currentSection - 1, 0));
        }

        touchStartY.current = null;
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, sections, scrollToSection]);

  return (
    <motion.div animate={controls} {...rest}>
      {React.Children.map(children, (child, index) => (
        <div
          ref={el => (sectionRefs.current[index] = el as HTMLDivElement)}
          className="h-auto">
          {child}
        </div>
      ))}
    </motion.div>
  );
};

export default Scroll;
