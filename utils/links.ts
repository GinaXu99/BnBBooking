type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/favorites', label: 'favorites' },
  { href: '/bookings', label: 'bookings' },
  { href: '/reservations', label: 'reservations' },
  { href: '/rentals/create', label: 'create' },
  { href: '/rentals', label: 'rentals' },
  { href: '/admin', label: 'admin' },
  { href: '/profile', label: 'profile' },
];
