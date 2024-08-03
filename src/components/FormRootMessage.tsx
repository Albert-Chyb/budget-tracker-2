import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useFormState } from 'react-hook-form';

export default function FormRootMessage() {
  const { errors } = useFormState();

  return (
    errors.root && (
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Błąd</AlertTitle>
        <AlertDescription>{errors.root.message}</AlertDescription>
      </Alert>
    )
  );
}
