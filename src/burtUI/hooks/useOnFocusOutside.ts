import { useEffect, type RefObject } from 'react';

const useOnFocusOutside = (ref: RefObject<HTMLElement>, handler: (event: FocusEvent) => void) => {
  useEffect(
    () => {
      const listener: (this: Document, ev: FocusEvent) => any = (event) => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("focusin", listener);
      return () => {
        document.removeEventListener("focusin", listener);
      };
    },

    [ref, handler]
  );
}

export default useOnFocusOutside;
