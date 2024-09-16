import { Drawer } from '@/components/ui/drawer';
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { To, useMatch, useNavigate, useOutlet } from 'react-router-dom';

export function useDrawerWithOutlet(delay = 0, link: To) {
  const outlet = useOutlet();
  const hasChildRoute = !!outlet;
  const [isOpen, setIsOpen] = useState(hasChildRoute);
  const navigate = useNavigate();
  const timerIdRef = useRef<NodeJS.Timeout>();
  const isOnCmsPage = useMatch(<string>link);

  useEffect(() => {
    setIsOpen(hasChildRoute);
  }, [hasChildRoute]);

  const handleClose = () => {
    clearTimeout(timerIdRef.current);

    if (!isOnCmsPage) {
      timerIdRef.current = setTimeout(() => {
        navigate(link);
      }, delay);
    }
  };

  useEffect(() => () => clearTimeout(timerIdRef.current), []);

  return {
    open: isOpen,
    onOpenChange: setIsOpen,
    onClose: handleClose,
  } satisfies ComponentPropsWithoutRef<typeof Drawer>;
}
