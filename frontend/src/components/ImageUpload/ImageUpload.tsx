// frontend/src/components/ImageUpload/ImageUpload.tsx
import React, { useState, useRef } from "react";
import {
  uploadImage,
  uploadMultipleImages,
  UploadedImage,
} from "../../services/uploadService";
import styles from "./ImageUpload.module.css";

interface ImageUploadProps {
  multiple?: boolean;
  maxFiles?: number;
  existingImages?: UploadedImage[];
  onImagesUploaded: (images: UploadedImage[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  multiple = false,
  maxFiles = 5,
  existingImages = [],
  onImagesUploaded,
}) => {
  const [images, setImages] = useState<UploadedImage[]>(existingImages);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    try {
      setUploading(true);
      setError(null);

      // Check if total number of files exceeds the limit
      const totalFiles = images.length + e.target.files.length;
      if (totalFiles > maxFiles) {
        setError(`Puteți încărca maximum ${maxFiles} imagini`);
        setUploading(false);
        return;
      }

      let uploadedImages: UploadedImage[] = [];

      if (multiple && e.target.files.length > 1) {
        // Convert FileList to array
        const filesArray = Array.from(e.target.files);
        uploadedImages = await uploadMultipleImages(filesArray);
      } else {
        // Single file upload
        const uploadedImage = await uploadImage(e.target.files[0]);
        uploadedImages = [uploadedImage];
      }

      // Update state with new images
      const newImages = [...images, ...uploadedImages];
      setImages(newImages);

      // Notify parent component
      onImagesUploaded(newImages);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Error uploading images:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Eroare la încărcarea imaginilor. Încercați din nou.");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    // Remove image from state (we don't delete from Cloudinary here)
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    // Notify parent component
    onImagesUploaded(updatedImages);
  };

  const handleTriggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={styles.imageUploadContainer}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className={styles.uploadControl}>
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={handleTriggerFileInput}
          disabled={uploading || images.length >= maxFiles}
        >
          {uploading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Se încarcă...
            </>
          ) : (
            <>
              <i className="bi bi-cloud-upload me-2"></i>
              {multiple ? "Încarcă imagini" : "Încarcă imagine"}
            </>
          )}
        </button>

        <input
          type="file"
          ref={fileInputRef}
          className={styles.fileInput}
          accept="image/*"
          multiple={multiple}
          onChange={handleFileChange}
        />

        <small className="text-white-50 ms-2">
          {multiple ? `${images.length}/${maxFiles} imagini` : ""}
        </small>
      </div>

      {images.length > 0 && (
        <div className={styles.imagePreviewContainer}>
          {images.map((image, index) => (
            <div
              key={image.publicId || index}
              className={styles.imagePreviewItem}
            >
              <div className={styles.imagePreview}>
                <img src={image.url} alt={`Preview ${index}`} />
              </div>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => handleRemoveImage(index)}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
