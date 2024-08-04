const HeroImage = ({imageUrl}: {imageUrl: string}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 350 469"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <ellipse
        cx="175"
        cy="234.169"
        rx="175"
        ry="234.169"
        fill="url(#pattern0_10_36)"
      />
      <ellipse
        cx="174.5"
        cy="233.5"
        rx="174.5"
        ry="233.5"
        fill="url(#paint0_linear_10_36)"
      />
      <defs>
        <pattern
          id="pattern0_10_36"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1">
          <use
            xlinkHref="#image0_10_36"
            transform="matrix(0.000446036 0 0 0.000333333 -0.154781 0)"
          />
        </pattern>
        <linearGradient
          id="paint0_linear_10_36"
          x1="174.5"
          y1="0"
          x2="174.5"
          y2="467"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#314154" stopOpacity="0.1" />
          <stop offset="0.965" stopColor="#314154" stopOpacity="0.4" />
        </linearGradient>
        <image
          aria-label="author_image"
          id="image0_10_36"
          width="2936"
          height="3000"
          xlinkHref={imageUrl}
        />
      </defs>
    </svg>
  );
};

export default HeroImage;
