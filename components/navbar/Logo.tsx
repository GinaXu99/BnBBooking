import { Button } from '../ui/button';
import { GiMushroomHouse } from 'react-icons/gi';
import Link from 'next/link';
export default function Logo() {
  return (
    <Button size='icon' asChild>
      <Link href='/'>
        <GiMushroomHouse className='w-8 h-8'></GiMushroomHouse>
      </Link>
    </Button>
  );
}
