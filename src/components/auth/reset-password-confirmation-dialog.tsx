import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ResetPasswordConfirmationDialog({
  isOpened,
  onOpenChange,
}: ResetPasswordConfirmationDialogProps) {
  return (
    <Dialog open={isOpened} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sprawdź swoją skrzynkę e-mail</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Na podany adres email została wysłana wiadomość umożliwiająca
          odzyskanie hasła. Sprawdź swoją skrzynkę pocztową oraz postępuj
          zgodnie z instrukcjami zawartymi w wiadomości.
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Zamknij
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export interface ResetPasswordConfirmationDialogProps {
  isOpened: boolean;
  onOpenChange: (open: boolean) => void;
}
