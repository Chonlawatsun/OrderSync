import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { faClipboardList, faChartBar, } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';

const FontAwesomeIcon = dynamic(
  () => import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon),
  { ssr: false }
);

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#7e57c2] text-white p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6">OrderSync</h1>
        <nav className="space-y-4">
          <Link
            href="/WaitStaff"
            className={`block w-full text-left px-3 py-2 rounded transition
              ${pathname === '/WaitStaff' 
                ? 'bg-white text-[#7e57c2] shadow font-bold' 
                : 'hover:bg-[#7e57c2] hover:shadow-lg hover:shadow-black/20'}`}
          >
            <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
            Order
          </Link>
          <Link
            href="/WaitStaff/Stock"
            className={`block w-full text-left px-3 py-2 rounded transition
              ${pathname === '/WaitStaff/Stock' 
                ? 'bg-white text-[#7e57c2] shadow font-bold' 
                : 'hover:bg-[#7e57c2] hover:shadow-lg hover:shadow-black/20'}`}
          >
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            Stock
          </Link>
        </nav>
      </div>
      <p className="text-sm text-purple-200">© 2025 OrderSync</p>
    </aside>
  );
}