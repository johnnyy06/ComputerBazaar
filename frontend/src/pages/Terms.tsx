// frontend/src/pages/Terms.tsx
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const TermsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <h1 className="text-white mb-4">Termeni și condiții</h1>

            <div className="card bg-dark text-white mb-4">
              <div className="card-body p-4">
                <p className="card-text mb-4">
                  Vă rugăm să citiți cu atenție Termenii și Condițiile
                  prezentate mai jos înainte de a utiliza site-ul nostru.
                  Utilizarea site-ului ComputerBazaar implică acceptarea acestor
                  Termeni și Condiții. Dacă nu sunteți de acord cu acești
                  termeni, vă rugăm să nu utilizați site-ul nostru.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  1. Definiții
                </h4>
                <ul className="mb-4">
                  <li className="mb-2">
                    <strong>"Site"</strong> - site-ul web computerbazaar.ro și
                    toate subdomeniile acestuia.
                  </li>
                  <li className="mb-2">
                    <strong>"Utilizator"</strong> - orice persoană care
                    accesează și utilizează site-ul.
                  </li>
                  <li className="mb-2">
                    <strong>"Client"</strong> - orice utilizator care plasează o
                    comandă prin intermediul site-ului.
                  </li>
                  <li className="mb-2">
                    <strong>"Cont"</strong> - secțiunea din site accesibilă
                    utilizatorului prin folosirea adresei de e-mail și a
                    parolei.
                  </li>
                  <li className="mb-2">
                    <strong>"Comandă"</strong> - document electronic prin care
                    clientul își exprimă intenția de a cumpăra produse de pe
                    site.
                  </li>
                  <li className="mb-2">
                    <strong>"Companie"/"Noi"</strong> - Computer Bazaar SRL,
                    operator al site-ului.
                  </li>
                </ul>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  2. Utilizarea site-ului
                </h4>
                <p className="mb-2">
                  Utilizarea site-ului nostru este permisă oricărei persoane
                  fizice care a împlinit vârsta de 18 ani sau oricărei persoane
                  juridice legal constituite.
                </p>
                <p className="mb-2">
                  Ne rezervăm dreptul de a restricționa accesul utilizatorilor
                  la anumite secțiuni ale site-ului, precum și de a întrerupe
                  unilateral și în orice moment relațiile comerciale cu
                  utilizatorii care încalcă acești termeni și condiții.
                </p>
                <p className="mb-4">
                  Utilizatorul se obligă să folosească site-ul în conformitate
                  cu prevederile legale în vigoare, să nu deterioreze, modifice,
                  blocheze sau să impună o sarcină asupra site-ului.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  3. Crearea contului și securitatea
                </h4>
                <p className="mb-2">
                  Pentru a efectua o comandă, utilizatorul trebuie să își creeze
                  un cont pe site. În procesul de creare a contului,
                  utilizatorul este obligat să furnizeze informații corecte,
                  actuale și complete.
                </p>
                <p className="mb-2">
                  Utilizatorul este pe deplin responsabil pentru păstrarea
                  confidențialității datelor de acces la cont (email și parolă)
                  și pentru toate activitățile desfășurate din contul său.
                </p>
                <p className="mb-4">
                  Utilizatorul se obligă să notifice imediat Compania în cazul
                  utilizării neautorizate a contului său sau dacă observă orice
                  problemă de securitate legată de contul său.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  4. Produse și prețuri
                </h4>
                <p className="mb-2">
                  Toate produsele prezentate pe site sunt însoțite de o
                  descriere a principalelor caracteristici. Compania face toate
                  eforturile pentru a prezenta informații corecte și
                  actualizate, însă nu poate garanta disponibilitatea tuturor
                  produselor prezentate.
                </p>
                <p className="mb-2">
                  Prețurile produselor sunt exprimate în Lei (RON) și includ
                  TVA. Prețurile nu includ costurile de livrare, care vor fi
                  afișate separat în procesul de plasare a comenzii.
                </p>
                <p className="mb-4">
                  Compania își rezervă dreptul de a modifica prețurile
                  produselor în orice moment, fără notificare prealabilă. Prețul
                  aplicabil unei comenzi este cel afișat pe site la momentul
                  plasării comenzii.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  5. Comandă și plată
                </h4>
                <p className="mb-2">
                  Plasarea unei comenzi reprezintă acceptarea de către Client a
                  ofertei Companiei la prețurile și în condițiile afișate pe
                  site la data respectivă.
                </p>
                <p className="mb-2">
                  După plasarea comenzii, Clientul va primi un email de
                  confirmare automat. Compania va contacta Clientul pentru
                  confirmarea și procesarea comenzii.
                </p>
                <p className="mb-2">
                  Metodele de plată disponibile sunt: plata cu cardul online
                  (prin procesator autorizat), transfer bancar sau plata ramburs
                  la livrare.
                </p>
                <p className="mb-4">
                  Pentru plățile online cu cardul, Compania nu solicită și nu
                  stochează informații referitoare la cardul Clientului. Toate
                  informațiile sunt gestionate și procesate în siguranță de
                  către procesatorul de plăți.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  6. Livrare
                </h4>
                <p className="mb-2">
                  Livrarea produselor se face prin curier rapid la adresa
                  specificată de Client în comandă.
                </p>
                <p className="mb-2">
                  Termenul de livrare este de 1-3 zile lucrătoare de la
                  confirmarea comenzii, în funcție de zona de livrare și de
                  disponibilitatea produselor în stoc.
                </p>
                <p className="mb-2">
                  Pentru comenzile cu o valoare mai mare de 500 Lei, livrarea
                  este gratuită. Pentru comenzile sub această valoare, taxa de
                  livrare este afișată în procesul de comandă.
                </p>
                <p className="mb-4">
                  La primirea produselor, Clientul este rugat să verifice
                  integritatea coletului și să semneze procesul verbal de
                  recepție doar dacă coletul este intact.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  7. Dreptul de retragere
                </h4>
                <p className="mb-2">
                  În conformitate cu OUG nr. 34/2014, Clientul are dreptul de a
                  se retrage din contract în termen de 14 zile calendaristice de
                  la data primirii produsului, fără penalități și fără a fi
                  necesară invocarea unui motiv.
                </p>
                <p className="mb-2">
                  Pentru exercitarea acestui drept, Clientul trebuie să
                  informeze Compania printr-o declarație clară referitoare la
                  decizia sa de a se retrage din contract.
                </p>
                <p className="mb-2">
                  Produsul trebuie returnat în ambalajul original, cu toate
                  accesoriile, fără să prezinte urme de uzură sau deteriorare.
                </p>
                <p className="mb-4">
                  Costurile de returnare sunt suportate de către Client, cu
                  excepția cazului în care produsul prezintă defecte de
                  fabricație.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  8. Garanție
                </h4>
                <p className="mb-2">
                  Toate produsele comercializate beneficiază de condițiile de
                  garanție în conformitate cu legislația în vigoare și cu
                  politica de garanție a producătorului.
                </p>
                <p className="mb-2">
                  Durata garanției este specificată în fișa produsului și în
                  certificatul de garanție care însoțește produsul.
                </p>
                <p className="mb-4">
                  Pentru a beneficia de garanție, Clientul trebuie să păstreze
                  factura și certificatul de garanție.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  9. Răspundere
                </h4>
                <p className="mb-2">
                  Compania nu poate fi făcută responsabilă pentru: erori de
                  fotografiere sau redactare a informațiilor despre produse;
                  întreruperi ale serviciului cauzate de factori care nu țin de
                  controlul Companiei; utilizarea necorespunzătoare a produselor
                  de către Client.
                </p>
                <p className="mb-4">
                  Compania nu va fi răspunzătoare pentru niciun fel de daune
                  directe, indirecte, accidentale sau consecvențiale care
                  rezultă din utilizarea sau incapacitatea de a utiliza
                  produsele achiziționate.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  10. Proprietate intelectuală
                </h4>
                <p className="mb-2">
                  Tot conținutul site-ului, incluzând dar nelimitându-se la
                  texte, imagini, grafice, logo-uri, elemente de design, este
                  proprietatea Companiei sau a partenerilor săi și este protejat
                  de legile privind proprietatea intelectuală.
                </p>
                <p className="mb-4">
                  Utilizatorilor le este interzisă copierea, distribuirea,
                  publicarea, transferul către terțe părți, modificarea sau
                  utilizarea conținutului site-ului în orice alt scop fără
                  acordul prealabil scris al Companiei.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  11. Politica de confidențialitate
                </h4>
                <p className="mb-4">
                  Prin utilizarea site-ului, utilizatorul este de acord cu
                  colectarea și utilizarea informațiilor personale conform
                  Politicii de Confidențialitate, disponibilă pe site.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  12. Modificări ale termenilor și condițiilor
                </h4>
                <p className="mb-2">
                  Compania își rezervă dreptul de a modifica acești Termeni și
                  Condiții în orice moment, fără notificare prealabilă.
                </p>
                <p className="mb-4">
                  Versiunea actualizată a Termenilor și Condițiilor va fi
                  afișată pe site, iar continuarea utilizării site-ului după
                  publicarea modificărilor constituie acceptarea acestora.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  13. Legea aplicabilă și litigii
                </h4>
                <p className="mb-2">
                  Acești Termeni și Condiții sunt guvernați și interpretați în
                  conformitate cu legile din România.
                </p>
                <p className="mb-4">
                  Orice litigiu apărut în legătură cu utilizarea site-ului sau
                  cu acești Termeni și Condiții va fi soluționat pe cale
                  amiabilă. În cazul în care acest lucru nu este posibil,
                  litigiul va fi supus instanțelor judecătorești competente din
                  România.
                </p>

                <h4 className="border-bottom border-danger pb-2 mb-3">
                  14. Contact
                </h4>
                <p className="mb-2">
                  Pentru orice întrebări sau reclamații referitoare la acești
                  Termeni și Condiții, vă rugăm să ne contactați la:
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

export default TermsPage;
