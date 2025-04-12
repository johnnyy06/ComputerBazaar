// frontend/src/components/ProductGallery/ProductGallery.tsx
import React, { useState, useEffect } from "react";
import { UploadedImage } from "../../services/uploadService";
import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
  images: (string | UploadedImage)[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
}) => {
  // Extract image URLs from the mixed array of strings and objects
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    if (images && images.length > 0) {
      // Extract URLs from the mixed array
      const urls = images
        .map((image) => {
          if (typeof image === "string") {
            return image;
          } else if (image && typeof image === "object" && "url" in image) {
            return image.url;
          }
          return "";
        })
        .filter((url) => url); // Remove empty strings

      setImageUrls(urls);

      // Set first image as main image if we have any
      if (urls.length > 0) {
        setMainImage(urls[0]);
      }
    }
  }, [images]);

  const changeMainImage = (image: string) => {
    setMainImage(image);
  };

  if (imageUrls.length === 0) {
    return (
      <div className={styles.noImages}>
        <div className={styles.placeholderImage}>
          <i className="bi bi-image"></i>
          <p>No image available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <img
          src={mainImage}
          alt={productName}
          className={styles.mainImageImg}
        />
      </div>

      {imageUrls.length > 1 && (
        <div className={styles.thumbnails}>
          {imageUrls.map((image, index) => (
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
