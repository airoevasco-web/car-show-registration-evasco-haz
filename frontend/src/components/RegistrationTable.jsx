import { Car, Loader2, SearchX } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PaymentBadge from './PaymentBadge';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount ?? 0);

const formatDate = (isoString) => {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function RegistrationTable({ registrations, loading, onClearFilters }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
        <p className="text-sm font-medium text-slate-700">Loading registrations...</p>
        <p className="text-xs text-slate-500 mt-1">Fetching latest event records</p>
      </div>
    );
  }

  if (!registrations || registrations.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
        <SearchX className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-slate-800">No registrations match your filters</h3>
        <p className="text-sm text-slate-500 mt-1 mb-4">
          Try adjusting your search query or clearing your active filters.
        </p>
        <button
          type="button"
          onClick={onClearFilters}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 px-4">Reg. No.</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4">Participant</th>
              <th className="py-3.5 px-4">Car</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Fee / Paid</th>
              <th className="py-3.5 px-4">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {registrations.map((reg) => (
              <tr key={reg.id || reg.registrationNumber} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-mono font-semibold text-slate-900 whitespace-nowrap">
                  {reg.registrationNumber}
                </td>
                <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap text-xs">
                  {formatDate(reg.registrationDate)}
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-medium text-slate-900">{reg.participantName}</div>
                  <div className="text-xs text-slate-500">
                    {reg.contactNumber} • {reg.email}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5 font-medium text-slate-800">
                    <Car className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{reg.carMakeModel}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-500 pl-5">{reg.plateNumber}</div>
                </td>
                <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                  {reg.registrationType}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <StatusBadge status={reg.status} />
                </td>
                <td className="py-3.5 px-4 text-right whitespace-nowrap font-mono text-xs">
                  <div className="text-slate-900 font-semibold">{formatCurrency(reg.registrationFee)}</div>
                  <div className="text-slate-500">Paid: {formatCurrency(reg.amountPaid)}</div>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <PaymentBadge paymentStatus={reg.paymentStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}