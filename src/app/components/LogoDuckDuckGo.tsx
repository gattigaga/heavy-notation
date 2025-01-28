import * as React from "react";
import { SVGProps } from "react";

const LogoDuckDuckGo = ({
  fill = "#000",
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={125}
    height={125}
    viewBox="0 0 125 125"
    fill="none"
    {...props}
  >
    <path
      fill={fill}
      d="M62.244 0C27.87 0 0 27.87 0 62.244c0 34.374 27.87 62.243 62.244 62.243 34.374 0 62.243-27.87 62.243-62.243C124.487 27.87 96.617 0 62.244 0Zm0 119.3c-31.511 0-57.057-25.55-57.057-57.056 0-31.506 25.55-57.057 57.057-57.057 31.505 0 57.056 25.546 57.056 57.057 0 31.51-25.546 57.056-57.056 57.056Zm53.005-57.056c0 24.923-17.205 45.816-40.386 51.48-1.4-2.702-2.749-5.275-3.885-7.459 3.346 1.292 10.011 3.725 11.453 3.19 1.95-.747 1.463-16.333-.726-16.831-1.753-.39-8.465 4.341-11.105 6.27l.176.81c.405 2.059.747 5.15.156 6.468-.005.021-.01.052-.021.067-.076.18-.198.338-.353.457-1.473.975-5.607 1.473-7.796.975a2.58 2.58 0 0 1-.332-.104c-3.6 2.054-10.425 5.753-11.67 5.037-1.707-.975-1.956-13.88-1.707-17.055.182-2.386 8.574 1.483 12.667 3.522.902-.846 3.122-1.41 5.083-1.608-2.957-7.205-5.135-15.441-3.802-21.292 0 .01.01.01.01.01 1.847 1.286 14.16 5.446 20.281 5.327 6.12-.124 16.153-3.854 15.058-6.862-1.1-3.009-11.074 2.645-21.484 1.68-7.708-.716-9.067-4.17-7.366-6.691 2.147-3.17 6.058.602 12.506-1.328 6.458-1.924 15.493-5.368 18.839-7.246 7.749-4.32-3.242-6.105-5.835-4.912-2.459 1.141-11.012 3.304-14.986 4.253 2.22-7.863-3.127-21.52-9.113-27.49-1.95-1.951-4.933-3.175-8.315-3.818-1.296-1.785-3.392-3.48-6.354-5.068a29.94 29.94 0 0 0-18.647-3.03l-.124.022-.177.02.021.01c-.768.146-1.23.416-1.852.509.768.083 3.657 1.432 5.483 2.168-.903.353-2.137.56-3.091.955a4.3 4.3 0 0 0-1.059.29c-.897.415-1.571 1.945-1.556 2.671 4.357-.446 10.8-.134 15.514 1.276-3.34.467-6.405 1.339-8.615 2.5-.083.042-.156.094-.25.146-.28.103-.549.218-.788.342-7.09 3.735-10.223 12.475-8.356 22.947 1.676 9.461 8.637 41.952 11.878 57.389-20.607-7.262-35.385-26.9-35.385-49.997 0-29.276 23.73-53.006 53.006-53.006 29.275 0 53.005 23.73 53.005 53.006ZM47.175 49.696a3.931 3.931 0 1 0 0 7.863 3.931 3.931 0 0 0 0-7.863Zm1.754 3.642a1.016 1.016 0 1 1 0-2.033 1.016 1.016 0 0 1 0 2.033Zm24.503-5.41a3.371 3.371 0 1 0 0 6.737 3.372 3.372 0 0 0 2.384-5.755 3.367 3.367 0 0 0-2.384-.982Zm1.504 3.117a.872.872 0 1 1 0-1.743.872.872 0 0 1 0 1.743Zm-26.63-8.792s-2.962-1.349-5.835.467c-2.874 1.805-2.77 3.651-2.77 3.651s-1.525-3.402 2.542-5.072c4.077-1.66 6.068.954 6.068.954h-.005Zm27.16-.27s-2.127-1.213-3.787-1.193c-3.393.042-4.31 1.536-4.31 1.536s.57-3.569 4.901-2.853a4.357 4.357 0 0 1 3.195 2.51Z"
    />
  </svg>
);

export default LogoDuckDuckGo;
