import * as React from "react";
import { SVGProps } from "react";

const LogoDiscord = ({ fill = "#000", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="126"
    height="139"
    viewBox="0 0 126 139"
    fill="none"
    {...props}
  >
    <path
      d="M110.316 0.187119C118.397 0.187119 124.915 6.72213 125.3 14.4124V138.129L109.914 125.065L101.465 117.375L92.2456 109.34L96.0965 122.013H15.4118C7.35364 122.013 0.812881 115.892 0.812881 107.782V14.4412C0.812881 6.75087 7.36514 0.204361 15.4405 0.204361H110.276L110.316 0.187119ZM75.1523 32.8507H74.9798L73.8188 34.0002C85.7336 37.4488 91.4984 42.8343 91.4984 42.8343C83.8196 38.9949 76.8995 37.0752 69.9794 36.2993C64.979 35.5233 59.9786 35.9314 55.7541 36.2993H54.6046C51.9032 36.2993 46.1556 37.4488 38.4539 40.5237C35.7697 41.6905 34.2294 42.4549 34.2294 42.4549C34.2294 42.4549 39.9885 36.6958 52.6792 33.6209L51.9032 32.845C51.9032 32.845 42.2933 32.4771 31.9189 40.1444C31.9189 40.1444 21.5445 58.2148 21.5445 80.4925C21.5445 80.4925 27.292 90.4933 43.0577 90.8727C43.0577 90.8727 45.3567 87.8092 47.6845 85.1136C38.8332 82.4237 35.3847 77.0439 35.3847 77.0439C35.3847 77.0439 36.1548 77.4233 37.3101 78.1935H37.655C37.8274 78.1935 37.9079 78.2797 37.9998 78.3659V78.4004C38.0918 78.4923 38.1722 78.5728 38.3447 78.5728C40.2414 79.3545 42.1381 80.1247 43.6899 80.8718C47.0088 82.2925 50.4802 83.3263 54.0356 83.9526C59.3809 84.7285 65.5078 85.1021 72.4854 83.9526C75.9339 83.1766 79.3825 82.4179 82.831 80.8776C85.0726 79.7281 87.8315 78.5786 90.8604 76.6416C90.8604 76.6416 87.4119 82.0214 78.187 84.7112C80.0837 87.3896 82.7563 90.4588 82.7563 90.4588C98.5277 90.114 104.655 80.1132 105 80.5385C105 58.2953 94.5676 40.1904 94.5676 40.1904C85.1703 33.2128 76.3765 32.9484 74.8246 32.9484L75.1465 32.8335L75.1523 32.8507ZM76.1179 58.2148C80.1584 58.2148 83.4173 61.6634 83.4173 65.8879C83.4173 70.1411 80.1412 73.5896 76.1179 73.5896C72.0945 73.5896 68.8184 70.1411 68.8184 65.9224C68.8299 61.6691 72.1118 58.2321 76.1179 58.2321V58.2148ZM50.0065 58.2148C54.0299 58.2148 57.283 61.6634 57.283 65.8879C57.283 70.1411 54.0069 73.5896 49.9835 73.5896C45.9602 73.5896 42.6841 70.1411 42.6841 65.9224C42.6841 61.6691 45.9602 58.2321 49.9835 58.2321L50.0065 58.2148Z"
      fill={fill}
    />
  </svg>
);

export default LogoDiscord;
