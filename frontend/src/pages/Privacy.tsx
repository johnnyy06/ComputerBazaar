// frontend/src/pages/Privacy.tsx
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const PrivacyPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <h1 className="text-white mb-4">Politica de confidențialitate</h1>

            <div className="card bg-dark text-white mb-4">
              <div className="card-body p-4">
                <p className="card-text mb-4">
                  Computer Bazaar SRL acordă o importanță deosebită protecției
                  datelor cu caracter personal ale utilizatorilor site-ului
                  nostru, în conformitate cu Regulamentul (UE) 2016/679 (GDPR).
                  Vă rugăm să citiți cu atenție această Politică de
                  confidențialitate pentru a înțelege cum colectăm, utilizăm,
                  protejăm și prelucrăm datele dumneavoastră personale.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  1. Operatorul datelor cu caracter personal
                </h4>
                <p className="mb-4">
                  Operatorul datelor cu caracter personal este Computer Bazaar
                  SRL, cu sediul în Bulevardul Iuliu Maniu 7, București,
                  înregistrată la Registrul Comerțului sub nr. J40/1234/2020,
                  CUI RO12345678, telefon: 0721 123 456, email:
                  contact@computerbazaar.ro.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  2. Datele cu caracter personal pe care le colectăm
                </h4>
                <p className="mb-2">
                  În funcție de interacțiunea dumneavoastră cu site-ul nostru,
                  putem colecta următoarele categorii de date personale:
                </p>
                <ul className="mb-4">
                  <li className="mb-2">
                    <strong>Date de identificare:</strong> nume, prenume, adresă
                    de email, număr de telefon;
                  </li>
                  <li className="mb-2">
                    <strong>Date de livrare:</strong> adresa de livrare, codul
                    poștal, localitatea;
                  </li>
                  <li className="mb-2">
                    <strong>Date de facturare:</strong> informațiile necesare
                    pentru emiterea facturilor, inclusiv adresa de facturare și,
                    după caz, codul de înregistrare fiscală;
                  </li>
                  <li className="mb-2">
                    <strong>Date de cont:</strong> numele de utilizator, parola
                    (stocată în formă criptată), istoricul comenzilor;
                  </li>
                  <li className="mb-2">
                    <strong>Date de navigare:</strong> adresa IP, tipul de
                    browser, timpul petrecut pe site, paginile vizitate;
                  </li>
                  <li className="mb-2">
                    <strong>Date de plată:</strong> Nu stocăm datele cardului
                    dumneavoastră. Acestea sunt procesate direct de către
                    procesatorii de plăți parteneri prin conexiuni securizate.
                  </li>
                </ul>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  3. Scopurile și temeiurile prelucrării datelor
                </h4>
                <p className="mb-2">
                  Prelucrăm datele dumneavoastră personale în următoarele
                  scopuri și pe baza următoarelor temeiuri legale:
                </p>
                <ul className="mb-4">
                  <li className="mb-2">
                    <strong>Executarea contractului</strong> (Art. 6(1)(b)
                    GDPR): pentru a procesa comenzile dumneavoastră, a livra
                    produsele, a facilita plățile și a vă oferi servicii
                    post-vânzare;
                  </li>
                  <li className="mb-2">
                    <strong>Interesul legitim</strong> (Art. 6(1)(f) GDPR):
                    pentru a îmbunătăți serviciile noastre, a asigura
                    securitatea site-ului, a preveni fraudele, a gestiona
                    reclamațiile și a ne apăra drepturile legale;
                  </li>
                  <li className="mb-2">
                    <strong>Obligația legală</strong> (Art. 6(1)(c) GDPR):
                    pentru a respecta obligațiile fiscale, contabile și alte
                    obligații legale;
                  </li>
                  <li className="mb-2">
                    <strong>Consimțământul dumneavoastră</strong> (Art. 6(1)(a)
                    GDPR): pentru a vă trimite comunicări de marketing direct,
                    newsletter-uri sau pentru a plasa cookie-uri neesențiale.
                  </li>
                </ul>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  4. Perioada de stocare a datelor
                </h4>
                <p className="mb-2">
                  Păstrăm datele dumneavoastră personale doar atât timp cât este
                  necesar pentru îndeplinirea scopurilor pentru care au fost
                  colectate, cu excepția cazurilor în care legea prevede o
                  perioadă mai lungă de păstrare.
                </p>
                <ul className="mb-4">
                  <li className="mb-2">
                    <strong>Datele contului:</strong> cât timp contul
                    dumneavoastră este activ sau până când solicitați ștergerea
                    acestuia;
                  </li>
                  <li className="mb-2">
                    <strong>Datele comenzilor:</strong> 10 ani de la data
                    ultimei tranzacții (conform legislației fiscale);
                  </li>
                  <li className="mb-2">
                    <strong>Datele de marketing:</strong> până la retragerea
                    consimțământului dumneavoastră;
                  </li>
                  <li className="mb-2">
                    <strong>Datele de navigare:</strong> maximum 2 ani de la
                    colectare, în formă anonimizată pentru analize statistice.
                  </li>
                </ul>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  5. Destinatarii datelor
                </h4>
                <p className="mb-2">
                  În anumite circumstanțe, putem divulga datele dumneavoastră
                  personale următoarelor categorii de destinatari:
                </p>
                <ul className="mb-4">
                  <li className="mb-2">
                    <strong>Furnizori de servicii:</strong> companii de curierat
                    pentru livrarea produselor, procesatori de plăți pentru
                    procesarea tranzacțiilor, furnizori de servicii IT pentru
                    mentenanța sistemelor;
                  </li>
                  <li className="mb-2">
                    <strong>Autorități publice:</strong> când suntem obligați
                    prin lege sau pentru a proteja drepturile, proprietatea sau
                    siguranța noastră sau a altora;
                  </li>
                  <li className="mb-2">
                    <strong>Parteneri de afaceri:</strong> producători sau
                    distribuitori pentru gestionarea garanțiilor produselor;
                  </li>
                  <li className="mb-2">
                    <strong>Consilierii profesionali:</strong> avocați,
                    contabili, auditori în contextul serviciilor profesionale pe
                    care ni le furnizează.
                  </li>
                </ul>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  6. Transferul datelor în afara UE/SEE
                </h4>
                <p className="mb-4">
                  În principiu, datele dumneavoastră personale sunt procesate în
                  România sau în alte state din Uniunea Europeană/Spațiul
                  Economic European. În cazul în care sunt necesare transferuri
                  către țări din afara UE/SEE, ne vom asigura că acestea se
                  realizează în conformitate cu prevederile GDPR și că există
                  garanții adecvate pentru protecția datelor dumneavoastră (de
                  exemplu, decizii de adecvare, clauze contractuale standard,
                  reguli corporatiste obligatorii).
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  7. Drepturile dumneavoastră
                </h4>
                <p className="mb-2">
                  În conformitate cu GDPR, beneficiați de următoarele drepturi:
                </p>
                <ul className="mb-4">
                  <li className="mb-2">
                    <strong>Dreptul de acces:</strong> puteți solicita
                    informații despre datele personale pe care le deținem despre
                    dumneavoastră;
                  </li>
                  <li className="mb-2">
                    <strong>Dreptul la rectificare:</strong> puteți corecta
                    datele inexacte sau incomplete;
                  </li>
                  <li className="mb-2">
                    <strong>
                      Dreptul la ștergere ("dreptul de a fi uitat"):
                    </strong>{" "}
                    puteți solicita ștergerea datelor dumneavoastră personale în
                    anumite circumstanțe;
                  </li>
                  <li className="mb-2">
                    <strong>Dreptul la restricționarea prelucrării:</strong>{" "}
                    puteți solicita limitarea prelucrării datelor dumneavoastră;
                  </li>
                  <li className="mb-2">
                    <strong>Dreptul la portabilitatea datelor:</strong> puteți
                    primi datele furnizate într-un format structurat și puteți
                    solicita transferul acestora;
                  </li>
                  <li className="mb-2">
                    <strong>Dreptul la opoziție:</strong> vă puteți opune
                    prelucrării datelor dumneavoastră în anumite circumstanțe,
                    inclusiv marketingului direct;
                  </li>
                  <li className="mb-2">
                    <strong>
                      Dreptul de a nu face obiectul unei decizii bazate exclusiv
                      pe prelucrarea automată;
                    </strong>
                  </li>
                  <li className="mb-2">
                    <strong>Dreptul de a retrage consimțământul</strong> în
                    orice moment, fără a afecta legalitatea prelucrării
                    anterioare.
                  </li>
                </ul>
                <p className="mb-4">
                  Pentru a vă exercita aceste drepturi, vă rugăm să ne
                  contactați la adresa de email: contact@computerbazaar.ro sau
                  prin poștă la adresa: Bulevardul Iuliu Maniu 7, București.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  8. Securitatea datelor
                </h4>
                <p className="mb-2">
                  Am implementat măsuri tehnice și organizatorice adecvate
                  pentru a proteja datele dumneavoastră personale împotriva
                  accesului neautorizat, pierderii, distrugerii sau alterării
                  accidentale. Aceste măsuri includ:
                </p>
                <ul className="mb-4">
                  <li className="mb-2">
                    Utilizarea conexiunilor criptate SSL/TLS pentru transmiterea
                    datelor;
                  </li>
                  <li className="mb-2">
                    Stocarea parolelor în format criptat;
                  </li>
                  <li className="mb-2">
                    Accesul restricționat la datele personale, limitat doar la
                    personalul autorizat;
                  </li>
                  <li className="mb-2">
                    Actualizarea regulată a sistemelor de securitate;
                  </li>
                  <li className="mb-2">
                    Instruirea personalului cu privire la cerințele de protecție
                    a datelor;
                  </li>
                  <li className="mb-2">
                    Evaluări periodice ale riscurilor și auditări de securitate.
                  </li>
                </ul>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  9. Cookie-uri
                </h4>
                <p className="mb-4">
                  Site-ul nostru utilizează cookie-uri pentru a îmbunătăți
                  experiența dumneavoastră de navigare. Puteți găsi mai multe
                  informații despre cookie-urile pe care le folosim și cum le
                  puteți gestiona în Politica noastră de Cookie-uri, disponibilă
                  pe site.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  10. Modificări ale politicii de confidențialitate
                </h4>
                <p className="mb-4">
                  Ne rezervăm dreptul de a actualiza această Politică de
                  confidențialitate periodic pentru a reflecta schimbările în
                  practicile noastre de prelucrare a datelor sau modificările
                  legislative. Versiunea actualizată va fi publicată pe site-ul
                  nostru, iar modificările importante vor fi notificate în mod
                  corespunzător.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  11. Plângeri
                </h4>
                <p className="mb-2">
                  Dacă considerați că prelucrarea datelor dumneavoastră
                  personale încalcă prevederile legale, aveți dreptul de a
                  depune o plângere la Autoritatea Națională de Supraveghere a
                  Prelucrării Datelor cu Caracter Personal (ANSPDCP):
                </p>
                <address className="mb-4">
                  <strong>ANSPDCP</strong>
                  <br />
                  B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, București
                  <br />
                  Email: anspdcp@dataprotection.ro
                  <br />
                  Web: www.dataprotection.ro
                </address>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  12. Contact
                </h4>
                <p className="mb-2">
                  Pentru orice întrebări, comentarii sau solicitări referitoare
                  la această Politică de confidențialitate sau la modul în care
                  prelucrăm datele dumneavoastră personale, vă rugăm să ne
                  contactați la:
                </p>
                <address className="mb-4">
                  <strong>Computer Bazaar SRL</strong>
                  <br />
                  Bulevardul Iuliu Maniu 7, București
                  <br />
                  Email: contact@computerbazaar.ro
                  <br />
                  Telefon: 0721 123 456
                </address>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  13. Responsabilul cu protecția datelor (DPO)
                </h4>
                <p className="mb-4">
                  Am desemnat un Responsabil cu Protecția Datelor care poate fi
                  contactat pentru orice aspecte legate de prelucrarea datelor
                  dumneavoastră personale sau exercitarea drepturilor
                  dumneavoastră la adresa de email: dpo@computerbazaar.ro.
                </p>

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

export default PrivacyPage;
