COMPUTER BAZAAR - Online Computer Store
======================================

Descriere Generală
-----------------

Computer Bazaar este o platformă e-commerce avansată concepută pentru vânzarea și gestionarea produselor IT, 
inclusiv computere, laptopuri și alte componente hardware. Proiectul este construit pe arhitectura MERN 
(MongoDB, Express, React, Node.js), oferind o experiență completă și performantă atât pentru clienți, cât și pentru administratori.

Scopul platformei este de a facilita achiziționarea de produse IT într-un mod intuitiv și securizat, 
permițând utilizatorilor să navigheze prin catalog, să adauge produse în coș, să efectueze plăți și să își gestioneze conturile. 
Administratorii beneficiază de un panou de control complet pentru gestionarea produselor, utilizatorilor și comenzilor.

Arhitectură
----------

Aplicația este construită pe o arhitectură modulară, compusă din mai multe componente principale:

- Frontend (React): Interfața utilizator construită cu React, care comunică cu backend-ul prin API REST. Utilizează Redux pentru gestionarea stării și React Router pentru navigare.

- Backend (Node.js + Express): Serviciul web principal care expune API-urile necesare pentru autentificare, gestionarea utilizatorilor, produselor și comenzilor. Implementează logica de afaceri și validează toate solicitările primite.

- Autentificare (JWT): Sistemul de autentificare bazat pe JSON Web Tokens, care asigură sesiuni securizate și controlul accesului. La fiecare cerere, token-ul JWT este verificat pentru a valida identitatea și permisiunile utilizatorului.

- Bază de Date (MongoDB): Datele aplicației sunt stocate într-o bază de date NoSQL MongoDB, care oferă flexibilitate și scalabilitate pentru produse, utilizatori, comenzi și alte entități.

- Server Web (Express): Serverul Express gestionează rutele API și servește conținutul static al aplicației frontend. Implementează middleware-uri pentru securitate, logging și gestionarea erorilor.

Această structură asigură o separare clară a responsabilităților în sistem și permite scalarea sau modificarea fiecărui modul independent. Comunicarea între frontend și backend este protejată prin HTTPS și token-uri de acces.

Stack Tehnologic
--------------

Platforma folosește un set modern de tehnologii:

- Frontend: 
  * React.js (JavaScript/TypeScript)
  * Redux pentru gestionarea stării
  * React Router pentru navigare
  * Bootstrap pentru styling responsive
  * Axios pentru comunicarea cu API-ul

- Backend: 
  * Node.js 
  * Express.js pentru API-ul web și logica de server
  * Mongoose pentru interacțiunea cu MongoDB
  * JWT pentru autentificare securizată

- Bază de Date: 
  * MongoDB (bază de date NoSQL)

- Alte tehnologii:
  * Bcrypt pentru hasharea parolelor
  * Multer pentru încărcarea fișierelor (imagini)
  * ESLint pentru stilul de codare
  * Postman pentru testarea API-urilor

Această combinație tehnologică asigură un echilibru între performanță, securitate și ușurință în dezvoltare.

Instalare și Rulare
------------------

Cerințe preliminare:
- Node.js (v14 sau mai recent)
- MongoDB (local sau Atlas)
- npm sau yarn

Pași de instalare:

1. Clonează repository-ul:
   git clone https://github.com/johnnyy06/ComputerBazaar.git
   cd computer-bazaar

2. Instalează dependențele pentru backend:
   cd backend
   npm init -y
   npm install express mongoose bcrypt jsonwebtoken dotenv cors multer cloudinary multer-storage-cloudinary
   npm install --save-dev nodemon

3. Instalează dependențele pentru frontend:
   cd ../frontend
   npm install react react-dom react-router-dom axios bootstrap bootstrap-icons @types/react @types/react-dom typescript vite recharts
   npm install --save-dev typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh

4. Configurează variabilele de mediu:
   - Creează un fișier .env în directorul backend cu variabile proprii de mediu
     

5. Pornește serverul de dezvoltare:
   - Pentru backend (din directorul backend):
     npm run dev
   - Pentru frontend (din directorul frontend):
     npm run build (ca sa faca build inainte de a rula frontend-ul)
     npm dev

