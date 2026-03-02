import { useCallback, useEffect, useMemo, useState } from 'react';
import { getJobs } from '../services/jobs.api';

const initialFilters = {
  search: '',
  category: '',
  location: '',
};

export default function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters.search]);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await getJobs({
        search: debouncedSearch,
        category: filters.category,
        location: filters.location,
      });
      setJobs(response.data || []);
    } catch (apiError) {
      setError(apiError.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters.category, filters.location]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const categories = useMemo(
    () => [...new Set(jobs.map((job) => job.category).filter(Boolean))],
    [jobs]
  );

  const locations = useMemo(
    () => [...new Set(jobs.map((job) => job.location).filter(Boolean))],
    [jobs]
  );

  const updateFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return {
    jobs,
    loading,
    error,
    filters,
    categories,
    locations,
    updateFilter,
    refetchJobs: fetchJobs,
  };
}
