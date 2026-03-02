import Input from '../ui/Input';

export default function JobsFilters({ filters, onChange, categories, locations }) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
      <Input
        label="Search"
        placeholder="Title or company"
        value={filters.search}
        onChange={(event) => onChange('search', event.target.value)}
      />

      <label className="form-control w-full">
        <span className="mb-1 text-sm font-medium text-slate-700">Category</span>
        <select
          className="select select-bordered h-11 w-full bg-white"
          value={filters.category}
          onChange={(event) => onChange('category', event.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="form-control w-full">
        <span className="mb-1 text-sm font-medium text-slate-700">Location</span>
        <select
          className="select select-bordered h-11 w-full bg-white"
          value={filters.location}
          onChange={(event) => onChange('location', event.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
