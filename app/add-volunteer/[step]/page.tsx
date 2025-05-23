'use client';

import PersonalInfo from '@/components/PersonalInfo';
import { useParams } from 'next/navigation';

export default function AddVolunteer() {
   const params = useParams();

   return (
      <div className='max-w-md mx-auto'>
         {params?.step === '1' && <PersonalInfo />}
      </div>
   );
}
