import { useEffect, type RefObject } from 'react';

const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) => {
  useEffect(
    () => {
      const listener: (this: Document, ev: MouseEvent | TouchEvent) => any = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },

    [ref, handler]
  );
}

export default useOnClickOutside;
