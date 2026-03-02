import { ArrowRight, ChevronDown, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import useJobs from '../hooks/useJobs';
import heroDesignB3Dcb2A223F641F0B740595184E6D3E91 from '../resources/design-b3dcb2a2-23f6-41f0-b740-595184e6d3e9-1.svg';

const categoriesData = [
  { name: 'Design', jobs: 235, icon: '/assets/category/design.svg' },
  { name: 'Sales', jobs: 756, icon: '/assets/category/sales.svg' },
  { name: 'Marketing', jobs: 140, icon: '/assets/category/marketing.svg', featured: true },
  { name: 'Finance', jobs: 325, icon: '/assets/category/finance.svg' },
  { name: 'Technology', jobs: 436, icon: '/assets/category/technology.svg' },
  { name: 'Engineering', jobs: 542, icon: '/assets/category/engineering.svg' },
  { name: 'Business', jobs: 211, icon: '/assets/category/business.svg' },
  { name: 'Human Resource', jobs: 346, icon: '/assets/category/human-resource.svg' },
];

const companies = [
  { name: 'Vodafone', src: '/assets/company/vodafone.svg', className: 'h-8' },
  { name: 'Intel', src: '/assets/company/intel.svg', className: 'h-8' },
  { name: 'Tesla', src: '/assets/company/tesla.svg', className: 'h-7' },
  { name: 'AMD', src: '/assets/company/amd.svg', className: 'h-7' },
  { name: 'Talkit', src: '/assets/company/talkit.svg', className: 'h-7' },
];

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const getShortLabel = (value = '') => value.split(' ').slice(0, 2).map((chunk) => chunk[0]).join('').toUpperCase();

export default function JobsList() {
  const { jobs, loading, error, filters, locations, updateFilter } = useJobs();
  const featuredJobs = jobs.slice(0, 8);
  const latestJobs = jobs.slice(0, 8);

  return (
    <div className="bg-[#f3f4f8]">
      <section className="relative overflow-hidden pb-12 pt-2 sm:pb-16 sm:pt-4 lg:pb-8">
        <div
          className="pointer-events-none absolute bottom-0 right-0 z-[1] h-[120px] w-[62%] bg-white sm:h-[170px] sm:w-[56%] lg:h-[240px] lg:w-[52%]"
          style={{ clipPath: 'polygon(24% 100%, 100% 0, 100% 100%)' }}
        />
        <Container>
          <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[0.95fr,1.05fr]">
            <div className="z-10 py-2 sm:py-6 lg:py-2">
              <h1 className="text-[38px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#25324b] sm:text-[48px] lg:text-[64px]">
                Discover
                <br />
                more than
                <br />
                <span className="text-[#26a4ff]">5000+ Jobs</span>
              </h1>
              <div className="mt-3 h-[8px] w-[220px] rounded-[40px] bg-[#26a4ff] sm:h-[10px] sm:w-[290px]" />
              <p className="mt-5 max-w-[430px] text-[16px] leading-7 text-[#6e7390] sm:mt-7 sm:text-[20px] sm:leading-8">
                Great platform for the job seeker that searching for new career heights and passionate about startups.
              </p>

              <div className="mt-6 flex flex-col gap-2 rounded-none border border-[#dce0ee] bg-white p-1 shadow-[0_18px_40px_rgba(58,66,119,0.08)] sm:mt-8 sm:p-2 sm:flex-row sm:items-center sm:gap-0">
                <div className="flex h-[52px] flex-1 items-center gap-3 px-4 sm:h-[58px] sm:px-5">
                  <Search size={18} className="text-[#242b45]" />
                  <input
                    value={filters.search}
                    onChange={(event) => updateFilter('search', event.target.value)}
                    className="w-full border-0 bg-transparent text-[15px] text-[#4d546d] outline-none placeholder:text-[#a0a7be]"
                    placeholder="Job title or keyword"
                  />
                </div>
                <div className="mx-1 hidden h-9 w-[1px] bg-[#d8dced] sm:block" />
                <div className="flex h-[52px] items-center gap-3 px-4 sm:h-[58px] sm:px-5 sm:w-[220px]">
                  <MapPin size={17} className="text-[#242b45]" />
                  <select
                    value={filters.location}
                    onChange={(event) => updateFilter('location', event.target.value)}
                    className="w-full border-0 bg-transparent text-[15px] text-[#313952] outline-none"
                  >
                    <option value="">Florence, Italy</option>
                    {locations.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="text-[#4b546d]" />
                </div>
                <button className="h-[52px] w-full rounded-none bg-[#4640de] px-6 text-[15px] font-semibold text-white transition hover:bg-[#3832ca] sm:h-[58px] sm:w-auto sm:px-8 sm:text-[16px]">
                  Search my job
                </button>
              </div>

              <p className="mt-4 text-[14px] text-[#7a8199]">
                Popular : UI Designer, UX Researcher, Android, Admin
              </p>
              {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
            </div>

            <div className="relative h-[330px] sm:h-[460px] lg:h-[600px]">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,#f3f4f8_25%,#edeffc_85%)]" />
              <img
                src={heroDesignB3Dcb2A223F641F0B740595184E6D3E91}
                alt="Hero visual"
                className="absolute inset-0 h-full w-full object-cover object-[70%_10%] sm:object-[78%_7%]"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-[#ffffff] bg-[#ffffff] py-10">
        <Container>
          <p className="text-[18px] text-[#8b91a9]">Companies we helped grow</p>
          <div className="mt-6 grid grid-cols-2 place-items-center gap-6 md:grid-cols-5">
            {companies.map((item) => (
              <div key={item.name} className="flex w-full justify-center">
                <img
                  src={item.src}
                  alt={`${item.name} logo`}
                  className={`${item.className} w-auto opacity-40 grayscale`}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="mb-7 flex items-end justify-between">
            <h2 className="text-[34px] font-extrabold leading-none tracking-[-0.03em] text-[#25324b] sm:text-[44px] lg:text-[52px]">
              Explore by <span className="text-[#26a4ff]">category</span>
            </h2>
            <a className="hidden items-center gap-2 text-[15px] font-semibold text-[#4640de] md:flex" href="#">
              Show all jobs
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoriesData.map((item) => (
              <article
                key={item.name}
                className={`group rounded-none border px-5 py-6 sm:px-7 sm:py-8 transition ${
                  item.featured
                    ? 'border-[#4640de] bg-[#4640de] text-white'
                    : 'border-[#dce0ee] bg-transparent text-[#25324b] hover:border-[#4640de] hover:bg-[#4640de] hover:text-white'
                }`}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center">
                  <img
                    src={item.icon}
                    alt={`${item.name} icon`}
                    className={`h-7 w-7 object-contain transition ${
                      item.featured ? 'brightness-0 invert' : 'group-hover:brightness-0 group-hover:invert'
                    }`}
                  />
                </div>
                <h3 className="mt-6 text-[24px] font-bold leading-none tracking-tight sm:mt-8 sm:text-[30px]">{item.name}</h3>
                <div className="mt-4 flex items-center justify-between text-[14px] sm:mt-5 sm:text-[16px]">
                  <span className={item.featured ? 'text-white/90' : 'text-[#6e7390] group-hover:text-white/90'}>{item.jobs} jobs available</span>
                  <ArrowRight size={16} />
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container>
          <div
            className="relative overflow-hidden bg-[#4640de] px-5 py-8 text-white sm:px-8 sm:py-10 md:px-14 md:py-14"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 82%, 90% 100%, 0 100%, 0 18%)' }}
          >
            <div className="grid gap-8 md:grid-cols-[0.9fr,1.1fr]">
              <div>
                <h3 className="text-[34px] font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-[44px] lg:text-[56px]">Start posting jobs today</h3>
                <p className="mt-4 text-[16px] text-white/85 sm:mt-5 sm:text-[18px]">Start posting jobs for only $10.</p>
                <button className="mt-8 h-11 bg-white px-7 text-[14px] font-semibold text-[#3c3ac9]">Sign Up For Free</button>
              </div>
              <div className="relative h-[220px] overflow-hidden bg-white/10 sm:h-[250px] md:h-[280px]">
                <img
                  src="/assets/cta-dashboard-company.svg"
                  alt="Dashboard preview"
                  className="h-full w-full object-cover object-[50%_52%]"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="mb-7 flex items-end justify-between">
            <h2 className="text-[34px] font-extrabold leading-none tracking-[-0.03em] text-[#25324b] sm:text-[44px] lg:text-[52px]">
              Featured <span className="text-[#26a4ff]">jobs</span>
            </h2>
            <a className="hidden items-center gap-2 text-[15px] font-semibold text-[#4640de] md:flex" href="#">
              Show all jobs
              <ArrowRight size={16} />
            </a>
          </div>

          {loading ? <p className="text-[16px] text-[#79809a]">Loading featured jobs...</p> : null}

          {!loading && featuredJobs.length === 0 ? (
            <p className="text-[16px] text-[#79809a]">No featured jobs available right now.</p>
          ) : null}

          {!loading && featuredJobs.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredJobs.map((job) => (
                <Link
                  to={`/jobs/${job._id}`}
                  key={job._id}
                  className="border border-[#dce0ee] bg-[#f8f9fc] p-6 transition hover:border-[#4640de]"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#eef1ff] text-sm font-bold text-[#4640de]">
                      {getShortLabel(job.company)}
                    </span>
                    <span className="border border-[#4640de] px-2 py-1 text-[12px] font-medium text-[#4640de]">Full Time</span>
                  </div>
                  <h3 className="mt-5 text-[20px] font-bold leading-none text-[#25324b] sm:text-[22px]">{job.title}</h3>
                  <p className="mt-2 text-[15px] text-[#68708c]">
                    {job.company} • {job.location}
                  </p>
                  <p className="mt-4 text-[14px] leading-6 text-[#9499ad]">{job.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#effaf5] px-3 py-1 text-[12px] text-[#2fca8f]">Design</span>
                    <span className="rounded-full bg-[#fff9eb] px-3 py-1 text-[12px] text-[#f0a800]">Marketing</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#f1f2fa] py-12 sm:py-16">
        <Container>
          <div className="mb-7 flex items-end justify-between">
            <h2 className="text-[34px] font-extrabold leading-none tracking-[-0.03em] text-[#25324b] sm:text-[44px] lg:text-[52px]">
              Latest <span className="text-[#26a4ff]">jobs open</span>
            </h2>
            <a className="hidden items-center gap-2 text-[15px] font-semibold text-[#4640de] md:flex" href="#">
              Show all jobs
              <ArrowRight size={16} />
            </a>
          </div>

          {loading ? <p className="text-[16px] text-[#79809a]">Loading latest jobs...</p> : null}

          {!loading && latestJobs.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {latestJobs.map((job) => (
                <Link
                  key={job._id}
                  to={`/jobs/${job._id}`}
                  className="flex items-start gap-4 bg-white p-5 transition hover:shadow-[0_14px_30px_rgba(49,56,95,0.08)]"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef1ff] text-sm font-bold text-[#4640de]">
                    {getShortLabel(job.company)}
                  </span>
                  <div>
                    <h3 className="text-[21px] font-bold leading-none text-[#25324b] sm:text-[24px]">{job.title}</h3>
                    <p className="mt-1 text-[15px] text-[#7f859d]">
                      {job.company} • {job.location} • {formatDate(job.createdAt)}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#effaf5] px-3 py-1 text-[12px] text-[#2fca8f]">Full-Time</span>
                      <span className="rounded-full bg-[#fff9eb] px-3 py-1 text-[12px] text-[#f0a800]">Marketing</span>
                      <span className="rounded-full border border-[#514ada] px-3 py-1 text-[12px] text-[#514ada]">Design</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <Footer />
    </div>
  );
}
