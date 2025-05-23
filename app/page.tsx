import Link from 'next/link';

export default function Home() {
   return (
      <div className='flex items-center justify-center min-h-screen'>
         <Link
            href='/add-volunteer/1'
            className='rounded-full bg-blue-600 text-white p-4 '
         >
            Add New Volunteer
         </Link>
      </div>
   );
}
