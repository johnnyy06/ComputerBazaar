// frontend/src/components/AddressManagement/AddressManagement.tsx
import React, { useState, useEffect } from "react";
import {
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setAddressAsDefault,
  Address,
} from "../../services/addressService";
import styles from "./AddressManagement.module.css";

const AddressManagement: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Form state
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("România");
  const [isDefault, setIsDefault] = useState<boolean>(false);

  // Fetch addresses on component mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await getUserAddresses();
      setAddresses(data);
      setError(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "A apărut o eroare la încărcarea adreselor.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStreet("");
    setCity("");
    setPostalCode("");
    setCountry("România");
    setIsDefault(false);
    setEditingAddress(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!street || !city || !postalCode || !country) {
      setError("Toate câmpurile sunt obligatorii.");
      return;
    }

    const addressData = {
      street,
      city,
      postalCode,
      country,
      isDefault,
    };

    try {
      if (editingAddress?._id) {
        // Update existing address
        await updateAddress(editingAddress._id, addressData);
      } else {
        // Add new address
        await createAddress(addressData);
      }

      // Refresh addresses
      fetchAddresses();

      // Reset form
      resetForm();
      setShowAddForm(false);
      setError(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "A apărut o eroare la salvarea adresei.";
      setError(errorMessage);
    }
  };

  const handleEditAddress = (address: Address) => {
    setStreet(address.street);
    setCity(address.city);
    setPostalCode(address.postalCode);
    setCountry(address.country);
    setIsDefault(address.isDefault);
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (window.confirm("Sigur doriți să ștergeți această adresă?")) {
      try {
        await deleteAddress(addressId);
        // Refresh addresses
        fetchAddresses();
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "A apărut o eroare la ștergerea adresei.";
        setError(errorMessage);
      }
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      await setAddressAsDefault(addressId);
      // Refresh addresses
      fetchAddresses();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "A apărut o eroare la setarea adresei implicite.";
      setError(errorMessage);
    }
  };

  return (
    <div className="address-management">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-white">Gestionează adresele</h3>
        <button
          className="btn btn-danger"
          onClick={() => {
            resetForm();
            setShowAddForm(!showAddForm);
          }}
        >
          {showAddForm ? "Anulează" : "Adaugă adresă nouă"}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {showAddForm && (
        <div className={`${styles["address-form"]} mb-4`}>
          <h4 className="text-white mb-3">
            {editingAddress ? "Editează adresa" : "Adaugă adresă nouă"}
          </h4>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="street" className="form-label text-white">
                Stradă, număr, bloc, apartament
              </label>
              <input
                type="text"
                className="form-control"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                style={{
                  backgroundColor: "#222",
                  color: "#FFFFFF",
                  border: "1px solid #666",
                }}
                required
              />
            </div>

            <div className="row mb-3">
              <div className="col">
                <label htmlFor="city" className="form-label text-white">
                  Oraș
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{
                    backgroundColor: "#222",
                    color: "#FFFFFF",
                    border: "1px solid #666",
                  }}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="postalCode" className="form-label text-white">
                  Cod poștal
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  style={{
                    backgroundColor: "#222",
                    color: "#FFFFFF",
                    border: "1px solid #666",
                  }}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="country" className="form-label text-white">
                Țară
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{
                  backgroundColor: "#222",
                  color: "#FFFFFF",
                  border: "1px solid #666",
                }}
                required
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isDefault"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
              />
              <label
                className="form-check-label text-white"
                htmlFor="isDefault"
              >
                Setează ca adresă implicită
              </label>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-danger">
                {editingAddress ? "Actualizează adresa" : "Adaugă adresa"}
              </button>
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => {
                  resetForm();
                  setShowAddForm(false);
                }}
              >
                Anulează
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : addresses.length === 0 ? (
        <div className="alert alert-info text-center">
          Nu aveți nicio adresă salvată. Adăugați prima dvs. adresă utilizând
          butonul de mai sus.
        </div>
      ) : (
        <div className="row">
          {addresses.map((address) => (
            <div key={address._id} className="col-md-6 mb-3">
              <div className={`${styles["address-card"]} h-100`}>
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
                <div className={styles["address-actions"]}>
                  {!address.isDefault && (
                    <button
                      className="btn btn-sm btn-outline-light me-2"
                      onClick={() =>
                        address._id && handleSetDefault(address._id)
                      }
                    >
                      Setează ca implicită
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline-light me-2"
                    onClick={() => handleEditAddress(address)}
                  >
                    <i className="bi bi-pencil"></i> Editează
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() =>
                      address._id && handleDeleteAddress(address._id)
                    }
                  >
                    <i className="bi bi-trash"></i> Șterge
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressManagement;
