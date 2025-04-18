// frontend/src/pages/ReturnPolicy.tsx
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const ReturnPolicyPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <h1 className="text-white mb-4">Politica de retur</h1>

            <div className="card bg-dark text-white mb-4">
              <div className="card-body p-4">
                <p className="card-text mb-4">
                  Computer Bazaar își propune să ofere cea mai bună experiență
                  de cumpărare clienților săi. Înțelegem că uneori produsele
                  achiziționate pot necesita returnare, de aceea am conceput o
                  politică de retur transparentă și prietenoasă pentru a vă
                  oferi liniște și siguranță când cumpărați de la noi.
                </p>

                <div className="alert alert-primary mb-4">
                  <div className="d-flex">
                    <div className="me-3">
                      <i className="bi bi-info-circle-fill fs-4"></i>
                    </div>
                    <div>
                      <h5>Dreptul de retragere în 14 zile</h5>
                      <p className="mb-0">
                        În conformitate cu legislația în vigoare (OUG nr.
                        34/2014), beneficiați de o perioadă de 14 zile
                        calendaristice pentru a vă retrage din contract fără
                        penalități și fără invocarea unui motiv.
                      </p>
                    </div>
                  </div>
                </div>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  1. Condiții generale de returnare
                </h4>
                <p className="mb-2">
                  Pentru a fi eligibil pentru retur, produsul trebuie să
                  îndeplinească următoarele condiții:
                </p>
                <ul className="mb-4">
                  <li className="mb-2">
                    Să fie în ambalajul original, nedesfăcut sau nedeteriorat;
                  </li>
                  <li className="mb-2">
                    Să conțină toate accesoriile, manualele și materialele cu
                    care a fost livrat;
                  </li>
                  <li className="mb-2">
                    Să nu prezinte semne de utilizare, zgârieturi sau
                    deteriorări;
                  </li>
                  <li className="mb-2">
                    Să fie însoțit de factura originală sau o copie a acesteia;
                  </li>
                  <li className="mb-2">
                    Să fie returnat în termenul specificat, în funcție de tipul
                    de retur.
                  </li>
                </ul>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  2. Tipuri de returnare
                </h4>

                <h5 className="mt-4 mb-3">
                  2.1. Returnare în baza dreptului de retragere (14 zile)
                </h5>
                <p className="mb-2">
                  Aveți dreptul de a vă retrage din contract în termen de 14
                  zile calendaristice de la data primirii produsului, fără
                  penalități și fără a fi necesară invocarea unui motiv.
                </p>
                <p className="mb-2">
                  În cazul în care ați achiziționat mai multe produse printr-o
                  singură comandă, dar livrate separat, termenul de 14 zile se
                  calculează de la data la care ați intrat în posesia fizică a
                  ultimului produs.
                </p>
                <p className="mb-4">
                  Pentru a exercita acest drept, trebuie să ne informați cu
                  privire la decizia dumneavoastră printr-o declarație
                  neechivocă (de exemplu, o scrisoare trimisă prin poștă, fax
                  sau e-mail).
                </p>

                <h5 className="mt-4 mb-3">
                  2.2. Returnare în caz de neconformitate (garanție legală)
                </h5>
                <p className="mb-2">
                  În cazul în care produsul prezintă defecte sau nu corespunde
                  descrierii, aveți dreptul la repararea sau înlocuirea gratuită
                  a produsului, la reducerea corespunzătoare a prețului sau la
                  rezoluțiunea contractului, în această ordine.
                </p>
                <p className="mb-2">
                  Termenul de garanție legală de conformitate este de 2 ani de
                  la data livrării produsului.
                </p>
                <p className="mb-4">
                  Pentru a beneficia de garanția legală, trebuie să ne aduceți
                  la cunoștință neconformitatea în termen de 2 luni de la data
                  la care ați descoperit-o.
                </p>

                <h5 className="mt-4 mb-3">
                  2.3. Returnare pentru produse care nu corespund așteptărilor
                </h5>
                <p className="mb-2">
                  Chiar dacă perioada de retragere de 14 zile a expirat, la
                  Computer Bazaar oferim posibilitatea de a returna produsele
                  care nu corespund așteptărilor dumneavoastră în termen de 30
                  de zile de la livrare.
                </p>
                <p className="mb-2">
                  În acest caz, costurile de returnare vor fi suportate de către
                  dumneavoastră, iar produsul trebuie să fie în stare perfectă,
                  nefolosit și în ambalajul original.
                </p>
                <p className="mb-4">
                  Rambursarea se va face sub formă de voucher valoric sau prin
                  schimbarea cu un alt produs.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  3. Procedura de returnare
                </h4>
                <p className="mb-2">
                  Pentru a returna un produs, urmați acești pași:
                </p>
                <ol className="mb-4">
                  <li className="mb-2">
                    <strong>Anunțați intenția de retur:</strong> Contactați
                    serviciul nostru clienți prin telefon la 0721 123 456 sau
                    prin email la retururi@computerbazaar.ro pentru a ne informa
                    despre intenția dumneavoastră de a returna produsul. Vă
                    rugăm să precizați numărul comenzii, produsul pe care doriți
                    să îl returnați și motivul returnării.
                  </li>
                  <li className="mb-2">
                    <strong>Primiți un formular de retur:</strong> După ce
                    ne-ați contactat, vă vom trimite un formular de retur pe
                    email. Completați acest formular cu toate informațiile
                    solicitate.
                  </li>
                  <li className="mb-2">
                    <strong>Ambalați produsul:</strong> Ambalați produsul în
                    ambalajul original sau într-un ambalaj adecvat care să
                    protejeze produsul în timpul transportului. Includeți toate
                    accesoriile, manualele și orice alte materiale primite
                    împreună cu produsul.
                  </li>
                  <li className="mb-2">
                    <strong>Atașați formularul de retur:</strong> Puneți
                    formularul de retur completat în pachet sau atașați-l pe
                    partea exterioară a pachetului.
                  </li>
                  <li className="mb-2">
                    <strong>Trimiteți pachetul:</strong> Expediați pachetul la
                    adresa indicată în formularul de retur, folosind o metodă de
                    livrare care oferă confirmare de primire.
                  </li>
                </ol>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  4. Costurile de returnare
                </h4>
                <p className="mb-2">
                  Costurile de returnare diferă în funcție de tipul de
                  returnare:
                </p>
                <ul className="mb-4">
                  <li className="mb-2">
                    <strong>
                      Returnare în baza dreptului de retragere (14 zile):
                    </strong>{" "}
                    Costurile de returnare sunt suportate de către
                    dumneavoastră, cu excepția cazului în care v-am informat că
                    aceste costuri sunt suportate de noi sau dacă produsul
                    livrat nu corespunde celui comandat.
                  </li>
                  <li className="mb-2">
                    <strong>
                      Returnare în caz de neconformitate (garanție legală):
                    </strong>{" "}
                    Costurile de returnare sunt suportate de Computer Bazaar.
                  </li>
                  <li className="mb-2">
                    <strong>
                      Returnare pentru produse care nu corespund așteptărilor:
                    </strong>{" "}
                    Costurile de returnare sunt suportate de către
                    dumneavoastră.
                  </li>
                </ul>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  5. Procesul de rambursare
                </h4>
                <p className="mb-2">
                  După primirea produsului returnat, vom procesa cererea
                  dumneavoastră în cel mai scurt timp posibil:
                </p>
                <ul className="mb-4">
                  <li className="mb-2">
                    <strong>Verificarea produsului:</strong> Vom verifica
                    produsul pentru a ne asigura că respectă condițiile de
                    returnare.
                  </li>
                  <li className="mb-2">
                    <strong>Aprobare:</strong> Dacă produsul îndeplinește toate
                    condițiile, vom aproba returnarea.
                  </li>
                  <li className="mb-2">
                    <strong>Rambursare:</strong> Vom rambursa suma plătită
                    pentru produs (excluzând costurile de livrare inițiale)
                    folosind aceeași metodă de plată pe care ați utilizat-o
                    pentru achiziție, cu excepția cazului în care ați fost de
                    acord cu o altă modalitate de rambursare.
                  </li>
                  <li className="mb-2">
                    <strong>Termen de rambursare:</strong> Rambursarea va fi
                    efectuată în termen de maximum 14 zile de la data la care am
                    fost informați cu privire la decizia dumneavoastră de
                    retragere din contract. Putem amâna rambursarea până când
                    primim produsul înapoi sau până când ne-ați furnizat dovada
                    că ați trimis produsul înapoi, în funcție de care dintre
                    aceste situații se produce prima.
                  </li>
                </ul>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  6. Excepții de la politica de retur
                </h4>
                <p className="mb-2">
                  Anumite produse sunt exceptate de la dreptul de retragere
                  conform legislației în vigoare:
                </p>
                <ul className="mb-4">
                  <li className="mb-2">
                    Produse sigilate care nu pot fi returnate din motive de
                    protecție a sănătății sau din motive de igienă și care au
                    fost desigilate după livrare;
                  </li>
                  <li className="mb-2">
                    Produse personalizate conform specificațiilor dumneavoastră;
                  </li>
                  <li className="mb-2">
                    Software, jocuri sau alte conținuturi digitale furnizate pe
                    un suport material sigilat, dacă acesta a fost desigilat
                    după livrare;
                  </li>
                  <li className="mb-2">
                    Produse care, prin natura lor, se deteriorează sau expiră
                    rapid;
                  </li>
                  <li className="mb-2">
                    Produse care au fost despachetate și testate peste limitele
                    rezonabile necesare pentru verificarea caracteristicilor și
                    funcționării lor.
                  </li>
                </ul>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  7. Garanție comercială
                </h4>
                <p className="mb-2">
                  Pe lângă garanția legală de conformitate, multe produse
                  beneficiază și de o garanție comercială oferită de producător
                  sau de Computer Bazaar.
                </p>
                <p className="mb-2">
                  Durata și condițiile garanției comerciale sunt specificate în
                  certificatul de garanție care însoțește produsul.
                </p>
                <p className="mb-4">
                  Garanția comercială nu afectează drepturile dumneavoastră
                  legale privind garanția legală de conformitate.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  8. Întrebări frecvente despre returnare
                </h4>

                <div className="accordion mb-4" id="faqAccordion">
                  <div className="accordion-item bg-dark">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button bg-dark text-white"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Cum pot returna un produs dacă l-am primit cadou?
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Dacă ați primit produsul ca un cadou, persoana care a
                        făcut achiziția poate solicita returnarea în perioada
                        legală de 14 zile. Alternativ, cu o dovadă a achiziției
                        (factura sau bonul fiscal), puteți returna produsul și
                        solicita un voucher valoric echivalent cu valoarea
                        produsului.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item bg-dark">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed bg-dark text-white"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Pot să schimb produsul cu un alt model sau culoare?
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Da, puteți schimba produsul cu un alt model sau culoare,
                        în limita stocului disponibil. Dacă noul produs are un
                        preț mai mare, va trebui să achitați diferența. Dacă
                        noul produs are un preț mai mic, vom rambursa diferența
                        prin aceeași metodă de plată folosită pentru achiziția
                        inițială sau printr-un voucher valoric, la alegerea
                        dumneavoastră.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item bg-dark">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed bg-dark text-white"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Ce se întâmplă dacă produsul se defectează după perioada
                        de returnare?
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Dacă produsul se defectează în perioada de garanție
                        (legală sau comercială), acesta va fi reparat sau
                        înlocuit gratuit. Contactați serviciul nostru de relații
                        cu clienții sau aduceți produsul direct în unul din
                        service-urile autorizate menționate în certificatul de
                        garanție.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item bg-dark">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button collapsed bg-dark text-white"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        Ce documente trebuie să prezint pentru a returna un
                        produs?
                      </button>
                    </h2>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Pentru returnarea unui produs aveți nevoie de factura
                        sau bonul fiscal care dovedește achiziția, certificatul
                        de garanție (dacă este cazul) și formularul de retur
                        completat. Vă recomandăm să păstrați ambalajul original
                        și toate accesoriile produsului pentru a facilita
                        procesul de returnare.
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  9. Contact pentru returnări
                </h4>
                <p className="mb-2">
                  Pentru orice întrebări sau solicitări privind returnarea
                  produselor, vă rugăm să ne contactați la:
                </p>
                <address className="mb-4">
                  <strong>Departamentul Returnări Computer Bazaar</strong>
                  <br />
                  Bulevardul Iuliu Maniu 7, București
                  <br />
                  Email: retururi@computerbazaar.ro
                  <br />
                  Telefon: 0721 123 456
                  <br />
                  Program: Luni-Vineri, 9:00-18:00
                </address>

                <div className="alert alert-secondary">
                  <p className="mb-0">
                    <strong>Data ultimei actualizări:</strong> 18 Aprilie 2025
                  </p>
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

export default ReturnPolicyPage;
