import { PropsWithChildren, ReactElement, useContext } from 'react';
import { CMSContext } from './cms-context';
import { useCMSEditorOpenState } from './cms-editor-open-state';
import { CMSDesktopEditorTrigger } from './desktop/cms-desktop-editor-trigger';
import CMSMobileEditorTrigger from './mobile/cms-mobile-editor-trigger';

export default function CMSEditorTrigger(props: CMSEditorTriggerProps) {
  const { isMobile, isDismissible } = useContext(CMSContext);
  const [isOpened, setIsOpened] = useCMSEditorOpenState(props.id);

  function handleOpenChange(open: boolean) {
    if (!isDismissible && !open) {
      // Do not change the open state when the editor wants to close itself during a form submission.
      return;
    }

    setIsOpened(open);
  }

  const childProps: CMSChildEditorTriggerProps = {
    ...props,
    isOpened: isOpened,
    handleOpenChange: handleOpenChange,
    dismissible: isDismissible,
  };

  return isMobile ? (
    <CMSMobileEditorTrigger {...childProps} />
  ) : (
    <CMSDesktopEditorTrigger {...childProps} />
  );
}

export type CMSEditorTriggerProps = PropsWithChildren<{
  title: string;
  description: string;
  content: ReactElement;
  id: string;
}>;

export type CMSChildEditorTriggerProps = CMSEditorTriggerProps & {
  isOpened: boolean;
  handleOpenChange: (open: boolean) => void;
  dismissible: boolean;
};
