import { useCallback } from 'react';
import { useCMSEditorController } from './cms-editor-controller';

export function useCMSEditorOpenState(id: string) {
  const { open, close, current } = useCMSEditorController();

  const handleOpenChange = useCallback(
    (isOpened: boolean) => {
      if (isOpened) {
        open(id);
      } else {
        close();
      }
    },
    [close, id, open]
  );

  const isOpened: boolean = current === id;

  return [isOpened, handleOpenChange] as const;
}
