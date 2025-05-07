// frontend/src/pages/RTX4000Series.tsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import styles from "./RTX4000Series.module.css";

interface GpuModel {
  id: string;
  name: string;
  image: string;
  price: number;
  memory: string;
  cuda: number;
  boost: string;
  description: string;
  specs: {
    [key: string]: string;
  };
}

const RTX4000Series: React.FC = () => {
  // Date pentru fiecare model din seria RTX 4000
  const gpuModels: GpuModel[] = [
    {
      id: "rtx4090",
      name: "NVIDIA GeForce RTX 4090",
      image: "/images/rtx4090.jpg",
      price: 9999,
      memory: "24GB GDDR6X",
      cuda: 16384,
      boost: "2.52 GHz",
      description:
        "Cel mai puternic GPU din serie, RTX 4090 oferă performanțe extreme pentru gaming și creație de conținut, cu o putere de procesare grafică fără precedent.",
      specs: {
        Arhitectură: "NVIDIA Ada Lovelace",
        Memorie: "24GB GDDR6X",
        "CUDA Cores": "16384",
        "Boost Clock": "2.52 GHz",
        "Bus Width": "384-bit",
        "Ray Tracing Cores": "128 Gen 3",
        "Tensor Cores": "512 Gen 4",
        TDP: "450W",
        Interfață: "PCIe 4.0",
        Porturi: "HDMI 2.1, DisplayPort 1.4a",
      },
    },
    {
      id: "rtx4080",
      name: "NVIDIA GeForce RTX 4080",
      image: "/images/rtx4080.jpg",
      price: 7499,
      memory: "16GB GDDR6X",
      cuda: 9728,
      boost: "2.51 GHz",
      description:
        "RTX 4080 oferă performanțe de vârf pentru gaming și creație de conținut, fiind o alegere excelentă pentru cei care doresc o placă video premium.",
      specs: {
        Arhitectură: "NVIDIA Ada Lovelace",
        Memorie: "16GB GDDR6X",
        "CUDA Cores": "9728",
        "Boost Clock": "2.51 GHz",
        "Bus Width": "256-bit",
        "Ray Tracing Cores": "76 Gen 3",
        "Tensor Cores": "304 Gen 4",
        TDP: "320W",
        Interfață: "PCIe 4.0",
        Porturi: "HDMI 2.1, DisplayPort 1.4a",
      },
    },
    {
      id: "rtx4070ti",
      name: "NVIDIA GeForce RTX 4070 Ti",
      image: "/images/rtx4070ti.jpg",
      price: 5499,
      memory: "12GB GDDR6X",
      cuda: 7680,
      boost: "2.61 GHz",
      description:
        "RTX 4070 Ti oferă un echilibru excelent între performanță și preț, fiind ideală pentru gaming la rezoluție 1440p și 4K.",
      specs: {
        Arhitectură: "NVIDIA Ada Lovelace",
        Memorie: "12GB GDDR6X",
        "CUDA Cores": "7680",
        "Boost Clock": "2.61 GHz",
        "Bus Width": "192-bit",
        "Ray Tracing Cores": "60 Gen 3",
        "Tensor Cores": "240 Gen 4",
        TDP: "285W",
        Interfață: "PCIe 4.0",
        Porturi: "HDMI 2.1, DisplayPort 1.4a",
      },
    },
    {
      id: "rtx4070",
      name: "NVIDIA GeForce RTX 4070",
      image: "/images/rtx4070.jpg",
      price: 4299,
      memory: "12GB GDDR6X",
      cuda: 5888,
      boost: "2.48 GHz",
      description:
        "RTX 4070 este o placă video de înaltă performanță care oferă o experiență de gaming excelentă la 1440p, cu suport pentru tehnologii avansate precum DLSS 3.",
      specs: {
        Arhitectură: "NVIDIA Ada Lovelace",
        Memorie: "12GB GDDR6X",
        "CUDA Cores": "5888",
        "Boost Clock": "2.48 GHz",
        "Bus Width": "192-bit",
        "Ray Tracing Cores": "46 Gen 3",
        "Tensor Cores": "184 Gen 4",
        TDP: "200W",
        Interfață: "PCIe 4.0",
        Porturi: "HDMI 2.1, DisplayPort 1.4a",
      },
    },
    {
      id: "rtx4060ti",
      name: "NVIDIA GeForce RTX 4060 Ti",
      image: "/images/rtx4060ti.jpg",
      price: 3299,
      memory: "8GB GDDR6",
      cuda: 4352,
      boost: "2.54 GHz",
      description:
        "RTX 4060 Ti oferă performanțe excelente pentru gaming la 1080p și 1440p, fiind o alegere foarte bună pentru majoritatea gamers.",
      specs: {
        Arhitectură: "NVIDIA Ada Lovelace",
        Memorie: "8GB GDDR6",
        "CUDA Cores": "4352",
        "Boost Clock": "2.54 GHz",
        "Bus Width": "128-bit",
        "Ray Tracing Cores": "34 Gen 3",
        "Tensor Cores": "136 Gen 4",
        TDP: "160W",
        Interfață: "PCIe 4.0",
        Porturi: "HDMI 2.1, DisplayPort 1.4a",
      },
    },
    {
      id: "rtx4060",
      name: "NVIDIA GeForce RTX 4060",
      image: "/images/rtx4060.jpg",
      price: 2499,
      memory: "8GB GDDR6",
      cuda: 3072,
      boost: "2.46 GHz",
      description:
        "RTX 4060 este alegerea perfectă pentru gaming la 1080p, oferind suport pentru tehnologii precum ray tracing și DLSS, la un preț accesibil.",
      specs: {
        Arhitectură: "NVIDIA Ada Lovelace",
        Memorie: "8GB GDDR6",
        "CUDA Cores": "3072",
        "Boost Clock": "2.46 GHz",
        "Bus Width": "128-bit",
        "Ray Tracing Cores": "24 Gen 3",
        "Tensor Cores": "96 Gen 4",
        TDP: "115W",
        Interfață: "PCIe 4.0",
        Porturi: "HDMI 2.1, DisplayPort 1.4a",
      },
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <div className={styles.seriesHero}>
          <div className={styles.seriesHeader}>
            <h1>NVIDIA GeForce RTX 4000 Series</h1>
            <p className={styles.seriesSubtitle}>
              Arhitectura revoluționară NVIDIA Ada Lovelace
            </p>
          </div>
          <div className={styles.seriesImage}>
            <img
              src="/images/RTX-super_series4000.jpg"
              alt="RTX 4000 Series"
              className="img-fluid"
            />
          </div>
        </div>

        <div className={styles.seriesIntro}>
          <h2>Puterea viitorului gaming</h2>
          <p>
            Seria NVIDIA GeForce RTX 4000 reprezintă cea mai avansată generație
            de plăci video pentru gaming și creație de conținut. Bazată pe
            arhitectura NVIDIA Ada Lovelace, această serie oferă performanțe
            excepționale, eficiență energetică îmbunătățită și suport pentru
            cele mai noi tehnologii precum DLSS 3, ray tracing de generația a
            3-a și Tensor Cores de generația a 4-a.
          </p>
        </div>

        <div className={styles.keyFeatures}>
          <h3>Caracteristici cheie</h3>
          <div className="row">
            <div className="col-md-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <i className="bi bi-cpu"></i>
                </div>
                <h4>Arhitectura Ada Lovelace</h4>
                <p>
                  Noua arhitectură NVIDIA oferă un salt masiv în eficiență și
                  performanță, cu CUDA cores îmbunătățite și tehnologii de
                  ultimă generație.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <i className="bi bi-lightning"></i>
                </div>
                <h4>DLSS 3</h4>
                <p>
                  NVIDIA Deep Learning Super Sampling generația 3 folosește AI
                  pentru a genera cadre complet noi, crescând dramatic rata de
                  cadre și fluiditatea în jocuri.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <i className="bi bi-brightness-high"></i>
                </div>
                <h4>Ray Tracing Generația 3</h4>
                <p>
                  Ray Tracing Cores îmbunătățite oferă efecte de iluminare,
                  umbre și reflexii realiste, transformând experiența vizuală în
                  jocuri.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modelComparison}>
          <h3>Comparație modele RTX 4000</h3>
          <div className="table-responsive">
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>CUDA Cores</th>
                  <th>Memorie</th>
                  <th>Boost Clock</th>
                  <th>Preț (Lei)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {gpuModels.map((gpu) => (
                  <tr key={gpu.id}>
                    <td>{gpu.name}</td>
                    <td>{gpu.cuda}</td>
                    <td>{gpu.memory}</td>
                    <td>{gpu.boost}</td>
                    <td>{gpu.price} Lei</td>
                    <td>
                      <a
                        href={`#${gpu.id}`}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Detalii
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.modelsSection}>
          <h3>Modele disponibile</h3>

          {gpuModels.map((gpu) => (
            <div id={gpu.id} key={gpu.id} className={styles.modelCard}>
              <div className="row">
                <div className="col-md-4">
                  <div className={styles.modelImage}>
                    <img src={gpu.image} alt={gpu.name} className="img-fluid" />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className={styles.modelInfo}>
                    <h4>{gpu.name}</h4>
                    <p className={styles.modelPrice}>{gpu.price} Lei</p>
                    <p className={styles.modelDescription}>{gpu.description}</p>

                    <div className={styles.modelSpecs}>
                      <h5>Specificații</h5>
                      <div className="row">
                        {Object.entries(gpu.specs).map(
                          ([key, value], index) => (
                            <div className="col-md-6" key={index}>
                              <div className={styles.specItem}>
                                <span className={styles.specName}>{key}:</span>
                                <span className={styles.specValue}>
                                  {value}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.techSection}>
          <h3>Tehnologii NVIDIA RTX</h3>
          <div className="row">
            <div className="col-md-6">
              <div className={styles.techCard}>
                <h4>NVIDIA DLSS 3</h4>
                <p>
                  Deep Learning Super Sampling folosește inteligența artificială
                  pentru a genera cadre complet noi și pentru a crește dramatic
                  rata de cadre. DLSS 3 îmbunătățește performanța în jocuri și
                  aplicații, păstrând o calitate vizuală excelentă.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className={styles.techCard}>
                <h4>NVIDIA Reflex</h4>
                <p>
                  Reduce latența sistemului pentru a oferi timp de răspuns mai
                  rapid în jocuri, ceea ce este crucial pentru titlurile
                  competitive. Reflex optimizează pipeline-ul de randare pentru
                  a reduce timpul între acțiunile utilizatorului și afișarea lor
                  pe ecran.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className={styles.techCard}>
                <h4>Ray Tracing accelerat hardware</h4>
                <p>
                  Ray Tracing Cores de generația a 3-a simulează comportamentul
                  fizic al luminii pentru a produce efecte de iluminare,
                  reflexii și umbre ultra-realiste, transformând în totalitate
                  aspectul și senzația jocurilor.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className={styles.techCard}>
                <h4>NVIDIA Broadcast</h4>
                <p>
                  Transformă orice cameră și microfon într-un studio de
                  producție virtual, cu efecte AI precum anularea zgomotului,
                  eliminarea fundalului și încadrare automată, ideale pentru
                  streaming și conferințe video.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.ctaSection}>
          <h3>Pregătit să faci upgrade?</h3>
          <p>
            Seria RTX 4000 reprezintă cea mai avansată tehnologie NVIDIA
            disponibilă pentru gameri și creatori de conținut. Alege modelul
            potrivit pentru nevoile tale și bucură-te de viitorul gaming-ului
            acum.
          </p>
          <div className={styles.ctaButtons}>
            <Link
              to="/category/Plăci%20video"
              className="btn btn-danger btn-lg"
            >
              Vezi toate plăcile video
            </Link>
            <Link
              to="/configurator"
              className="btn btn-outline-light btn-lg ms-3"
            >
              Configurează PC-ul tău
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RTX4000Series;
