// frontend/src/components/AddressSelector/AddressSelector.tsx
import React, { useState, useEffect } from "react";
import { getUserAddresses, Address } from "../../services/addressService";
import styles from "./AddressSelector.module.css";

interface AddressSelectorProps {
  onSelectAddress: (address: Address) => void;
  selectedAddressId?: string;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({
  onSelectAddress,
  selectedAddressId,
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | undefined>(
    selectedAddressId
  );

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const data = await getUserAddresses();
        setAddresses(data);

        // If we have addresses but no selectedAddressId, select the default one
        if (data.length > 0 && !selectedAddressId) {
          const defaultAddress = data.find((addr) => addr.isDefault);
          if (defaultAddress) {
            setSelected(defaultAddress._id);
            onSelectAddress(defaultAddress);
          } else {
            setSelected(data[0]._id);
            onSelectAddress(data[0]);
          }
        }

        setError(null);
      } catch (err: unknown) {
        if (
          err instanceof Error &&
          (err as { response?: { data?: { message?: string } } }).response?.data
            ?.message
        ) {
          if (
            typeof err === "object" &&
            err !== null &&
            "response" in err &&
            typeof (err as { response?: { data?: { message?: string } } })
              .response?.data?.message === "string"
          ) {
            setError(
              (err as { response: { data: { message: string } } }).response.data
                .message
            );
          } else {
            setError("A apărut o eroare la încărcarea adreselor.");
          }
        } else {
          setError("A apărut o eroare la încărcarea adreselor.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [onSelectAddress, selectedAddressId]);

  const handleSelectAddress = (address: Address) => {
    setSelected(address._id);
    onSelectAddress(address);
  };

  if (loading) {
    return (
      <div className="text-center my-3">
        <div
          className="spinner-border spinner-border-sm text-danger"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-2 text-white-50">Se încarcă adresele...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="alert alert-warning" role="alert">
        Nu aveți nicio adresă salvată. Vă rugăm să adăugați o adresă în
        secțiunea "Gestionează adrese" din profilul dvs.
      </div>
    );
  }

  return (
    <div className={styles["address-selector"]}>
      <h5 className="text-white mb-3">Selectați adresa de livrare</h5>
      <div className="row">
        {addresses.map((address) => (
          <div key={address._id} className="col-md-6 mb-3">
            <div
              className={`${styles["address-card"]} ${
                selected === address._id ? styles["selected"] : ""
              }`}
              onClick={() => handleSelectAddress(address)}
            >
              {address.isDefault && (
                <span className={styles["default-badge"]}>Implicită</span>
              )}
              <div className={styles["address-content"]}>
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.postalCode}
                </p>
                <p>{address.country}</p>
              </div>
              <div className={styles["address-select"]}>
                <div className={styles["radio-button"]}>
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selected === address._id}
                    onChange={() => handleSelectAddress(address)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressSelector;
