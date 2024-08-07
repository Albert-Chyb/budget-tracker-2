import ChangePasswordForm from '@/components/auth/change-password-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { changePassword } from '@/lib/auth/change-password';
import { ChangePasswordFormValue } from '@/lib/form-resolvers/change-password-form';
import { useState } from 'react';

export default function ChangePasswordPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handlePasswordChange(value: ChangePasswordFormValue) {
    setIsLoading(true);

    await changePassword(value.password);

    setIsLoading(false);
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
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
