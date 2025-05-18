// frontend/src/components/PCConfigurator/CompatibilityChecker.tsx
import React from "react";
import { PCConfiguration } from "../../pages/PCConfigurator";
import styles from "./CompatibilityChecker.module.css";

interface CompatibilityCheckerProps {
  configuration: PCConfiguration;
  issues: string[];
}

const CompatibilityChecker: React.FC<CompatibilityCheckerProps> = ({
  configuration,
  issues,
}) => {
  // Check if at least two components are selected to show compatibility info
  const hasMultipleComponents =
    Object.values(configuration).filter(Boolean).length >= 2;

  // Determine overall compatibility status
  const isCompatible = issues.length === 0 && hasMultipleComponents;

  if (!hasMultipleComponents) {
    return (
      <div className={styles.compatibilityChecker}>
        <div className={styles.compatibilityInfo}>
          <i className="bi bi-info-circle text-info me-2"></i>
          <span>
            Selectează cel puțin două componente pentru a verifica
            compatibilitatea.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.compatibilityChecker}>
      {isCompatible ? (
        <div className={`${styles.compatibilityStatus} ${styles.compatible}`}>
          <i className="bi bi-check-circle-fill me-2"></i>
          <span>Toate componentele sunt compatibile</span>
        </div>
      ) : (
        <div className={`${styles.compatibilityStatus} ${styles.incompatible}`}>
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <span>Probleme de compatibilitate detectate</span>
        </div>
      )}

      {issues.length > 0 && (
        <div className={styles.issuesList}>
          <h5>Probleme de compatibilitate:</h5>
          <ul>
            {issues.map((issue, index) => (
              <li key={index} className={styles.issue}>
                <i className="bi bi-exclamation-circle-fill me-2"></i>
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Common compatibility rules and tips */}
      <div className={styles.compatibilityTips}>
        <h5>Sfaturi pentru compatibilitate:</h5>
        <ul>
          <li>Asigură-te că procesorul și placa de bază au același socket.</li>
          <li>Verifică tipul de memorie RAM suportat de placa de bază.</li>
          <li>
            Pentru plăci video performante, alege o sursă cu putere suficientă.
          </li>
          <li>
            Verifică dacă placa de bază are suficiente sloturi pentru toate
            componentele.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CompatibilityChecker;
