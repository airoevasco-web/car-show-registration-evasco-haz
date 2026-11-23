import { Users, Wallet, AlertCircle, CheckCircle2, UserCheck } from 'lucide-react';
import KpiCard from './KpiCard';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount ?? 0);

export default function KpiCards({ summary, loading }) {
  if (loading && !summary) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 h-28 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
            <div className="h-7 bg-slate-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const totalRegistrations = summary?.totalRegistrations ?? 0;
  const totalPayments = summary?.totalPayments ?? 0;
  const uncollectedPayments = summary?.uncollectedPayments ?? 0;
  const confirmed = summary?.confirmed ?? 0;
  const checkedIn = summary?.checkedIn ?? 0;
  const totalFees = summary?.totalFees ?? 0;
  const collectionRate = totalFees > 0 ? Math.round((totalPayments / totalFees) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <KpiCard
        title="Total Registrations"
        value={totalRegistrations}
        subtitle={`${summary?.pending ?? 0} pending • ${summary?.cancelled ?? 0} cancelled`}
        icon={Users}
        accentColor="blue"
      />
      <KpiCard
        title="Total Payments"
        value={formatCurrency(totalPayments)}
        subtitle={`${collectionRate}% collection rate`}
        icon={Wallet}
        accentColor="emerald"
      />
      <KpiCard
        title="Uncollected Payments"
        value={formatCurrency(uncollectedPayments)}
        subtitle={`Out of ${formatCurrency(totalFees)} total fees`}
        icon={AlertCircle}
        accentColor="amber"
      />
      <KpiCard
        title="Confirmed"
        value={confirmed}
        subtitle="Approved participants"
        icon={CheckCircle2}
        accentColor="indigo"
      />
      <KpiCard
        title="Checked In"
        value={checkedIn}
        subtitle="Arrived at Sorsogon Coliseum"
        icon={UserCheck}
        accentColor="teal"
      />
    </div>
  );
}