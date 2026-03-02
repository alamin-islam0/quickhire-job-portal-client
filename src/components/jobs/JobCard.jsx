import { Building2, MapPin, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const toReadableDate = (value) => new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

export default function JobCard({ job }) {
  return (
    <Link
      to={`/jobs/${job._id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">{job.category}</span>
        <span className="text-xs text-slate-500">Posted {toReadableDate(job.createdAt)}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-brand-700">{job.title}</h3>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
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
      </div>
    </Link>
  );
}
