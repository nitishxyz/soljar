import Image from "next/image";

type CurrencyIconProps = {
  currency: "SOL" | "USDC" | "USDT";
  className?: string;
};

export function CurrencyIcon({
  currency,
  className = "w-4 h-4",
}: CurrencyIconProps) {
  const iconPath = {
    SOL: "/meta/coins/solana.svg",
    USDC: "/meta/coins/usdc.svg",
    USDT: "/meta/coins/usdt.svg",
  }[currency];

  return (
    <div className={className}>
      <Image
        src={iconPath}
        alt={currency}
        width={24}
        height={24}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
