import { ReactElement, ReactNode, useContext } from 'react';
import { CMSContext } from './cms-context';
import { useCMSEditorOpenState } from './cms-editor-open-state';
import { DesktopEditor } from './desktop/editor';
import MobileEditor from './mobile/editor';

export function Editor(props: EditorProps) {
  const { isDismissible } = props;

  const { isMobile } = useContext(CMSContext);
  const [isOpened, setIsOpened] = useCMSEditorOpenState(props.id);

  function handleOpenChange(open: boolean) {
    if (!isDismissible && !open) {
      // Do not change the open state when the editor wants to close itself during a form submission.
      return;
    }

    setIsOpened(open);
  }

  const childProps: ChildEditorProps = {
    ...props,
    isOpened: isOpened,
    handleOpenChange: handleOpenChange,
    dismissible: isDismissible,
  };

  return isMobile ? (
    <MobileEditor {...childProps} />
  ) : (
    <DesktopEditor {...childProps} />
  );
}

export type EditorProps = {
  title: ReactNode;
  description: ReactNode;
  trigger: ReactElement;
  content: ReactNode;
  id: string;
  isDismissible: boolean;
  tooltip: string;
};

export type ChildEditorProps = EditorProps & {
  isOpened: boolean;
  handleOpenChange: (open: boolean) => void;
  dismissible: boolean;
};
