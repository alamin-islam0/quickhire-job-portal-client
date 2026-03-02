import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900" data-theme="quickhire">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
