import { PropsWithChildren, ReactElement, useContext } from 'react';
import { CMSContext } from './cms-context';
import CMSMobileEditorTrigger from './mobile/cms-mobile-editor-trigger';

export default function CMSEditorTrigger(props: CMSEditorTriggerProps) {
  const { isMobile } = useContext(CMSContext);

  return isMobile ? <CMSMobileEditorTrigger {...props} /> : '';
}

export type CMSEditorTriggerProps = PropsWithChildren<{
  title: string;
  description: string;
  editorContentElement: ReactElement;
  id: string;
}>;
