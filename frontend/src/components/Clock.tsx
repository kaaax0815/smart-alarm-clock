import React, { useEffect } from 'react';

export default function Clock({
  className,
  locale
}: {
  className: string;
  locale?: string;
}): JSX.Element {
  const clock = React.useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (clock.current !== null) {
      clock.current.innerHTML = new window.Date().toLocaleTimeString(locale);
      const interval = setInterval(() => {
        clock.current!.innerHTML = new window.Date().toLocaleTimeString(locale);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [clock]);
  return <p ref={clock} className={className}></p>;
}
