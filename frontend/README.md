# Computer Bazaar Frontend

Aceasta este aplicația frontend pentru Computer Bazaar, o platformă de e-commerce dedicată calculatoarelor, laptopurilor și componentelor hardware.

## Tehnologii Utilizate

- **React**: Bibliotecă JavaScript pentru construirea interfețelor utilizator
- **TypeScript**: Pentru dezvoltare JavaScript cu tipare sigură
- **React Router**: Pentru navigare și rutare în cadrul aplicației
- **Bootstrap**: Pentru design responsiv și componente UI
- **Context API**: Pentru gestionarea stării globale (context pentru Autentificare și Coș)
- **Axios**: Pentru cereri API
- **Recharts**: Pentru vizualizarea datelor în panoul de administrare

## Structura Proiectului

```
frontend/
├── public/              # Fișiere statice precum imagini
├── src/
│   ├── components/      # Componente UI reutilizabile
│   ├── context/         # Furnizori de context pentru starea globală
│   ├── hooks/           # Hook-uri React personalizate
│   ├── pages/           # Componente pagină
│   ├── services/        # Servicii API și utilități
│   ├── main.tsx         # Punct de intrare pentru aplicație
│   └── App.tsx          # Componenta principală a aplicației
```

## Funcționalități

### Autentificare Utilizator

- **Login și Înregistrare**: Autentificare utilizator cu token-uri JWT
- **Gestionare Profil**: Actualizarea informațiilor utilizatorului și a parolei
- **Control acces bazat pe roluri**: Funcționalități diferite pentru vizitatori, utilizatori și administratori

### Navigare Produse

- **Categorii**: Răsfoirea produselor pe categorii (Procesoare, Plăci video, Plăci de bază, etc.)
- **Filtrare și Sortare**: Filtrarea produselor după diverse atribute (preț, brand, etc.)
- **Căutare**: Căutarea produselor după cuvinte cheie
- **Detalii Produs**: Vizualizarea informațiilor detaliate, specificațiilor și imaginilor produselor

### Experiența de Cumpărare

- **Coș de Cumpărături**: Adăugarea produselor în coș, actualizarea cantităților, eliminarea articolelor
- **Proces de Checkout**: Checkout în mai mulți pași cu opțiuni de livrare, facturare și plată
- **Gestionare Adrese**: Salvarea și gestionarea mai multor adrese de livrare

### Panoul Utilizatorului

- **Istoricul Comenzilor**: Vizualizarea comenzilor anterioare și a stării acestora
- **Favorite**: Salvarea produselor la favorite pentru mai târziu
- **Agenda de Adrese**: Gestionarea adreselor de livrare
- **Setări Cont**: Actualizarea informațiilor personale și a parolei

### Funcții Administrative

- **Panou de Control**: Prezentare generală a vânzărilor, utilizatorilor și stocurilor
- **Gestionare Produse**: Adăugare, editare și ștergere produse
- **Gestionare Utilizatori**: Vizualizare și gestionare conturi utilizator
- **Gestionare Comenzi**: Procesare și urmărire comenzi

## Componente

### Componente UI de Bază

- **Navbar**: Navigare și căutare
- **Footer**: Linkuri și informații site
- **ProductCard**: Afișarea rezumatului produsului în listări
- **ProductGrid**: Afișarea mai multor produse într-un grid
- **Pagination**: Navigare prin mai multe pagini de conținut

### Componente Produs

- **ProductGallery**: Afișarea mai multor imagini ale produsului
- **ProductInfo**: Detalii și descriere produs
- **ProductSpecs**: Specificații tehnice în format structurat
- **ProductActions**: Adăugare în coș, selectare cantitate, etc.
- **ProductStock**: Afișarea stării disponibilității stocului

### Componente pentru Cumpărături

- **Cart**: Vizualizare și gestionare coș de cumpărături
- **AddressSelector**: Selectare din adresele salvate
- **AddressManagement**: Adăugare, editare și ștergere adrese
- **PasswordChange**: Permite utilizatorilor să-și schimbe parola

