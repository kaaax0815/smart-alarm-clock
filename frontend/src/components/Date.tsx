import React, { useEffect } from 'react';

export default function Date({
  className,
  locale,
  timeZone
}: {
  className: string;
  locale?: string;
  timeZone?: string;
}): JSX.Element {
  const dateRef = React.useRef<HTMLParagraphElement>(null);
  const fToRun = () => new window.Date().toLocaleDateString(locale, { timeZone });
  useEffect(() => {
    if (dateRef.current !== null) {
      dateRef.current.innerHTML = fToRun();
      const interval = setInterval(() => {
        dateRef.current!.innerHTML = fToRun();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [dateRef]);
  return <p ref={dateRef} className={className}></p>;
}
