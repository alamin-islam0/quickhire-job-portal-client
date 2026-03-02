import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import JobsList from '../pages/JobsList';
import JobDetails from '../pages/JobDetails';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <JobsList /> },
      { path: 'jobs/:id', element: <JobDetails /> },
      { path: 'admin', element: <Admin /> },
    ],
  },
]);

export default router;
