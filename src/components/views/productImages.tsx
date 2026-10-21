import React, { useState } from 'react';
import { PRODUCT_CATEGORIES } from '../../data/companyData';

export const FALLBACK_IMG = '/images/hero_fabrication_facility_1791778010795.jpg';

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number] & { images?: string[] };

/**
 * Images come from the /public folder.
 * 1) Best: add an `images: ['/images/products/xxx-1.jpg', ...]` array to each category in companyData.
 * 2) Otherwise this falls back to the naming convention:
 *      /public/images/products/<category-id>-1.jpg
 *      /public/images/products/<category-id>-2.jpg
 *      /public/images/products/<category-id>-3.jpg
 *    Any missing file automatically shows the facility photo instead of a broken image.
 */
export const getCategoryImages = (cat: ProductCategory): string[] =>
  cat.images && cat.images.length > 0
    ? cat.images
    : [1, 2, 3].map((n) => `/images/products/${cat.id}-${n}.jpg`);

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