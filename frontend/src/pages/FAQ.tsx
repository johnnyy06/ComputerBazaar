import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQPage: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Ce placă video este recomandată pentru gaming la 1440p?",
      answer:
        "Pentru gaming la 1440p în 2025, recomandăm plăci video mid-high sau high-end, cum ar fi NVIDIA RTX 5070, AMD Radeon RX 8700 XT sau Intel Arc A950. Acestea oferă performanțe fluide la setări ridicate, suport pentru tehnologii precum DLSS 3.5 sau FSR 3, și sunt potrivite pentru majoritatea jocurilor moderne. Asigurați-vă că procesorul este suficient de puternic pentru a evita bottleneck-urile.",
      category: "Hardware",
    },
    {
      id: 2,
      question:
        "Cum verific compatibilitatea sursei de alimentare cu o placă video?",
      answer:
        "Verificați puterea sursei (minimum 750W pentru plăci high-end precum RTX 5080), conectorii PCIe (8-pin sau 12VHPWR) și amperajul pe linia de +12V. Consultați specificațiile producătorului plăcii video și eticheta sursei. Pentru siguranță, folosiți un calculator online de putere PSU sau contactați suportul nostru la support@computerbazaar.ro.",
      category: "Hardware",
    },
    {
      id: 3,
      question: "Care este diferența dintre SSD și HDD?",
      answer:
        "SSD-urile sunt mai rapide (până la 7000 MB/s pentru NVMe vs. 200 MB/s pentru HDD), mai durabile (fără piese mobile) și ideale pentru sistem și aplicații. HDD-urile oferă capacitate mare la preț mic, fiind potrivite pentru stocare masivă. Recomandăm un SSD NVMe pentru performanță și un HDD pentru arhivare, dacă bugetul permite.",
      category: "Stocare",
    },
    {
      id: 4,
      question: "Ce laptop este bun pentru programare?",
      answer:
        "Un laptop pentru programare în 2025 ar trebui să aibă un procesor modern (Intel Core i7/i9 sau AMD Ryzen 7/9), minimum 16GB RAM (ideal 32GB), SSD NVMe de 512GB+, ecran de 15-16 inch (1440p sau mai mare) și o tastatură confortabilă. Exemple: Dell XPS 15, MacBook Pro 16 (M3), Lenovo ThinkPad X1 Carbon. Alegeți sistemul de operare preferat (Windows, macOS, Linux).",
      category: "Laptopuri",
    },
    {
      id: 5,
      question: "Ce garanție oferă Computer Bazaar?",
      answer:
        "Toate componentele PC au o garanție standard de 2 ani, conform legislației UE. Unele produse, precum plăcile video high-end sau laptopurile, pot avea garanție extinsă de 3 ani, în funcție de producător. Păstrați factura și ambalajul original. Pentru suport, contactați-ne la support@computerbazaar.ro.",
      category: "Servicii",
    },
  ];

  const toggleFAQ = (id: number) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Căutare: ${searchQuery}`);
      setSearchQuery("");
    }
  };

  const filteredFAQs = searchQuery.trim()
    ? faqData.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqData;

  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="text-white display-4 fw-bold">Întrebări Frecvente</h1>
          <p className="text-white-50 lead">
            Găsiți răspunsuri rapide la cele mai comune întrebări despre
            produsele și serviciile Computer Bazaar.
          </p>
        </div>

        {/* Search Bar */}
        <div className="card bg-dark mb-5 border-0 shadow">
          <div className="card-body p-4">
            <h4 className="text-white mb-3">Caută o întrebare</h4>
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Ex. 'placă video 1440p' sau 'garanție'"
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

        {/* FAQ List */}
        <div className="card bg-dark mb-5 border-0 shadow">
          <div className="card-body p-4">
            <h4 className="text-white mb-4">Întrebări și Răspunsuri</h4>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="border-bottom border-secondary py-3"
                >
                  <div
                    className="d-flex justify-content-between align-items-center cursor-pointer"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <h5 className="text-white mb-0">{faq.question}</h5>
                    <i
                      className={`bi bi-chevron-${
                        activeFAQ === faq.id ? "up" : "down"
                      } text-danger`}
                    ></i>
                  </div>
                  {activeFAQ === faq.id && (
                    <div className="text-white-50 mt-3">{faq.answer}</div>
                  )}
                  <small className="text-white-50 d-block mt-2">
                    Categorie: {faq.category}
                  </small>
                </div>
              ))
            ) : (
              <p className="text-white-50">
                Nu s-au găsit rezultate pentru căutarea ta. Încearcă alt termen.
              </p>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mb-5">
          <h4 className="text-white mb-3">Nu ai găsit răspunsul dorit?</h4>
          <p className="text-white-50 mb-4">
            Contactează echipa noastră pentru asistență personalizată.
          </p>
          <Link to="/contact" className="btn btn-danger">
            Contactează Suportul
          </Link>
        </div>

        {/* Quick Links */}
        <div className="card bg-dark border-0 shadow">
          <div className="card-body p-4">
            <h4 className="text-white mb-4">Link-uri Utile</h4>
            <div className="row">
              <div className="col-md-4 mb-3">
                <Link
                  to="/guides"
                  className="text-decoration-none text-white-50 hover-text-white"
                >
                  <i className="bi bi-book me-2"></i>Ghiduri Tehnice
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
                  to="/warranty"
                  className="text-decoration-none text-white-50 hover-text-white"
                >
                  <i className="bi bi-shield-check me-2"></i>Informații Garanție
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

export default FAQPage;
