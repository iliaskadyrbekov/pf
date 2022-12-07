import React from 'react';

export function useHover() {
  const [value, setValue] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  React.useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);
        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
      return;
    },
    [ref.current], // Recall only if ref changes
  );
  return [ref, value];
}
