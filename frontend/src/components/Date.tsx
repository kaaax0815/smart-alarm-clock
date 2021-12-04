import React, { useEffect } from 'react';

export default function Date({
  className,
  locale
}: {
  className: string;
  locale?: string;
}): JSX.Element {
  const dateRef = React.useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (dateRef.current !== null) {
      dateRef.current.innerHTML = new window.Date().toLocaleDateString(locale);
      const interval = setInterval(() => {
        dateRef.current!.innerHTML = new window.Date().toLocaleDateString(locale);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [dateRef]);
  return <p ref={dateRef} className={className}></p>;
}
