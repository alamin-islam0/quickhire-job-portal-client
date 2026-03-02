import { useState } from 'react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import { validateJobForm } from '../../utils/validators';

const initialValues = {
  title: '',
  company: '',
  location: '',
  category: '',
  description: '',
};

export default function AdminJobForm({ onSubmit, submitting }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateJobForm(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const isSuccess = await onSubmit(values);
    if (isSuccess) {
      setValues(initialValues);
      setErrors({});
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="Job Title"
        value={values.title}
        onChange={(event) => handleChange('title', event.target.value)}
        error={errors.title}
        className="!border-2 !border-[#dddde9] !bg-white !text-[#25324b] hover:!border-[#4640DE] focus:!border-[#4640DE] focus:!outline-none"
      />
      <Input
        label="Company"
        value={values.company}
        onChange={(event) => handleChange('company', event.target.value)}
        error={errors.company}
        className="!border-2 !border-[#dddde9] !bg-white !text-[#25324b] hover:!border-[#4640DE] focus:!border-[#4640DE] focus:!outline-none"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Location"
          value={values.location}
          onChange={(event) => handleChange('location', event.target.value)}
          error={errors.location}
          className="!border-2 !border-[#dddde9] !bg-white !text-[#25324b] hover:!border-[#4640DE] focus:!border-[#4640DE] focus:!outline-none"
        />
        <Input
          label="Category"
          value={values.category}
          onChange={(event) => handleChange('category', event.target.value)}
          error={errors.category}
          className="!border-2 !border-[#dddde9] !bg-white !text-[#25324b] hover:!border-[#4640DE] focus:!border-[#4640DE] focus:!outline-none"
        />
      </div>
      <Textarea
        label="Description"
        rows={5}
        value={values.description}
        onChange={(event) => handleChange('description', event.target.value)}
        error={errors.description}
        className="!border-2 !border-[#dddde9] !bg-white !text-[#25324b] hover:!border-[#4640DE] focus:!border-[#4640DE] focus:!outline-none"
      />
      <button
        type="submit"
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#4640de] px-5 text-sm font-semibold text-white transition hover:bg-[#3832ca] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={submitting}
      >
        {submitting ? 'Adding...' : 'Add Job'}
      </button>
    </form>
  );
}
