import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

const CreditCard = ({ cartName, status, balance, holderName, cardNumber, expiry, actionButton }: { balance?: string; cartName: string; holderName: string, cardNumber: string; expiry: string, status: ReactNode; actionButton?: ReactNode }) => {
  return (
    <div className="flex md:flex-row min-w-[196px] sm:min-w-[200px] flex-col items-center justify-center md:gap-20 gap-12">
      <div className="flex flex-col w-full">
        <div className="grid grid-cols-4 justify-between bg-[#210D09ED] text-white min-h-40 w-full max-w-xs rounded-lg px-3.5 py-1.5 shadow-xl transition duration-400">
          <div className="flex relative gap-2 col-span-4 flex-col text-left mt-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-[#FFFCFC]">
                {cartName}
              </div>
              <BnakName />
            </div>
            <div className="flex items-center">
              <Chip />
              {status}
            </div>
            <div className="flex">
              <div className="flex items-center text-base">
                <LeftCaret />
                <span>{cardNumber}</span>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col"> <p className="text-[8px] capitalize">{holderName}</p> { balance && <p className="text-sm">{formatPrice(parseInt(balance), "INR")}</p>}  </div>
              <div className="flex items-center gap-x-1 text-[11px]">
                <span className="text-[5px]">
                  VALID <br />
                  THRU
                </span>
                <span>
                  {expiry}
                </span>
              </div>
            </div>
            {actionButton && actionButton}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;


const Chip = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      className="w-10 h-9 mt-2 ml-2"
    >
      <path
        fill="#FF9800"
        d="M5 35V13c0-2.2 1.8-4 4-4h30c2.2 0 4 1.8 4 4v22c0 2.2-1.8 4-4 4H9c-2.2 0-4-1.8-4-4z"
      />
      <path
        fill="#FFD54F"
        d="M43 21v-2H31c-1.1 0-2-.9-2-2s.9-2 2-2h1v-2h-1c-2.2 0-4 1.8-4 4s1.8 4 4 4h3v6h-3c-2.8 0-5 2.2-5 5s2.2 5 5 5h2v-2h-2c-1.7 0-3-1.3-3-3s1.3-3 3-3h12v-2h-7v-6h7zm-26 6h-3v-6h3c2.2 0 4-1.8 4-4s-1.8-4-4-4h-3v2h3c1.1 0 2 .9 2 2s-.9 2-2 2H5v2h7v6H5v2h12c1.7 0 3 1.3 3 3s-1.3 3-3 3h-2v2h2c2.8 0 5-2.2 5-5s-2.2-5-5-5z"
      />
    </svg>
  );
};

const LeftCaret = () => {
  return (
    <svg
      width="13"
      height="15"
      viewBox="0 0 13 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-xl mr-1"
    >
      <path
        d="M12.5655 0.785121L12.701 14.4904L0.764073 7.75511L12.5655 0.785121Z"
        fill="#FFFEFE"
      />
    </svg>
  );
};

const BnakName = () => {
  return (
    <Image src="/logo/final-logo.png" alt="platinum-card-logo" width={60} height={60} />
  );
};
