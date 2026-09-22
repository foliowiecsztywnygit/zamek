import { ImgHTMLAttributes, SyntheticEvent, useCallback } from 'react';

type AppImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export function AppImage({ fallbackSrc = '/images/placeholders/landscape.svg', onError, ...props }: AppImageProps) {
  const handleError = useCallback(
    (e: SyntheticEvent<HTMLImageElement, Event>) => {
      if (fallbackSrc) {
        const img = e.currentTarget;
        if (img.dataset.fallbackApplied !== 'true') {
          img.dataset.fallbackApplied = 'true';
          img.removeAttribute('srcset');
          img.src = fallbackSrc;
        }
      }
      onError?.(e);
    },
    [fallbackSrc, onError]
  );

  return <img {...props} onError={handleError} />;
}
