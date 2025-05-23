'use client';

import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { Fragment } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
   const steps = [1, 2, 3];
   const params = useParams();
   const activeStep = Number(params?.step) || 1;

   return (
      <div className='max-w-md px-4 mx-auto'>
         <div className='flex items-center justify-center gap-4 py-6'>
            {steps.map((step, idx) => (
               <Fragment key={step}>
                  <div className='flex flex-col items-center'>
                     <div
                        className={cn(
                           'cursor-default w-14 h-14 flex items-center justify-center rounded-full text-xl font-medium',
                           {
                              'bg-gray-800 text-white ': step === activeStep,
                              'bg-white border-2 border-gray-500 text-gray-600':
                                 step !== activeStep,
                           }
                        )}
                     >
                        {/* {step !== activeStep ? (
                           <Link
                              href={`/add-volunteer/${step}`}
                              className='w-full h-full grid place-content-center'
                           >
                              {step}
                           </Link>
                        ) : (
                           step
                        )} */}
                        {step}
                     </div>
                  </div>
                  {idx < steps.length - 1 && (
                     <div className='flex-1 h-px bg-gray-400' />
                  )}
               </Fragment>
            ))}
         </div>
         {children}
      </div>
   );
}
