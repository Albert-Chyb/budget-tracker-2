import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

export default function SignOutAlertDialog({
  onConfirm,
}: SignOutAlertDialogProps) {
  function handleAction() {
    onConfirm();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost'>Wyloguj się</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogTitle>Czy na pewno chcesz się wylogować?</AlertDialogTitle>

        <AlertDialogDescription>
          Jeśli jesteś pewien, że chcesz się wylogować, kliknij przycisk
          poniżej.
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel>Nie wylogowuj</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>Wyloguj</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export interface SignOutAlertDialogProps {
  onConfirm: () => void;
}