6. Accesează aplicația la adresa http://localhost:5000

Funcționalități Principale
-------------------------

Computer Bazaar oferă o serie de funcționalități cheie pentru cumpărători și administratori:

Pentru utilizatori (guest și autentificați):

- Navigare și căutare în catalog: Posibilitatea de a naviga prin categorii de produse și de a căuta produse specifice.
  
- Vizualizare detalii produs: Pagini detaliate pentru fiecare produs, cu specificații tehnice, imagini, preț și disponibilitate.
  
- Coș de cumpărături: Adăugarea produselor în coș, actualizarea cantităților și calculul total al comenzii.
  
- Sistem de autentificare: Înregistrare, autentificare și recuperare parolă pentru utilizatori.
  
- Profil utilizator: Gestionarea datelor personale, adreselor de livrare și vizualizarea istoricului comenzilor.
  
- Procesare comandă: Flux complet de checkout, incluzând selectarea adresei, metodei de livrare și plată.
  
- Review-uri și rating-uri: Posibilitatea de a evalua și recenza produsele achiziționate.

Pentru administratori:

- Dashboard administrativ: Panou de control cu statistici și metrici esențiale.
  
- Gestionare produse: Adăugare, editare, ștergere produse și gestionarea stocului.
  
- Gestionare utilizatori: Vizualizare listă utilizatori, modificare roluri, activare/dezactivare conturi.
  
- Gestionare comenzi: Procesare, actualizare status și vizualizare comenzi.
  
- Rapoarte și statistici: Vizualizare rapoarte vânzări, produse populare, comportament utilizatori.

Roluri de Utilizatori
-------------------

ComputerBazaar definește trei tipuri de utilizatori, fiecare cu niveluri diferite de acces:

Guest (Vizitator):
- Poate naviga prin catalog și vizualiza produsele
- Poate adăuga produse în coș (stocat local)
- Poate căuta produse
- Nu poate finaliza o comandă fără autentificare
- Nu are acces la secțiunile de administrare

User (Utilizator autentificat):
- Are toate capacitățile unui guest
- Poate finaliza comenzi
- Poate salva adrese de livrare
- Poate vizualiza istoricul comenzilor
- Poate lăsa review-uri pentru produsele achiziționate
- Poate salva produse favorite
- Poate gestiona profilul personal

Admin (Administrator):
- Are toate capacitățile unui utilizator autentificat
- Acces la panoul de administrare
- Poate gestiona produsele (adăugare, editare, ștergere)
- Poate gestiona utilizatorii (vizualizare, modificare rol, dezactivare)
- Poate gestiona comenzile (vizualizare, procesare, actualizare status)
- Acces la rapoarte și statistici
- Poate gestiona categoriile și subcategoriile

Această separare pe roluri asigură că funcționalitățile sensibile sunt accesibile doar persoanelor autorizate și că interfața este adaptată pentru nevoile fiecărui tip de utilizator.

Structura proiectului
--------------------

computer-bazaar/
├── backend/                # Server Node.js + Express
│   ├── config/             # Configurări (baza de date, etc.)
│   ├── controllers/        # Controllere pentru logica de business
│   ├── middleware/         # Middleware-uri (auth, error handling, etc.)
│   ├── models/             # Modele Mongoose
│   ├── routes/             # Rute API
│   ├── utils/              # Utilități diverse
│   ├── uploads/            # Fișiere încărcate (imagini produse)
│   ├── package.json        # Dependențe backend
│   └── index.js           # Punctul de intrare pentru server
│
├── frontend/               # Aplicația React
│   ├── public/             # Fișiere statice
│   ├── src/                # Codul sursă
│   │   ├── components/     # Componente reutilizabile
│   │   ├── context/        # Context API (auth, cart, etc.)
│   │   ├── pages/          # Paginile aplicației
│   │   ├── services/       # Servicii (API calls)
│   │   ├── styles/         # Stiluri CSS/SCSS
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utilități frontend
│   │   ├── main.tsx        # Componenta principală
│   │   └── index.html      # Punctul de intrare
│   └── package.json        # Dependențe frontend
│
├── .gitignore              # Fișiere excluse din git
├── package.json            # Scripturi pentru întregul proiect
└── README.txt              # Documentație