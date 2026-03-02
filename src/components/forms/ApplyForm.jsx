import { useState } from 'react';
import toast from 'react-hot-toast';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import { applyToJob } from '../../services/applications.api';
import { validateApplyForm } from '../../utils/validators';

const initialValues = {
  name: '',
  email: '',
  resume_link: '',
  cover_note: '',
};

export default function ApplyForm({ jobId }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateApplyForm(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await applyToJob({ ...values, job_id: jobId });
      toast.success('Application submitted successfully');
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="Name"
        placeholder="Your full name"
        value={values.name}
        onChange={(event) => handleChange('name', event.target.value)}
        error={errors.name}
      />
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={(event) => handleChange('email', event.target.value)}
        error={errors.email}
      />
      <Input
        label="Resume Link"
        placeholder="https://..."
        value={values.resume_link}
        onChange={(event) => handleChange('resume_link', event.target.value)}
        error={errors.resume_link}
      />
      <Textarea
        label="Cover Note"
        rows={5}
        placeholder="Tell us why you're a strong fit."
        value={values.cover_note}
        onChange={(event) => handleChange('cover_note', event.target.value)}
        error={errors.cover_note}
      />
      <button className="btn btn-primary w-full" disabled={submitting} type="submit">
        {submitting ? 'Submitting...' : 'Apply Now'}
      </button>
    </form>
  );
}
