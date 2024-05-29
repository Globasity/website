const IconPlusYellow = ({ color, plusColor }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_479_23)">
      <path
        d="M13.9355 27C21.6319 27 27.871 20.9558 27.871 13.5C27.871 6.04416 21.6319 0 13.9355 0C6.23914 0 0 6.04416 0 13.5C0 20.9558 6.23914 27 13.9355 27Z"
        fill={color}
      />
      <path
        d="M13.5972 13.1709V17.1222M13.5972 13.1709H9.51855M13.5972 13.1709H17.6759M13.5972 13.1709V9.21973"
        stroke={plusColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_479_23">
        <rect width="28" height="28" fill={plusColor} />
      </clipPath>
    </defs>
  </svg>
);

export default IconPlusYellow;
