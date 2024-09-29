import { Plus } from 'lucide-react';
import { JSXElementConstructor, ReactElement, useContext } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { CMSContext } from './cms-context';
import CMSEditorTrigger, { CMSEditorTriggerProps } from './cms-editor-trigger';
import { CMSDesktop } from './desktop/cms-desktop';
import { CMSMobile } from './mobile/cms-mobile';
import { CMSMobileItemProps } from './mobile/cms-mobile-item';

export default function CMS(props: CMSProps) {
  const { isMobile } = useContext(CMSContext);
  const { title, description, mobileItems, newItemEditor } = props;

  return (
    <Card>
      <div className='p-6 flex justify-between items-center gap-x-2'>
        <CardHeader className='p-0'>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <div className='shrink-0'>
          <CMSEditorTrigger {...newItemEditor}>
            <Button size='icon' variant='ghost'>
              <Plus className='size-6' />
            </Button>
          </CMSEditorTrigger>
        </div>
      </div>

      <CardContent>
        {isMobile ? <CMSMobile>{mobileItems}</CMSMobile> : <CMSDesktop />}
      </CardContent>
    </Card>
  );
}

export type CMSProps = {
  title: string;
  description: string;
  newItemEditor: CMSEditorTriggerProps;
  mobileItems: ReactElement<
    CMSMobileItemProps,
    JSXElementConstructor<CMSMobileItemProps>
  >[];
};
