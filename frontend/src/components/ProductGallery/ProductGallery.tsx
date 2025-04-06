// frontend/src/components/Product/ProductGallery.tsx
import React, { useState } from "react";
import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
}) => {
  const [mainImage, setMainImage] = useState<string>(images[0] || "");

  const changeMainImage = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <img
          src={mainImage}
          alt={productName}
          className={styles.mainImageImg}
        />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.thumbnail} ${
                mainImage === image ? styles.active : ""
              }`}
              onClick={() => changeMainImage(image)}
            >
              <img
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className={styles.thumbnailImg}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
