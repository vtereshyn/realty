import { useEffect, RefObject } from 'react';

const useOnClickOutside = (
  ref: RefObject<Node | null>,
  handler: (e: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    function listener(e: MouseEvent | TouchEvent) {
      if (
        !ref.current ||
        (e.target instanceof Node && ref.current.contains(e.target))
      ) {
        return;
      }

      handler(e);
    }

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
