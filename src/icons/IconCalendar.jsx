import React from "react";

export const IconCalendar = ({
  fill = '#323232',
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill={filled ? fill : 'none'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_6_16239)">
        <path
          d="M20 3H19V1H17V3H7V1H5V3H4C2.9 3 2 3.9 2 5V21C2 22.1 2.9 23 4 23H20C21.1 23 22 22.1 22 21V5C22 3.9 21.1 3 20 3ZM20 21H4V10H20V21ZM20 8H4V5H20V8Z"
          fill={filled ? fill : 'none'}
          stroke={fill}
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6_16239">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};