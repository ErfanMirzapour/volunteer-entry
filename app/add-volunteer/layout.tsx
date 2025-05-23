'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Fragment } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
   const steps = [1, 2, 3];
   const params = useParams();
   const activeStep = Number(params?.step) || 1;

   return (
      <div className='max-w-screen-md mx-auto'>
         <div className='flex items-center justify-center gap-8 py-6'>
            {steps.map((step, idx) => (
               <Fragment key={step}>
                  <div className='flex flex-col items-center'>
                     <div
                        className={classNames(
                           'w-12 h-12 flex items-center justify-center rounded-full text-xl font-medium',
                           {
                              'bg-blue-600 text-white cursor-default':
                                 step === activeStep,
                              'bg-white border-2 border-blue-300 text-blue-600':
                                 step !== activeStep,
                           }
                        )}
                     >
                        {step !== activeStep ? (
                           <Link
                              href={`/add-volunteer/${step}`}
                              className='w-full h-full grid place-content-center'
                           >
                              {step}
                           </Link>
                        ) : (
                           step
                        )}
                     </div>
                  </div>
                  {idx < steps.length - 1 && (
                     <div className='flex-1 h-px bg-blue-300' />
                  )}
               </Fragment>
            ))}
         </div>
         {children}
      </div>
   );
}