### Componente Formular

- **ImageUpload**: Încărcare și previzualizare imagini produs
- **FilterSidebar**: Filtrare produse după diverse criterii

### Componente Administrative

- **AdminSidebar**: Navigare pentru paginile de administrare
- **DashboardStats**: Afișare statistici pentru panoul de administrare
- **ProductForm**: Formular pentru adăugare/editare produse

## Pagini

### Pagini Publice

- **Home**: Pagina principală cu produse recomandate și promoții
- **Login/Register**: Autentificare utilizator
- **ProductPage**: Informații detaliate despre produs
- **CategoryProducts**: Răsfoirea produselor pe categorii
- **Cart**: Vizualizare și gestionare coș de cumpărături
- **About, Privacy, Terms, etc.**: Pagini de informații statice
- **Blog**: Articole și ghiduri

### Pagini Protejate (Utilizator)

- **Profile**: Gestionare profil utilizator
- **Orders**: Istoric comenzi și urmărire
- **Addresses**: Gestionare adrese
- **Favorites**: Produse salvate

### Pagini Administrative

- **Dashboard**: Prezentare generală pentru admin
- **ProductManagement**: Gestionare produse
- **UserManagement**: Gestionare utilizatori
- **OrderManagement**: Gestionare comenzi

## Furnizori de Context

- **AuthContext**: Gestionează starea de autentificare a utilizatorului
- **CartContext**: Gestionează starea coșului de cumpărături

## Hook-uri

- **useAuth**: Acces la contextul de autentificare
- **useCart**: Acces la contextul coșului de cumpărături

## Servicii API

- **authService**: Apeluri API pentru autentificare
- **productService**: Apeluri API legate de produse
- **userService**: Apeluri API pentru profilul utilizatorului
- **addressService**: Apeluri API pentru gestionarea adreselor
- **adminService**: Apeluri API specifice administratorului
- **uploadService**: Gestionarea încărcărilor de fișiere

## Autentificare

Aplicația utilizează autentificare bazată pe token-uri JWT. Token-urile sunt stocate în localStorage și incluse automat în cererile API folosind interceptoarele Axios.

Roluri utilizator:

- **Vizitator**: Neautentificat, acces limitat
- **Utilizator**: Autentificat cu privilegii standard
- **Administrator**: Autentificat cu privilegii administrative

## Gestionarea Stării

- **AuthContext**: Gestionează starea de autentificare a utilizatorului (login, logout, date utilizator)
- **CartContext**: Gestionează starea coșului (adăugare, eliminare, actualizare cantități)

## Stilizare

Aplicația utilizează:

- **Bootstrap** pentru layout responsiv și componente UI
- **CSS Modules** pentru stilizare specifică componentelor
- **Variabile CSS personalizate** pentru tematizare (definite în `src/pages/styles.css`)

## Navigare

Navigarea este gestionată de React Router cu rute protejate pentru utilizatorii autentificați și paginile administrative.

## Design Responsiv

Aplicația este complet responsivă și funcționează pe:

- Desktop
- Tabletă
- Dispozitive mobile

## Gestionarea Sesiunilor

Sesiunile utilizatorilor sunt gestionate prin token-uri JWT. Când un utilizator se autentifică, primește un token care este stocat în localStorage și utilizat pentru a autoriza cererile la API.

## Integrare Backend

Frontend-ul se conectează la un backend RESTful bazat pe Express/Node.js. Toate cererile API sunt făcute prin intermediul serviciului Axios configurat, care gestionează token-urile, erorile și alte aspecte ale comunicării.

## Performanță și Optimizare

- Lazy loading pentru componente și pagini mari
- Optimizarea imaginilor și a activelor
- Memorare pentru a reduce re-renderizarea inutilă a componentelor

## Localizare

Aplicația este configurată în limba română, dar poate fi extinsă pentru a sprijini mai multe limbi în viitor.

## Securitate

- Validarea datelor de intrare pe partea clientului
- Sanitizarea datelor de ieșire
- Protecție CSRF
- Rute protejate pentru conținutul restricționat
