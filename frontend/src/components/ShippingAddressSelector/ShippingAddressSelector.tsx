// frontend/src/components/ShippingAddressSelector/ShippingAddressSelector.tsx
import React from "react";
import { Address } from "../../services/addressService";
import AddressSelector from "../AddressSelector/AddressSelector";

interface ShippingAddressSelectorProps {
  onSelectAddress: (address: Address) => void;
  selectedAddressId?: string;
}

const ShippingAddressSelector: React.FC<ShippingAddressSelectorProps> = ({
  onSelectAddress,
  selectedAddressId,
}) => {
  return (
    <div className="checkout-section">
      <h3 className="section-title">1. Adresă de livrare</h3>
      <AddressSelector
        onSelectAddress={onSelectAddress}
        selectedAddressId={selectedAddressId}
      />
    </div>
  );
};

export default ShippingAddressSelector;
