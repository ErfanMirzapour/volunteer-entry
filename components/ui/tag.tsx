import { X } from 'lucide-react';
import { Button } from './button';

export default function Tag({
   onDelete,
   children,
   ...props
}: React.ComponentProps<'div'> & { onDelete: () => void }) {
   return (
      <div
         className='rounded-md bg-gray-200 pl-2 pr-1 py-1 flex items-center'
         {...props}
      >
         <span className='bold text-xl mb-1'>{children}</span>
         <Button
            onClick={onDelete}
            type='button'
            size='icon'
            variant='link'
            className='w-6 h-6'
            aria-label='Delete'
         >
            <X />
         </Button>
      </div>
   );
}
