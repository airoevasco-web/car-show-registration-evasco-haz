export default function StatusBadge({ status }) {
  const styles = {
    Pending: 'bg-slate-100 text-slate-700 border-slate-300',
    Confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    CheckedIn: 'bg-teal-50 text-teal-700 border-teal-200',
    Cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const labels = {
    Pending: 'Pending',
    Confirmed: 'Confirmed',
    CheckedIn: 'Checked In',
    Cancelled: 'Cancelled',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.Pending}`}>
      {labels[status] || status}
    </span>
  );
}