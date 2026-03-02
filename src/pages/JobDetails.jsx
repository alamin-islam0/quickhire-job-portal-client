import { useEffect, useState } from 'react';
import { Building2, CalendarClock, MapPin, Tag } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Container from '../components/layout/Container';
import ApplyForm from '../components/forms/ApplyForm';
import Badge from '../components/ui/Badge';
import { getJobById } from '../services/jobs.api';

const toReadableDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getJobById(id);
        setJob(response.data);
      } catch (apiError) {
        setError(apiError.message || 'Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="skeleton h-5 w-48" />
          <div className="mt-4 space-y-3">
            <div className="skeleton h-4 w-2/3" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="rounded-xl border border-error/30 bg-error/10 p-4 text-sm text-error">{error}</div>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container>
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Job not found.</div>
      </Container>
    );
  }

  return (
    <Container className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr,0.8fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{job.category}</Badge>
          <span className="text-sm text-slate-500">Posted {toReadableDate(job.createdAt)}</span>
        </div>
        <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">{job.title}</h1>

        <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Building2 size={16} />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag size={16} />
            <span>{job.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarClock size={16} />
            <span>{toReadableDate(job.createdAt)}</span>
          </div>
        </div>

        <article className="prose prose-slate mt-6 max-w-none whitespace-pre-line text-sm leading-7 text-slate-700 sm:text-base">
          {job.description}
        </article>
      </section>

      <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <h2 className="text-xl font-semibold text-slate-900">Apply for this role</h2>
        <p className="mt-1 text-sm text-slate-500">Complete the form below to submit your application.</p>
        <div className="mt-5">
          <ApplyForm jobId={job._id} />
        </div>
      </aside>
    </Container>
  );
}
