import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { faShoppingCart, faUtensils, faCreditCard } from '@fortawesome/free-solid-svg-icons';
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
            href="/"
            className={`block w-full text-left px-3 py-2 rounded transition
              ${pathname === '/' 
                ? 'bg-white text-[#7e57c2] shadow font-bold' 
                : 'hover:bg-[#967dc2] hover:shadow-lg hover:shadow-black/20'}`}
          >
            <FontAwesomeIcon icon={faUtensils} className="mr-2" />
            Menu
          </Link>
          <Link
            href="/order-status"
            className={`block w-full text-left px-3 py-2 rounded transition
              ${pathname === '/order-status' 
                ? 'bg-white text-[#7e57c2] shadow font-bold' 
                : 'hover:bg-[#967dc2] hover:shadow-lg hover:shadow-black/20'}`}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            Order Status
          </Link>
          <Link
            href="/payment"
            className={`block w-full text-left px-3 py-2 rounded transition
              ${pathname === '/payment' 
                ? 'bg-white text-[#7e57c2] shadow font-bold' 
                : 'hover:bg-[#967dc2] hover:shadow-lg hover:shadow-black/20'}`}
          >
            <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
            Payment
          </Link>
        </nav>
      </div>
      <p className="text-sm text-purple-200">© 2025 OrderSync</p>
    </aside>
  );
}