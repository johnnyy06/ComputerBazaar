import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

interface WarrantyInfo {
  id: number;
  title: string;
  description: string;
}

const WarrantyAndServicePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    issue: "",
  });

  const warrantyInfo: WarrantyInfo[] = [
    {
      id: 1,
      title: "Garanție Standard",
      description:
        "Toate produsele achiziționate de la Computer Bazaar beneficiază de o garanție standard de 2 ani, conform legislației UE. Unele produse, precum plăcile video high-end și laptopurile, pot include o garanție extinsă de 3 ani, în funcție de producător. Pentru a solicita garanția, păstrați factura și ambalajul original.",
    },
    {
      id: 2,
      title: "Procesul de Service",
      description:
        "Dacă produsul dumneavoastră întâmpină probleme, contactați-ne la support@computerbazaar.ro cu detaliile comenzii și o descriere a problemei. Vom procesa cererea în 1-2 zile lucrătoare și vă vom ghida către un centru de service autorizat sau vom facilita înlocuirea produsului, în funcție de caz.",
    },
    {
      id: 3,
      title: "Condiții de Retur",
      description:
        "Acceptăm retururi în termen de 14 zile de la livrare pentru produsele nefolosite, în ambalajul original. Pentru a iniția un retur, completați formularul de mai jos sau contactați-ne. Costurile de transport pentru retur sunt suportate de client, cu excepția cazurilor în care produsul este defect din fabrică.",
    },
    {
      id: 4,
      title: "Reparații Post-Garanție",
      description:
        "Pentru produsele aflate în afara perioadei de garanție, oferim servicii de reparații prin partenerii noștri autorizați. Costurile variază în funcție de natura problemei și vor fi comunicate în avans. Contactați-ne pentru o evaluare inițială.",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Căutare: ${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.orderNumber.trim() &&
      formData.issue.trim()
    ) {
      alert("Cererea a fost trimisă! Veți fi contactat în curând.");
      setFormData({ name: "", email: "", orderNumber: "", issue: "" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="text-white display-4 fw-bold">Garanție și Service</h1>
          <p className="text-white-50 lead">
            Află totul despre politica noastră de garanție, procesul de service
            și cum să inițiezi o cerere de retur sau reparație.
          </p>
        </div>

        {/* Search Bar */}
        <div className="card bg-dark mb-5 border-0 shadow">
          <div className="card-body p-4">
            <h4 className="text-white mb-3">Caută informații</h4>
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Ex. 'garanție placă video' sau 'retur produs'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="btn btn-danger"
                  type="submit"
                  disabled={!searchQuery.trim()}
                >
                  <i className="bi bi-search me-2"></i>Caută
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Warranty Information */}
        <div className="row mb-5">
          {warrantyInfo.map((info) => (
            <div key={info.id} className="col-md-6 mb-4">
              <div className="card bg-dark border-0 shadow h-100">
                <div className="card-body p-4">
                  <h5 className="text-white mb-3">{info.title}</h5>
                  <p className="text-white-50">{info.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Request Form */}
        <div className="card bg-dark mb-5 border-0 shadow">
          <div className="card-body p-4">
            <h4 className="text-white mb-3">Inițiază o cerere de service</h4>
            <p className="text-white-50 mb-4">
              Completează formularul de mai jos pentru a solicita suport pentru
              garanție, retur sau reparații.
            </p>
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label text-white">
                    Nume
                  </label>
                  <input
                    type="text"
                    className="form-control bg-secondary text-white border-0"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control bg-secondary text-white border-0"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="orderNumber" className="form-label text-white">
                  Număr comandă
                </label>
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  id="orderNumber"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleFormChange}
                  required
                  placeholder="Ex. CB123456"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="issue" className="form-label text-white">
                  Descriere problemă
                </label>
                <textarea
                  className="form-control bg-secondary text-white border-0"
                  id="issue"
                  name="issue"
                  rows={5}
                  value={formData.issue}
                  onChange={handleFormChange}
                  required
                  placeholder="Descrie detaliat problema sau cererea ta..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-danger"
                disabled={
                  !formData.name.trim() ||
                  !formData.email.trim() ||
                  !formData.orderNumber.trim() ||
                  !formData.issue.trim()
                }
              >
                Trimite Cererea
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mb-5">
          <h4 className="text-white mb-3">Contact direct</h4>
          <p className="text-white-50 mb-4">
            Pentru asistență rapidă, contactează-ne prin una dintre opțiunile de
            mai jos.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a
              href="mailto:support@computerbazaar.ro"
              className="btn btn-outline-light"
            >
              <i className="bi bi-envelope me-2"></i>
              support@computerbazaar.ro
            </a>
            <a href="tel:+40312345678" className="btn btn-outline-light">
              <i className="bi bi-telephone me-2"></i>
              +40 312 345 678
            </a>
            <Link to="/contact" className="btn btn-outline-light">
              <i className="bi bi-chat me-2"></i>
              Live Chat
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="card bg-dark border-0 shadow">
          <div className="card-body p-4">
            <h4 className="text-white mb-4">Link-uri Utile</h4>
            <div className="row">
              <div className="col-md-4 mb-3">
                <Link
                  to="/faq"
                  className="text-decoration-none text-white-50 hover-text-white"
                >
                  <i className="bi bi-question-circle me-2"></i>Întrebări
                  Frecvente
                </Link>
              </div>
              <div className="col-md-4 mb-3">
                <Link
                  to="/support"
                  className="text-decoration-none text-white-50 hover-text-white"
                >
                  <i className="bi bi-headset me-2"></i>Suport Tehnic
                </Link>
              </div>
              <div className="col-md-4 mb-3">
                <Link
                  to="/guides"
                  className="text-decoration-none text-white-50 hover-text-white"
                >
                  <i className="bi bi-book me-2"></i>Ghiduri Tehnice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WarrantyAndServicePage;
