import React, { useEffect } from 'react';

export default function Date({
  className,
  timeZone
}: {
  className: string;
  timeZone?: string;
}): JSX.Element {
  const dateRef = React.useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (dateRef.current !== null) {
      const fToRun = () => new window.Date().toLocaleDateString('de', { timeZone });
      dateRef.current.innerHTML = fToRun();
      const interval = setInterval(() => {
        dateRef.current!.innerHTML = fToRun();
      }, 10000);
      return () => clearInterval(interval);
    }
  });
  return <p ref={dateRef} className={className}></p>;
}
