import { PropsWithChildren, ReactElement, useContext } from 'react';
import { CMSContext } from './cms-context';
import { useCMSEditorOpenState } from './cms-editor-open-state';
import CMSMobileEditorTrigger from './mobile/cms-mobile-editor-trigger';

export default function CMSEditorTrigger(props: CMSEditorTriggerProps) {
  const { isMobile, isSubmitting } = useContext(CMSContext);
  const [isOpened, setIsOpened] = useCMSEditorOpenState(props.id);

  function handleOpenChange(open: boolean) {
    if (isSubmitting && !open) {
      // Do not change the open state when the editor wants to close itself during a form submission.
      return;
    }

    setIsOpened(open);
  }

  return isMobile ? (
    <CMSMobileEditorTrigger
      {...props}
      isOpened={isOpened}
      handleOpenChange={handleOpenChange}
      dismissible={!isSubmitting}
    />
  ) : (
    ''
  );
}

export type CMSEditorTriggerProps = PropsWithChildren<{
  title: string;
  description: string;
  content: ReactElement;
  id: string;
}>;
