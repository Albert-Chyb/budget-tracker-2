import { Drawer } from '@/components/ui/drawer';
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { To, useNavigate, useOutlet } from 'react-router-dom';

export function useDrawerWithOutlet(delay = 0, link: To) {
  const [isOpen, setIsOpen] = useState(false);
  const outlet = useOutlet();
  const navigate = useNavigate();
  const hasChildRoute = !!outlet;
  const timerIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setIsOpen(hasChildRoute);
  }, [hasChildRoute]);

  const handleClose = () => {
    clearTimeout(timerIdRef.current);

    timerIdRef.current = setTimeout(() => {
      navigate(link);
    }, delay);
  };

  useEffect(() => () => clearTimeout(timerIdRef.current), []);

  return {
    open: isOpen,
    onOpenChange: setIsOpen,
    onClose: handleClose,
  } satisfies ComponentPropsWithoutRef<typeof Drawer>;
}
