import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const TechnicalSupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    issue: "",
    description: "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Căutare: ${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleContactFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      contactForm.name.trim() &&
      contactForm.email.trim() &&
      contactForm.description.trim()
    ) {
      alert("Mesajul a fost trimis! Veți fi contactat în curând.");
      setContactForm({ name: "", email: "", issue: "", description: "" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        <div className="row">
          <div className="col-12">
            {/* Page Header */}
            <div className="text-center mb-5">
              <h1 className="text-white display-4 fw-bold">Suport Tehnic</h1>
              <p className="text-white-50 lead">
                Echipa Computer Bazaar vă oferă asistență rapidă și profesională
                pentru orice problemă tehnică.
              </p>
            </div>

            {/* Search Bar */}
            <div className="card bg-dark mb-5 border-0 shadow">
              <div className="card-body p-4">
                <h4 className="text-white mb-3">Găsește soluții rapid</h4>
                <form onSubmit={handleSearch}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-secondary text-white border-0"
                      placeholder="Caută după problemă (ex. 'placă video nu funcționează')"
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

            {/* Support Options */}
            <div className="row mb-5">
              <div className="col-md-4 mb-4">
                <div className="card bg-dark border-0 shadow h-100">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-headset text-danger display-4 mb-3"></i>
                    <h5 className="text-white">Suport Live</h5>
                    <p className="text-white-50 small">
                      Vorbește direct cu un specialist prin chat sau telefon.
                    </p>
                    <Link to="/contact" className="btn btn-outline-danger mt-2">
                      Începe Chat
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card bg-dark border-0 shadow h-100">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-book text-danger display-4 mb-3"></i>
                    <h5 className="text-white">Ghiduri Tehnice</h5>
                    <p className="text-white-50 small">
                      Explorează tutorialele și ghidurile noastre pentru soluții
                      pas cu pas.
                    </p>
                    <Link to="/guides" className="btn btn-outline-danger mt-2">
                      Vezi Ghiduri
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card bg-dark border-0 shadow h-100">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-question-circle text-danger display-4 mb-3"></i>
                    <h5 className="text-white">Întrebări Frecvente</h5>
                    <p className="text-white-50 small">
                      Găsește răspunsuri la cele mai comune probleme tehnice.
                    </p>
                    <Link to="/faq" className="btn btn-outline-danger mt-2">
                      Vezi FAQ
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card bg-dark mb-5 border-0 shadow">
              <div className="card-body p-4">
                <h4 className="text-white mb-3">Trimite-ne un mesaj</h4>
                <p className="text-white-50 mb-4">
                  Completează formularul de mai jos, iar un membru al echipei
                  noastre te va contacta în cel mai scurt timp.
                </p>
                <form onSubmit={handleContactFormSubmit}>
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
                        value={contactForm.name}
                        onChange={handleContactFormChange}
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
                        value={contactForm.email}
                        onChange={handleContactFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="issue" className="form-label text-white">
                      Tip problemă
                    </label>
                    <input
                      type="text"
                      className="form-control bg-secondary text-white border-0"
                      id="issue"
                      name="issue"
                      value={contactForm.issue}
                      onChange={handleContactFormChange}
                      placeholder="Ex. Problemă placă video"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="description"
                      className="form-label text-white"
                    >
                      Descriere problemă
                    </label>
                    <textarea
                      className="form-control bg-secondary text-white border-0"
                      id="description"
                      name="description"
                      rows={5}
                      value={contactForm.description}
                      onChange={handleContactFormChange}
                      required
                      placeholder="Descrie detaliat problema ta..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={
                      !contactForm.name.trim() ||
                      !contactForm.email.trim() ||
                      !contactForm.description.trim()
                    }
                  >
                    Trimite Mesajul
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="text-center">
              <h4 className="text-white mb-3">Contactează-ne direct</h4>
              <p className="text-white-50 mb-4">
                Pentru asistență imediată, folosește una dintre opțiunile de mai
                jos.
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TechnicalSupportPage;
