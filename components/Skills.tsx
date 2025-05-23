'use client';

import { Button } from '@/components/ui/button';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Tag from './ui/tag';

export const LOCAL_STORAGE_KEY = 'skills';

const schema = z.object({ skill: z.string() });

export default function PersonalInfo() {
   const router = useRouter();
   const [skills, setSkills] = useState<string[]>(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')
   );
   const [showError, setShowError] = useState(false);

   const form = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
         skill: '',
      },
   });

   // Persist skills to localStorage on change
   useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(skills));

      if (skills.length) setShowError(false);
   }, [skills]);

   function onSubmit(values: z.infer<typeof schema>) {
      const { skill } = values;
      if (skills.includes(skill)) return;
      setSkills(skills => [...skills, skill]);
      form.reset({ skill: '' });
   }

   const next = () => {
      if (!skills.length) {
         setShowError(true);
         return;
      }
      router.push('/add-volunteer/3');
   };
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
               control={form.control}
               name='skill'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Skills</FormLabel>
                     <FormControl>
                        <Input
                           placeholder='Enter your skills and hit enter'
                           {...field}
                        />
                     </FormControl>
                     <FormMessage className={cn({ hidden: !showError })}>
                        You have to enter at least one skill!
                     </FormMessage>
                  </FormItem>
               )}
            />

            <div className='flex gap-2 mt-4 flex-wrap'>
               {skills.map(skill => (
                  <Tag
                     key={skill}
                     onDelete={() => {
                        setSkills(skills => skills.filter(s => s !== skill));
                     }}
                  >
                     {skill}
                  </Tag>
               ))}
            </div>
         </form>
         <div className='flex justify-end gap-4 mt-4'>
            <Button
               type='button'
               variant='outline'
               onClick={() => router.push('/add-volunteer/1')}
            >
               Back
            </Button>
            <Button type='button' onClick={next}>
               Next
            </Button>
         </div>
      </Form>
   );
}
