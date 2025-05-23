'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import {
   LOCAL_STORAGE_KEY as PI_KEY,
   formSchema as piSchema,
} from './PersonalInfo';
import { LOCAL_STORAGE_KEY as SKILLS_KEY } from './Skills';
import { Card, CardContent } from './ui/card';

export default function Confirmation() {
   const router = useRouter();
   const [personalInfo, setPersonalInfo] = useState<z.infer<typeof piSchema>>({
      fullName: '',
      phone: '',
      email: '',
      birthday: '',
   });
   const [skills, setSkills] = useState<string[]>([]);

   useEffect(() => {
      if (typeof window !== 'undefined') {
         try {
            const info = localStorage.getItem(PI_KEY);
            setPersonalInfo(info ? JSON.parse(info) : null);
         } catch {
            setPersonalInfo(null);
         }
         try {
            const skillsData = localStorage.getItem(SKILLS_KEY);
            setSkills(skillsData ? JSON.parse(skillsData) : []);
         } catch {
            setSkills([]);
         }
      }
   }, []);

   const submit = () => {
      //
      router.push('/add-volunteer/3');
   };

   return (
      <div>
         <Card>
            <CardContent>
               <h2 className='font-bold mb-2 text-xl'>Personal Information</h2>
               <ul className='mb-4'>
                  <li>
                     <b>Full Name:</b> {personalInfo.fullName}
                  </li>
                  <li>
                     <b>Phone:</b> {personalInfo.phone || '-'}
                  </li>
                  <li>
                     <b>Email:</b> {personalInfo.email || '-'}
                  </li>
                  <li>
                     <b>Birthday:</b> {personalInfo.birthday || '-'}
                  </li>
               </ul>
               <hr className='mb-4' />
               <h2 className='font-bold mb-2 text-xl'>Skills</h2>
               <ul>
                  {skills.length ? (
                     skills.map(skill => <li key={skill}>• {skill}</li>)
                  ) : (
                     <li>-</li>
                  )}
               </ul>
            </CardContent>
         </Card>
         <div className='flex justify-end gap-4 mt-4'>
            <Button
               type='button'
               variant='outline'
               onClick={() => router.push('/add-volunteer/2')}
            >
               Back
            </Button>
            <Button type='button' onClick={submit}>
               Submit
            </Button>
         </div>
      </div>
   );
}
