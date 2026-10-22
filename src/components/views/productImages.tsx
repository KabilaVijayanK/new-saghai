import React, { useState } from 'react';
import { PRODUCT_CATEGORIES } from '../../data/companyData';

export const FALLBACK_IMG = '/images/hero_fabrication_facility_1791778010795.jpg';

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number] & { images?: string[] };

/** Returns the category's public images, or one valid facility image as a fallback. */
export const getCategoryImages = (cat: ProductCategory): string[] =>
  cat.images && cat.images.length > 0
    ? cat.images
    : [FALLBACK_IMG];

interface SafeImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export const SafeImg: React.FC<SafeImgProps> = ({ src, alt = '', onError, ...rest }) => {
  const [failed, setFailed] = useState(false);
  return (
    <img
      {...rest}
      src={failed ? FALLBACK_IMG : src}
      alt={alt}
      loading={rest.loading ?? 'lazy'}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
};