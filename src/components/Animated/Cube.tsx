'use client';
import {animated, useSpring} from '@react-spring/web';

const Cube = () => {
  const [springs, api] = useSpring(() => ({
    from: {x: 0},
  }));

  const handleMouseOver = () => {
    if (springs.x.get() === 0) {
      api.start({from: {x: 0}, to: {x: 200}});
    }
    if (springs.x.get() === 200) {
      api.start({from: {x: 200}, to: {x: 0}});
    }
  };

  return (
    <animated.div
      onMouseOver={handleMouseOver}
      className="w-20 h-20 bg-red-400 rounded-lg"
      style={{...springs}}
    />
  );
};

export default Cube;
