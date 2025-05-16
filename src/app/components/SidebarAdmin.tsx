import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { faTachometerAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';

const FontAwesomeIcon = dynamic(
  () => import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon),
  { ssr: false }
);

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#7e57c2] text-white p-6 flex flex-col justify-between min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-6">OrderSync</h1>
        <nav className="space-y-4">
          <Link
            href="/admin"
            className={`block w-full text-left px-3 py-2 rounded transition
              ${pathname === '/admin'
                ? 'bg-white text-[#7e57c2] shadow font-bold'
                : 'hover:bg-[#7e57c2] hover:shadow-lg hover:shadow-black/20'}`}
          >
            <FontAwesomeIcon icon={faUtensils} className="mr-2" />
            Manage Menu
          </Link>

          <Link
            href="/admin/dashboard"
            className={`block w-full text-left px-3 py-2 rounded transition
              ${pathname === '/admin/dashboard'
                ? 'bg-white text-[#7e57c2] shadow font-bold'
                : 'hover:bg-[#7e57c2] hover:shadow-lg hover:shadow-black/20'}`}
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
            Dashboard
          </Link>

        </nav>
      </div>
      <p className="text-sm text-purple-200">© 2025 OrderSync</p>
    </aside>
  );
}
