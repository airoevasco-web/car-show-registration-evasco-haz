import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, RefreshCw, Trophy } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import KpiCards from '../components/KpiCards';
import RegistrationFilters from '../components/RegistrationFilters';
import RegistrationTable from '../components/RegistrationTable';
import Pagination from '../components/Pagination';

// SWITCH DATA SOURCE HERE:
// Use '../api/sample-data' while developing offline, then switch to '../api/registrationsApi' for the real C# API
// import { getRegistrations, getSummary } from '../api/sample-data';
import { getRegistrations, getSummary } from '../api/registrationsApi';

export default function RegistrationsPage() {
  // Filter & Paging State
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Data, Loading & Error State
  const [registrations, setRegistrations] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [summary, setSummary] = useState(null);

  const [loadingTable, setLoadingTable] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummaryData = useCallback(async () => {
    setLoadingSummary(true);
    try {
      const data = await getSummary();
      setSummary(data);
    } catch (err) {
      setError(err.message || 'Cannot reach the API...');
    } finally {
      setLoadingSummary(false);
    }
  }, []);

  const fetchRegistrationsData = useCallback(async () => {
    setLoadingTable(true);
    setError(null);
    try {
      const data = await getRegistrations({
        participantName: debouncedSearch,
        type: typeFilter,
        status: statusFilter,
        page,
        pageSize,
      });
      setRegistrations(data.items || []);
      setTotalCount(data.totalCount ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } catch (err) {
      setError(err.message || 'Cannot reach the API...');
    } finally {
      setLoadingTable(false);
    }
  }, [debouncedSearch, typeFilter, statusFilter, page, pageSize]);

  useEffect(() => {
    fetchSummaryData();
  }, [fetchSummaryData]);

  useEffect(() => {
    fetchRegistrationsData();
  }, [fetchRegistrationsData]);

  // Reset to page 1 whenever filters or pageSize change
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleTypeChange = (value) => {
    setTypeFilter(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setTypeFilter('');
    setStatusFilter('');
    setPage(1);
  };

  const handleRetry = () => {
    fetchSummaryData();
    fetchRegistrationsData();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">AutoVista Events — Car Show 2027</h1>
              <p className="text-xs text-slate-400">Registration Management Dashboard • Sorsogon City Coliseum</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-red-800">Cannot reach the API...</h3>
                <p className="text-xs text-red-700 mt-0.5">{error}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Try again
            </button>
          </div>
        )}

        {/* 1. KPI Summary Cards */}
        <section aria-label="Event Summary">
          <KpiCards summary={summary} loading={loadingSummary} />
        </section>

        {/* 2. Search & Filters */}
        <section aria-label="Filter Registrations">
          <RegistrationFilters
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            typeFilter={typeFilter}
            onTypeChange={handleTypeChange}
            statusFilter={statusFilter}
            onStatusChange={handleStatusChange}
            onClearFilters={handleClearFilters}
          />
        </section>

        {/* 3. Registrations Data Table */}
        <section aria-label="Registrations List">
          <RegistrationTable
            registrations={registrations}
            loading={loadingTable}
            onClearFilters={handleClearFilters}
          />
        </section>

        {/* 4. Pagination */}
        {!error && (
          <Pagination
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
            totalPages={totalPages}
            loading={loadingTable}
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </main>
    </div>
  );
}