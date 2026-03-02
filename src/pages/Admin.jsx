import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import Container from '../components/layout/Container';
import AdminJobForm from '../components/forms/AdminJobForm';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { createJob, deleteJob, getJobs } from '../services/jobs.api';
import { getApplications } from '../services/applications.api';

const formatDateTime = (value) =>
  new Date(value).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

export default function Admin() {
  const [token, setToken] = useState(import.meta.env.VITE_ADMIN_TOKEN || '');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const hasToken = useMemo(() => token.trim().length > 0, [token]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const response = await getJobs();
      setJobs(response.data || []);
    } catch (error) {
      toast.error(error.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const loadApplications = async (adminToken, showErrorToast = true) => {
    if (!adminToken) {
      setApplications([]);
      setSelectedApplication(null);
      return;
    }

    setApplicationsLoading(true);
    try {
      const response = await getApplications(adminToken);
      setApplications(response.data || []);
    } catch (error) {
      if (showErrorToast) {
        toast.error(error.message || 'Failed to load applications');
      }
    } finally {
      setApplicationsLoading(false);
    }
  };

  const handleLoadApplications = async () => {
    if (!hasToken) {
      toast.error('Admin token is required');
      return;
    }

    await loadApplications(token.trim());
  };

  const handleCreateJob = async (payload) => {
    if (!hasToken) {
      toast.error('Admin token is required');
      return false;
    }

    setCreating(true);
    try {
      await createJob(payload, token.trim());
      toast.success('Job created');
      await loadJobs();
      await loadApplications(token.trim(), false);
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to create job');
      return false;
    } finally {
      setCreating(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!jobToDelete) {
      return;
    }

    setDeleteLoading(true);
    try {
      await deleteJob(jobToDelete._id, token.trim());
      toast.success('Job deleted');
      await loadJobs();
      await loadApplications(token.trim(), false);
      setJobToDelete(null);
    } catch (error) {
      toast.error(error.message || 'Failed to delete job');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Container className="space-y-6 pb-16">
        <section className="rounded-2xl border border-[#dce0ee] bg-white p-5 shadow-[0_12px_34px_rgba(37,50,75,0.06)] sm:p-6">
          <h1 className="text-2xl font-bold text-[#25324b] sm:text-3xl">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-[#6e7390]">Create jobs, remove listings, and inspect submitted applications.</p>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(360px,0.95fr)_minmax(0,1.05fr)] xl:grid-cols-[minmax(400px,1fr)_minmax(0,1.2fr)]">
          <section className="rounded-2xl border border-[#dce0ee] bg-white p-5 shadow-[0_12px_34px_rgba(37,50,75,0.06)] sm:p-6">
            <h2 className="text-xl font-semibold text-[#25324b]">Admin Access</h2>
            <p className="mt-1 text-sm text-[#6e7390]">Provide the admin token to unlock protected actions.</p>
            <p className="mt-2 rounded-md border border-[#dce0ee] bg-[#f7f9ff] px-3 py-2 text-xs font-medium text-[#4640de]">
              ADMIN_TOKEN=quickhire_admin_2026_secure
            </p>

            <div className="mt-5">
              <Input
              className='border-[#4640de] border'
                label="Admin Token"
                type="password"
                placeholder="Enter admin token"
                value={token}
                onChange={(event) => setToken(event.target.value)}
              />
              <button
                type="button"
                className="mt-3 inline-flex h-10 items-center rounded-md border border-[#4640de] px-4 text-sm font-semibold text-[#4640de] transition hover:bg-[#4640de] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleLoadApplications}
                disabled={applicationsLoading}
              >
                {applicationsLoading ? 'Loading...' : 'Load Applications'}
              </button>
            </div>

            <div className="mt-6 border-t border-[#eef1f6] pt-6">
              <h3 className="text-lg font-semibold text-[#25324b]">Add New Job</h3>
              <div className="mt-4">
                <AdminJobForm onSubmit={handleCreateJob} submitting={creating} />
              </div>
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-2xl border border-[#dce0ee] bg-white p-5 shadow-[0_12px_34px_rgba(37,50,75,0.06)] sm:p-6">
              <h2 className="text-xl font-semibold text-[#25324b]">Existing Jobs</h2>
              <p className="mt-1 text-sm text-[#6e7390]">Manage current listings.</p>

              <div className="mt-5 space-y-3">
                {loading ? (
                  <div className="space-y-3">
                    <div className="skeleton h-16 w-full" />
                    <div className="skeleton h-16 w-full" />
                  </div>
                ) : null}

                {!loading && jobs.length === 0 ? (
                  <div className="rounded-xl border border-[#e6e9f2] bg-[#f7f9ff] p-4 text-sm text-[#6e7390]">No jobs available.</div>
                ) : null}

                {!loading && jobs.length > 0
                  ? jobs.map((job) => (
                      <article key={job._id} className="flex flex-col gap-3 rounded-xl border border-[#e6e9f2] p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-semibold text-[#25324b]">{job.title}</h3>
                          <p className="text-sm text-[#6e7390]">
                            {job.company} · {job.location} · {job.category}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex h-9 items-center justify-center rounded-md bg-[#ff4f73] px-4 text-sm font-semibold text-white transition hover:bg-[#eb3a60] disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={!hasToken}
                          onClick={() => setJobToDelete(job)}
                        >
                          Delete
                        </button>
                      </article>
                    ))
                  : null}
              </div>
            </section>

            <section className="rounded-2xl border border-[#dce0ee] bg-white p-5 shadow-[0_12px_34px_rgba(37,50,75,0.06)] sm:p-6">
              <h2 className="text-xl font-semibold text-[#25324b]">Submitted Applications</h2>
              <p className="mt-1 text-sm text-[#6e7390]">Review candidate submissions. Click view to open full details.</p>

              {!hasToken ? (
                <div className="mt-5 rounded-xl border border-[#e6e9f2] bg-[#f7f9ff] p-4 text-sm text-[#6e7390]">
                  Enter admin token and click “Load Applications”.
                </div>
              ) : null}

              {hasToken && applicationsLoading ? (
                <div className="mt-5 space-y-3">
                  <div className="skeleton h-14 w-full" />
                  <div className="skeleton h-14 w-full" />
                </div>
              ) : null}

              {hasToken && !applicationsLoading && applications.length === 0 ? (
                <div className="mt-5 rounded-xl border border-[#e6e9f2] bg-[#f7f9ff] p-4 text-sm text-[#6e7390]">
                  No applications found.
                </div>
              ) : null}

              {hasToken && !applicationsLoading && applications.length > 0 ? (
                <>
                  <div className="mt-5 hidden overflow-x-auto lg:block">
                    <table className="w-full min-w-[860px] border-separate border-spacing-y-2">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-wide text-[#8a92ad]">
                          <th className="px-3 py-2">Applicant</th>
                          <th className="px-3 py-2">Job</th>
                          <th className="px-3 py-2">Resume</th>
                          <th className="px-3 py-2">Submitted</th>
                          <th className="px-3 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((application) => (
                          <tr key={application._id} className="rounded-lg bg-[#f9faff] text-sm text-[#25324b]">
                            <td className="rounded-l-lg px-3 py-3 align-top">
                              <p className="font-semibold">{application.name}</p>
                              <p className="text-xs text-[#6e7390]">{application.email}</p>
                            </td>
                            <td className="px-3 py-3 align-top">
                              <p className="font-semibold">{application.job_id?.title || 'Job Removed'}</p>
                              <p className="text-xs text-[#6e7390]">{application.job_id?.company || '-'}</p>
                            </td>
                            <td className="px-3 py-3 align-top">
                              <a
                                className="inline-flex items-center gap-1 text-sm font-medium text-[#4640de] hover:text-[#3530c1]"
                                href={application.resume_link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Resume <ExternalLink size={14} />
                              </a>
                            </td>
                            <td className="px-3 py-3 align-top text-xs text-[#6e7390]">{formatDateTime(application.createdAt)}</td>
                            <td className="rounded-r-lg px-3 py-3 align-top">
                              <button
                                type="button"
                                className="inline-flex h-8 items-center gap-1 rounded-md bg-[#4640de] px-3 text-xs font-semibold text-white transition hover:bg-[#3832ca]"
                                onClick={() => setSelectedApplication(application)}
                              >
                                <Eye size={14} />
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-5 space-y-3 lg:hidden">
                    {applications.map((application) => (
                      <article key={application._id} className="rounded-xl border border-[#e6e9f2] bg-[#f9faff] p-4">
                        <p className="font-semibold text-[#25324b]">{application.name}</p>
                        <p className="text-xs text-[#6e7390]">{application.email}</p>
                        <p className="mt-2 text-sm text-[#25324b]">{application.job_id?.title || 'Job Removed'}</p>
                        <p className="text-xs text-[#6e7390]">{application.job_id?.company || '-'}</p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <a
                            className="inline-flex items-center gap-1 text-sm font-medium text-[#4640de]"
                            href={application.resume_link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Resume <ExternalLink size={14} />
                          </a>
                          <button
                            type="button"
                            className="inline-flex h-8 items-center gap-1 rounded-md bg-[#4640de] px-3 text-xs font-semibold text-white"
                            onClick={() => setSelectedApplication(application)}
                          >
                            <Eye size={14} />
                            View
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              ) : null}
            </section>
          </div>
        </div>
      </Container>

      <Modal
        open={Boolean(jobToDelete)}
        title="Delete job listing"
        description={jobToDelete ? `Are you sure you want to delete “${jobToDelete.title}”?` : ''}
        onConfirm={handleConfirmDelete}
        onClose={() => setJobToDelete(null)}
        loading={deleteLoading}
      />

      {selectedApplication ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/60 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-[#25324b]">Application Details</h3>
                <p className="mt-1 text-sm text-[#6e7390]">Submitted {formatDateTime(selectedApplication.createdAt)}</p>
              </div>
              <button
                type="button"
                className="inline-flex h-9 items-center rounded-md border border-[#dce0ee] px-3 text-sm font-medium text-[#4f5975]"
                onClick={() => setSelectedApplication(null)}
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid gap-4 rounded-xl border border-[#e6e9f2] bg-[#f9faff] p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#8a92ad]">Applicant</p>
                <p className="mt-1 font-semibold text-[#25324b]">{selectedApplication.name}</p>
                <p className="text-sm text-[#6e7390]">{selectedApplication.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[#8a92ad]">Job</p>
                <p className="mt-1 font-semibold text-[#25324b]">{selectedApplication.job_id?.title || 'Job Removed'}</p>
                <p className="text-sm text-[#6e7390]">{selectedApplication.job_id?.company || '-'}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-[#8a92ad]">Resume Link</p>
              <a
                className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[#4640de] hover:text-[#3530c1]"
                href={selectedApplication.resume_link}
                target="_blank"
                rel="noreferrer"
              >
                Open Resume <ExternalLink size={14} />
              </a>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-[#8a92ad]">Cover Note</p>
              <p className="mt-2 rounded-xl border border-[#e6e9f2] bg-[#f9faff] p-4 text-sm leading-6 text-[#3c4765]">
                {selectedApplication.cover_note}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
