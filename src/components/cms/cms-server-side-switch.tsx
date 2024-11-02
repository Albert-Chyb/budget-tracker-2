import { ComponentPropsWithoutRef, useId } from 'react';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

export const CMSServerSideSwitch = (props: CMSServerSideSwitchProps) => {
  const id = useId();

  return (
    <>
      <Label htmlFor={id}>Przetwarzanie na serwerze</Label>

      <Switch {...props} id={id} />
    </>
  );
};

export type CMSServerSideSwitchProps = Omit<
  ComponentPropsWithoutRef<typeof Switch>,
  'id'
>;
