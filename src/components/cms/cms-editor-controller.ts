import { useSessionStorage } from '@uidotdev/usehooks';

export function useCMSEditorController() {
  const [current, setCurrent] = useSessionStorage('opened-editor', '');

  const open = (id: string) => {
    setCurrent(id);
  };

  const close = () => {
    setCurrent('');
  };

  return {
    open,
    close,
    current,
  };
}
