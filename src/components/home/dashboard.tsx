"use client";
import { useSoljarUser } from "@/web3/hooks/use-soljar-user";
import { BalanceCards } from "./balance-cards";
import { PaymentLinkCard } from "./payment-link-card";
import { TotalsCard } from "./totals-card";
import { WithdrawalHistoryCard } from "./withdrawal-history-card";
import { PaymentHistoryCard } from "./payment-history-card";
export default function Dashboard() {
  const { getUser } = useSoljarUser();
  const { data: user, isLoading } = getUser;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1400px] p-8 px-4 sm:px-6 space-y-6">
        <h1 className="text-3xl font-medium">Welcome back, {user?.username}</h1>

        <BalanceCards />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PaymentLinkCard username={user?.username} />
          <TotalsCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PaymentHistoryCard />
          <WithdrawalHistoryCard />
        </div>
      </div>
    </div>
  );
}
