import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';

export default function NotFound() {
  return (
    <Container>
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-4xl font-bold text-slate-900">404</h1>
        <p className="mt-2 text-sm text-slate-600">The page you requested could not be found.</p>
        <Link to="/" className="btn btn-primary mt-5">
          Back to Jobs
        </Link>
      </div>
    </Container>
  );
}
