// frontend/src/pages/About.tsx
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <h1 className="text-white mb-4">Despre noi</h1>

            <div className="card bg-dark text-white mb-5">
              <div className="card-body p-4">
                <h2 className="card-title mb-4">Cine suntem</h2>
                <p className="card-text">
                  Computer Bazaar este un magazin online specializat în vânzarea
                  de componente PC, sisteme desktop, laptop-uri și periferice.
                  Fondat în 2025, ne-am propus să oferim clienților noștri cele
                  mai bune produse la prețuri competitive, împreună cu servicii
                  de calitate și consultanță personalizată.
                </p>
                <p className="card-text">
                  Echipa noastră este formată din profesioniști pasionați de
                  tehnologie, cu experiență vastă în domeniul IT. Fie că ești
                  gamer, profesionist sau utilizator obișnuit, te putem ajuta să
                  găsești soluția perfectă pentru nevoile tale.
                </p>
              </div>
            </div>

            <div className="card bg-dark text-white mb-5">
              <div className="card-body p-4">
                <h2 className="card-title mb-4">Misiunea noastră</h2>
                <p className="card-text">
                  Ne-am propus să simplificăm procesul de achiziție a
                  echipamentelor IT și să oferim:
                </p>
                <ul className="card-text">
                  <li className="mb-2">
                    Produse de calitate de la branduri recunoscute la nivel
                    mondial
                  </li>
                  <li className="mb-2">Prețuri competitive și transparente</li>
                  <li className="mb-2">
                    Consultanță tehnică gratuită pentru alegerea componentelor
                    potrivite
                  </li>
                  <li className="mb-2">Servicii post-vânzare de încredere</li>
                  <li className="mb-2">
                    Garanție și suport tehnic pentru toate produsele
                    comercializate
                  </li>
                </ul>
              </div>
            </div>

            <div className="card bg-dark text-white mb-5">
              <div className="card-body p-4">
                <h2 className="card-title mb-4">
                  De ce să alegi Computer Bazaar?
                </h2>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="d-flex">
                      <div className="me-3">
                        <i className="bi bi-check-circle-fill text-danger fs-3"></i>
                      </div>
                      <div>
                        <h5>Expertiză tehnică</h5>
                        <p>
                          Consilierii noștri te ajută să alegi configurația
                          potrivită nevoilor tale.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="d-flex">
                      <div className="me-3">
                        <i className="bi bi-truck text-danger fs-3"></i>
                      </div>
                      <div>
                        <h5>Livrare rapidă</h5>
                        <p>
                          Expediem comenzile în maxim 24 de ore și oferim
                          transport gratuit pentru comenzi peste 500 lei.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="d-flex">
                      <div className="me-3">
                        <i className="bi bi-shield-check text-danger fs-3"></i>
                      </div>
                      <div>
                        <h5>Garanție extinsă</h5>
                        <p>
                          Oferim până la 3 ani garanție pentru majoritatea
                          produselor comercializate.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="d-flex">
                      <div className="me-3">
                        <i className="bi bi-headset text-danger fs-3"></i>
                      </div>
                      <div>
                        <h5>Suport tehnic</h5>
                        <p>
                          Echipa noastră de suport tehnic este disponibilă
                          pentru a te ajuta în orice moment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-dark text-white mb-5">
              <div className="card-body p-4">
                <h2 className="card-title mb-4">Echipa noastră</h2>

                <div className="row">
                  <div className="col-md-4 mb-4">
                    <div className="card bg-secondary-dark">
                      <div className="card-body text-center p-4">
                        <div
                          className="rounded-circle bg-danger mx-auto mb-3 d-flex align-items-center justify-content-center"
                          style={{ width: "80px", height: "80px" }}
                        >
                          <i className="bi bi-person-fill text-white fs-3"></i>
                        </div>
                        <h5 className="card-title">Andrei Popescu</h5>
                        <p className="card-text text-white-50">
                          Fondator & CEO
                        </p>
                        <p className="card-text small">
                          Cu peste 15 ani de experiență în industria IT, Andrei
                          coordonează strategia și viziunea companiei.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-4">
                    <div className="card bg-secondary-dark">
                      <div className="card-body text-center p-4">
                        <div
                          className="rounded-circle bg-danger mx-auto mb-3 d-flex align-items-center justify-content-center"
                          style={{ width: "80px", height: "80px" }}
                        >
                          <i className="bi bi-person-fill text-white fs-3"></i>
                        </div>
                        <h5 className="card-title">Maria Ionescu</h5>
                        <p className="card-text text-white-50">
                          Director Tehnic
                        </p>
                        <p className="card-text small">
                          Expertă în arhitecturi de sistem și configurații de
                          înaltă performanță pentru gaming și productivitate.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-4">
                    <div className="card bg-secondary-dark">
                      <div className="card-body text-center p-4">
                        <div
                          className="rounded-circle bg-danger mx-auto mb-3 d-flex align-items-center justify-content-center"
                          style={{ width: "80px", height: "80px" }}
                        >
                          <i className="bi bi-person-fill text-white fs-3"></i>
                        </div>
                        <h5 className="card-title">Alex Dumitrescu</h5>
                        <p className="card-text text-white-50">
                          Manager Relații Clienți
                        </p>
                        <p className="card-text small">
                          Dedicat satisfacției clienților și îmbunătățirii
                          constante a experienței de cumpărare.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-dark text-white">
              <div className="card-body p-4">
                <h2 className="card-title mb-4">Contact</h2>
                <p className="card-text">
                  Ne poți găsi la sediul nostru din București sau ne poți
                  contacta prin una din metodele de mai jos:
                </p>

                <div className="row mt-4">
                  <div className="col-md-6 mb-3">
                    <div className="d-flex">
                      <div className="me-3">
                        <i className="bi bi-geo-alt-fill text-danger fs-4"></i>
                      </div>
                      <div>
                        <h5>Adresă</h5>
                        <p>Bulevardul Iuliu Maniu 7, București</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="d-flex">
                      <div className="me-3">
                        <i className="bi bi-telephone-fill text-danger fs-4"></i>
                      </div>
                      <div>
                        <h5>Telefon</h5>
                        <p>0721 123 456</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="d-flex">
                      <div className="me-3">
                        <i className="bi bi-envelope-fill text-danger fs-4"></i>
                      </div>
                      <div>
                        <h5>Email</h5>
                        <p>contact@computerbazaar.ro</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="d-flex">
                      <div className="me-3">
                        <i className="bi bi-clock-fill text-danger fs-4"></i>
                      </div>
                      <div>
                        <h5>Program</h5>
                        <p>Luni-Vineri: 9:00 - 18:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
