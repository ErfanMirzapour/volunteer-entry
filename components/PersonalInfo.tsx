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
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const LOCAL_STORAGE_KEY = 'personalInfo';

export const formSchema = z
   .object({
      fullName: z.string().min(2, {
         message: 'Full name must be at least 3 characters.',
      }),
      phone: z
         .string()
         .optional()
         .refine(val => !val || val.length >= 10, {
            message: 'Phone number must be at least 10 digits.',
         }),
      email: z
         .string()
         .optional()
         .refine(val => !val || z.string().email().safeParse(val).success, {
            message: 'Please enter a valid email address.',
         }),
      birthday: z
         .string()
         .min(1, {
            message: 'Please select your birthday.',
         })
         .refine(
            val => {
               if (!val) return false;
               const birthdayDate = new Date(val);
               const now = new Date();
               let age = now.getFullYear() - birthdayDate.getFullYear();
               const m = now.getMonth() - birthdayDate.getMonth();
               if (
                  m < 0 ||
                  (m === 0 && now.getDate() < birthdayDate.getDate())
               ) {
                  age--;
               }
               return age >= 18;
            },
            { message: 'You must be at least 18 years old.' }
         ),
   })
   .refine(data => data.phone || data.email, {
      message: 'At least phone or email must be provided.',
      path: ['phone'],
   });

export default function PersonalInfo() {
   const router = useRouter();

   // Load initial values from localStorage if available
   const getInitialValues = () => {
      if (typeof window === 'undefined')
         return {
            fullName: '',
            phone: '',
            email: '',
            birthday: '',
         };
      try {
         const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
         if (stored) {
            return JSON.parse(stored);
         }
      } catch {}
      return {
         fullName: '',
         phone: '',
         email: '',
         birthday: '',
      };
   };

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: getInitialValues(),
   });

   // Persist form values to localStorage on change
   useEffect(() => {
      const subscription = form.watch(values => {
         try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
         } catch {}
      });
      return () => subscription.unsubscribe();
   }, [form]);

   function onSubmit(values: z.infer<typeof formSchema>) {
      // Handle form submission
      console.log(values);
      router.push('/add-volunteer/2');
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
               control={form.control}
               name='fullName'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Full Name</FormLabel>
                     <FormControl>
                        <Input placeholder='Enter your full name' {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name='phone'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Phone Number</FormLabel>
                     <FormControl>
                        <Input
                           placeholder='Enter your phone number'
                           type='tel'
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name='email'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input
                           placeholder='Enter your email'
                           type='email'
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name='birthday'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Birthday</FormLabel>
                     <FormControl>
                        <Input type='date' {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button type='submit' className='w-full'>
               Next
            </Button>
         </form>
      </Form>
   );
}
