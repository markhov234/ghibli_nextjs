// components/Navbar.tsx
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/movies">
            Movies
          </Link>
        </li>
        <li>
          <Link href="/peoples">
            Peoples
          </Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
