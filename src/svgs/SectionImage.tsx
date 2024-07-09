const SectionImage = ({imageUrl, id}: {imageUrl: string; id: string}) => {
  return (
    <svg
      width="300"
      height="540"
      viewBox="0 0 300 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs>
        <clipPath id="clipShape">
          <path d="M300 269.697C300 418.647 300 539.394 150 539.394C0 539.394 0 418.647 0 269.697V269.697C0 120.748 0 -2.40462e-05 150 0C300 2.40462e-05 300 120.748 300 269.697Z" />
        </clipPath>
      </defs>
      <image
        xlinkHref={imageUrl}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#clipShape)"
        id={`${id} section picture`}
        aria-label={`${id} section picture`}
      />
      <path
        d="M300 269.697C300 418.647 300 539.394 150 539.394C0 539.394 0 418.647 0 269.697V269.697C0 120.748 0 -2.40462e-05 150 0C300 2.40462e-05 300 120.748 300 269.697Z"
        fill="none"
        stroke="black"
        strokeOpacity="0.06"
      />
    </svg>
  );
};

export default SectionImage;
