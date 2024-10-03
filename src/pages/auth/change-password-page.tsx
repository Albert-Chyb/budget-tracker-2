import ChangePasswordForm from '@/components/auth/change-password-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useChangePasswordMutation } from '@/lib/auth/change-password';
import { ChangePasswordFormValue } from '@/lib/form-resolvers/change-password-form';

export default function ChangePasswordPage() {
  const { mutate: changePassword, isPending } = useChangePasswordMutation();

  function handlePasswordChange(value: ChangePasswordFormValue) {
    changePassword({ password: value.password });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zmień hasło</CardTitle>
        <CardDescription>
          Wypełnij poniższe pola, aby zmienić hasło do swojego konta.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChangePasswordForm
          onPasswordChange={handlePasswordChange}
          isLoading={isPending}
        />
      </CardContent>
    </Card>
  );
}
