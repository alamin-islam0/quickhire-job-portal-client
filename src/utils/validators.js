const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidUrl = (value) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

export const validateApplyForm = (values) => {
  const errors = {};

  if (!values.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!values.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Email must be valid';
  }

  if (!values.resume_link?.trim()) {
    errors.resume_link = 'Resume link is required';
  } else if (!isValidUrl(values.resume_link)) {
    errors.resume_link = 'Resume link must be a valid URL';
  }

  if (!values.cover_note?.trim()) {
    errors.cover_note = 'Cover note is required';
  }

  return errors;
};

export const validateJobForm = (values) => {
  const errors = {};
  const requiredFields = ['title', 'company', 'location', 'category', 'description'];

  requiredFields.forEach((field) => {
    if (!values[field]?.trim()) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  return errors;
};
