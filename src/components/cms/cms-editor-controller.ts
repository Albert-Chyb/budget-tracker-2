import { useSessionStorage } from '@uidotdev/usehooks';
import { useCallback, useMemo } from 'react';

export function useCMSEditorController() {
  const [current, setCurrent] = useSessionStorage('opened-editor', '');

  const open = useCallback(
    (id: string) => {
      setCurrent(id);
    },
    [setCurrent]
  );

  const close = useCallback(() => {
    setCurrent('');
  }, [setCurrent]);

  const controller = useMemo(
    () => ({
      open,
      close,
      current,
    }),
    [close, current, open]
  );

  return controller;
}
