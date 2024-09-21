import { useMediaQuery } from '@uidotdev/usehooks';
import { PropsWithChildren, ReactElement } from 'react';
import CMSMobileEditorTrigger from './cms-mobile-editor-trigger';

export default function CMSEditorTrigger(props: CMSEditorTriggerProps) {
  const { title, description, editElement, children } = props;

  // TODO: Create context for CMS component and put this information in it.
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? (
    <CMSMobileEditorTrigger
      title={title}
      description={description}
      editElement={editElement}
    >
      {children}
    </CMSMobileEditorTrigger>
  ) : (
    ''
  );
}

export type CMSEditorTriggerProps = PropsWithChildren<{
  title: string;
  description: string;
  editElement: ReactElement;
}>;
