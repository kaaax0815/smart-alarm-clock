import React, { useEffect } from 'react';

export default function Clock({
  className,
  timeZone
}: {
  className: string;
  timeZone?: string;
}): JSX.Element {
  const clock = React.useRef<HTMLParagraphElement>(null);
  const fToRun = () => new window.Date().toLocaleTimeString('de', { timeZone });
  useEffect(() => {
    if (clock.current !== null) {
      clock.current.innerHTML = fToRun();
      const interval = setInterval(() => {
        clock.current!.innerHTML = fToRun();
      }, 1000);
      return () => clearInterval(interval);
    }
  });
  return <p ref={clock} className={className}></p>;
}
