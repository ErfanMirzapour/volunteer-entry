'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import {
   LOCAL_STORAGE_KEY as PI_KEY,
   formSchema as piSchema,
} from './PersonalInfo';
import { LOCAL_STORAGE_KEY as SKILLS_KEY } from './Skills';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
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
   const [success, setSuccess] = useState(false);
   const [serverError, setServerError] = useState(false);
   const [submitted, setSubmitted] = useState(false);

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

   const submit = async () => {
      setSubmitted(true);
      try {
         const response = await fetch('https://task.chapar.co/api/volunteers', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               ...personalInfo,
               fullName: undefined,
               full_name: personalInfo.fullName,
               skills,
            }),
         });

         if (response.status === 201) {
            localStorage.removeItem(PI_KEY);
            localStorage.removeItem(SKILLS_KEY);
            setSuccess(true);
         } else {
            setServerError(true);
         }
      } catch {
         setServerError(true);
      }
   };

   return (
      <div>
         <Alert
            className={cn('mb-4', {
               hidden: !submitted || (!success && !serverError),
            })}
            variant={success ? 'default' : 'destructive'}
         >
            <AlertTitle>{success ? 'Success!' : 'Oops!'}</AlertTitle>
            <AlertDescription>
               {success
                  ? 'New volunteer has been added.'
                  : 'Review your data or try again later.'}
            </AlertDescription>
         </Alert>

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
            <Button type='button' onClick={submit} disabled={submitted}>
               Submit
            </Button>
         </div>
      </div>
   );
}
