import React from "react";
import { cn } from "@/lib/utils";

interface EyeIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const EyeIcon: React.FC<EyeIconProps> = ({ className, ...props }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={cn("w-6 h-6", className)}
      {...props}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
};

export default EyeIcon;
