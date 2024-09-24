import { useMediaQuery } from '@uidotdev/usehooks';
import { PropsWithChildren, ReactElement } from 'react';
import CMSMobileEditorTrigger from './mobile/cms-mobile-editor-trigger';

export default function CMSEditorTrigger(props: CMSEditorTriggerProps) {
  // TODO: Create context for CMS component and put this information in it.
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <CMSMobileEditorTrigger {...props} /> : '';
}

export type CMSEditorTriggerProps = PropsWithChildren<{
  title: string;
  description: string;
  editorContentElement: ReactElement;
}>;
