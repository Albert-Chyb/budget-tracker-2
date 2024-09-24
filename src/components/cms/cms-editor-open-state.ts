import { useCMSEditorController } from './cms-editor-controller';

export function useCMSEditorOpenState(id: string) {
  const { open, close, current } = useCMSEditorController();

  function handleOpenChange(isOpened: boolean) {
    if (isOpened) {
      open(id);
    } else {
      close();
    }
  }

  const isOpened: boolean = current === id;

  return [isOpened, handleOpenChange] as const;
}
