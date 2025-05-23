'use client';

import PersonalInfo from '@/components/PersonalInfo';
import Skills from '@/components/Skills';
import { useParams } from 'next/navigation';

export default function AddVolunteer() {
   const params = useParams();

   return (
      <div className='max-w-md mx-auto'>
         {params?.step === '1' && <PersonalInfo />}
         {params?.step === '2' && <Skills />}
      </div>
   );
}
