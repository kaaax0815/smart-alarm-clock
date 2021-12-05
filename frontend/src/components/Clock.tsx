import React, { useEffect } from 'react';

export default function Clock({
  className,
  locale,
  timeZone
}: {
  className: string;
  locale?: string;
  timeZone?: string;
}): JSX.Element {
  const clock = React.useRef<HTMLParagraphElement>(null);
  const fToRun = () => new window.Date().toLocaleTimeString(locale, { timeZone });
  useEffect(() => {
    if (clock.current !== null) {
      clock.current.innerHTML = fToRun();
      const interval = setInterval(() => {
        clock.current!.innerHTML = fToRun();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [clock]);
  return <p ref={clock} className={className}></p>;
}
