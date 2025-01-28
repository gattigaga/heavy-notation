import * as React from "react";
import { SVGProps } from "react";

const LogoTwitch = ({ fill = "#000", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="125"
    height="146"
    viewBox="0 0 125 146"
    fill="none"
    {...props}
  >
    <path
      d="M59.6476 28.5258H70.0255V59.6476H59.6415L59.6476 28.5258ZM88.1794 28.5258H98.5513V59.6476H88.1794V28.5258ZM25.9358 0L0 25.9358V119.295H31.1218V145.231L57.0576 119.295H77.8014L124.487 72.6155V0H25.9358ZM114.109 67.4295L93.3654 88.1734H72.6155L54.4616 106.327V88.1734H31.1218V10.3719H114.109V67.4295Z"
      fill={fill}
    />
  </svg>
);

export default LogoTwitch;
