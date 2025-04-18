import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
}

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // This would normally be an API call to fetch the specific blog post
    // For now, we'll use static data
    const fetchPost = () => {
      setLoading(true);
      setError(null);

      try {
        // Sample blog posts data
        const blogPostsData: BlogPost[] = [
          {
            id: 1,
            title:
              "Cum să alegi cea mai bună placă video pentru gaming în 2025",
            slug: "cum-sa-alegi-cea-mai-buna-placa-video-pentru-gaming-2025",
            excerpt:
              "Ghid complet pentru alegerea plăcii video potrivite nevoilor tale de gaming, în funcție de buget și cerințele jocurilor moderne.",
            content: `
              <p>Alegerea unei plăci video potrivite poate fi o provocare, mai ales într-o piață atât de dinamică și competitivă. În acest articol, vom analiza cele mai importante aspecte de luat în considerare atunci când vă alegeți următoarea placă video pentru gaming în 2025.</p>

              <h2>Ce să urmărești când alegi o placă video</h2>

              <p>Înainte de a vă aventura în lumea specificațiilor tehnice, trebuie să vă stabiliți obiectivele și bugetul. Iată câteva întrebări esențiale pe care ar trebui să vi le puneți:</p>

              <ul>
                <li>Ce rezoluție de joc doriți? (1080p, 1440p, 4K)</li>
                <li>Ce rată de reîmprospătare țintește monitorul dumneavoastră? (60Hz, 144Hz, 240Hz)</li>
                <li>Ce tipuri de jocuri jucați? (AAA, esports, indie)</li>
                <li>Aveți nevoie de caracteristici speciale? (ray tracing, DLSS, FSR)</li>
                <li>Care este bugetul dumneavoastră?</li>
              </ul>

              <h2>Principalele specificații de urmărit</h2>

              <p>Când analizați o placă video, acestea sunt cele mai importante specificații:</p>

              <h3>GPU (Unitatea de procesare grafică)</h3>
              <p>Inima plăcii video. În 2025, seria NVIDIA RTX 5000 și AMD Radeon RX 8000 reprezintă cele mai noi generații. Modelele mai noi oferă în general performanțe mai bune, dar și prețuri mai mari.</p>

              <h3>VRAM (Memoria video)</h3>
              <p>Măsurată în GB, reprezintă cantitatea de memorie dedicată pe care o are placa video. Pentru 1080p, 8GB este suficient pentru majoritatea jocurilor. Pentru 1440p, recomandăm 12GB, iar pentru 4K, cel puțin, 16GB.</p>

              <h3>Lățimea de bandă a memoriei</h3>
              <p>Acest factor determină cât de rapid poate accesa GPU-ul datele din VRAM. În 2025, standardele sunt GDDR6X și GDDR7, cu performanțe semnificativ mai bune decât generațiile anterioare.</p>

              <h3>Frecvența (Clock Speed)</h3>
              <p>Măsurată în MHz, aceasta determină cât de rapid funcționează GPU-ul. O frecvență mai mare înseamnă, de obicei, performanțe mai bune în jocuri.</p>

              <h3>TDP (Thermal Design Power)</h3>
              <p>Indică consumul de energie și căldura generată. Este important să vă asigurați că sursa de alimentare poate susține placa video și că sistemul dumneavoastră are o răcire adecvată.</p>

              <h2>Alegerea între NVIDIA, AMD și Intel</h2>

              <p>În 2025, piața continuă să fie dominată de NVIDIA și AMD, dar Intel a făcut progrese semnificative cu seria lor Arc.</p>

              <h3>NVIDIA</h3>
              <p>Cunoscut pentru performanțele superioare în ray tracing și tehnologia DLSS (Deep Learning Super Sampling). Seria RTX 5000 oferă cele mai bune performanțe, dar la prețuri premium. Modelele populare includ:</p>
              <ul>
                <li>RTX 5090: Ultra high-end pentru 4K și 8K gaming</li>
                <li>RTX 5080: High-end pentru 4K gaming</li>
                <li>RTX 5070: Mid-high pentru 1440p gaming</li>
                <li>RTX 5060: Mid-range pentru 1080p gaming</li>
              </ul>

              <h3>AMD</h3>
              <p>Cunoscut pentru raportul excelent calitate-preț și performanțe raw bune. Tehnologia FSR (FidelityFX Super Resolution) s-a îmbunătățit semnificativ. Modelele populare includ:</p>
              <ul>
                <li>Radeon RX 8900 XT: Competitor pentru RTX 5080/5090</li>
                <li>Radeon RX 8800 XT: High-end pentru 4K gaming</li>
                <li>Radeon RX 8700 XT: Mid-high pentru 1440p gaming</li>
                <li>Radeon RX 8600 XT: Mid-range pentru 1080p gaming</li>
              </ul>

              <h3>Intel</h3>
              <p>Newcomer-ul cu seria Arc oferă alternative interesante, în special pentru segmentul entry și mid-range:</p>
              <ul>
                <li>Arc A950: High-mid range pentru 1440p gaming</li>
                <li>Arc A750: Mid-range pentru 1080p gaming</li>
                <li>Arc A580: Entry-level pentru 1080p gaming</li>
              </ul>

              <h2>Recomandări pe categorii de buget în 2025</h2>

              <h3>Buget (sub 1500 Lei)</h3>
              <ul>
                <li>NVIDIA RTX 4050</li>
                <li>AMD Radeon RX 7600</li>
                <li>Intel Arc A580</li>
              </ul>

              <h3>Mid-range (1500-3000 Lei)</h3>
              <ul>
                <li>NVIDIA RTX 4060 Ti / RTX 5060</li>
                <li>AMD Radeon RX 7700 XT / RX 8600 XT</li>
                <li>Intel Arc A750</li>
              </ul>

              <h3>High-end (3000-5000 Lei)</h3>
              <ul>
                <li>NVIDIA RTX 4070 Super / RTX 5070</li>
                <li>AMD Radeon RX 7800 XT / RX 8700 XT</li>
                <li>Intel Arc A950</li>
              </ul>

              <h3>Ultra high-end (peste 5000 Lei)</h3>
              <ul>
                <li>NVIDIA RTX 4080 Super / RTX 4090 / RTX 5080</li>
                <li>AMD Radeon RX 7900 XTX / RX 8900 XT</li>
              </ul>

              <h2>Factori adițional de luat în considerare</h2>

              <h3>Răcire și design</h3>
              <p>Căutați plăci cu sisteme de răcire eficiente, în special pentru modelele high-end. Sistemele cu 2-3 ventilatoare sunt de preferat pentru cardurile performante.</p>

              <h3>Conectivitate</h3>
              <p>Asigurați-vă că placa are porturile necesare: HDMI 2.1a, DisplayPort 2.1, etc.</p>

              <h3>Dimensiuni</h3>
              <p>Verificați dacă placa video se potrivește în carcasa PC-ului dvs. Plăcile high-end moderne pot fi foarte mari.</p>

              <h3>Garanție și suport</h3>
              <p>Alegeți producători cu istoric bun de suport și garanții generoase.</p>

              <h2>Concluzie</h2>

              <p>Alegerea plăcii video perfecte în 2025 depinde de nevoile și bugetul dumneavoastră. Dacă jucați la 1080p, o placă mid-range ar trebuie să fie suficientă. Pentru 1440p sau 4K gaming, investiția într-o placă high-end vă va oferi o experiență mai bună pe termen lung.</p>

              <p>Nu uitați să luați în considerare întregul ecosistem - monitorul, procesorul și restul componentelor trebuie să fie echilibrate pentru a evita bottleneck-urile.</p>

              <p>La Computer Bazaar, găsiți o gamă completă de plăci video de la toți producătorii majori, cu prețuri competitive și garanție extinsă. Expertii noștri vă stau la dispoziție pentru recomandări personalizate în funcție de nevoile dumneavoastră specifice.</p>
            `,
            author: "Alexandru Popescu",
            date: "18 Aprilie 2025",
            category: "Hardware",
            tags: ["Gaming", "Plăci video", "RTX 4000", "AMD Radeon"],
            image: "/images/blog/gpu-guide.jpg",
          },
          {
            id: 2,
            title:
              "Procesoarele Intel vs AMD în 2025: Care sunt mai bune pentru productivitate?",
            slug: "procesoarele-intel-vs-amd-2025-productivitate",
            excerpt:
              "Analiză detaliată a performanțelor procesoarelor Intel și AMD pentru aplicațiile de productivitate și multitasking.",
            content: "Lorem ipsum dolor sit amet...",
            author: "Maria Ionescu",
            date: "15 Aprilie 2025",
            category: "Hardware",
            tags: ["Procesoare", "Intel", "AMD", "Productivitate"],
            image: "/images/blog/cpu-comparison.jpg",
          },
          {
            id: 3,
            title: "SSD vs HDD: Ce soluție de stocare să alegi în 2025",
            slug: "ssd-vs-hdd-solutie-stocare-2025",
            excerpt:
              "Comparație între tehnologiile SSD și HDD, avantaje, dezavantaje și recomandări pentru diferite utilizări.",
            content: "Lorem ipsum dolor sit amet...",
            author: "Andrei Dumitrescu",
            date: "10 Aprilie 2025",
            category: "Hardware",
            tags: ["SSD", "HDD", "Stocare", "NVMe"],
            image: "/images/blog/storage-solutions.jpg",
          },
          {
            id: 4,
            title: "Top 10 laptopuri pentru programatori în 2025",
            slug: "top-10-laptopuri-programatori-2025",
            excerpt:
              "Lista celor mai bune laptopuri pentru dezvoltatori software, cu focus pe performanță, autonomie și experiență de tastare.",
            content: "Lorem ipsum dolor sit amet...",
            author: "Elena Marinescu",
            date: "5 Aprilie 2025",
            category: "Laptopuri",
            tags: ["Laptopuri", "Programare", "Dezvoltare software"],
            image: "/images/blog/dev-laptops.jpg",
          },
          {
            id: 5,
            title: "Cum să îți construiești primul PC: Ghid pas cu pas",
            slug: "cum-sa-construiesti-primul-pc-ghid",
            excerpt:
              "Tutorial complet pentru asamblarea primului tău calculator, de la alegerea componentelor până la instalarea sistemului de operare.",
            content: "Lorem ipsum dolor sit amet...",
            author: "Mihai Popa",
            date: "1 Aprilie 2025",
            category: "Tutoriale",
            tags: ["DIY", "PC Building", "Tutorial"],
            image: "/images/blog/pc-building.jpg",
          },
          {
            id: 6,
            title:
              "Tendințe în gaming: Ce ne așteaptă în a doua jumătate a anului 2025",
            slug: "tendinte-gaming-2025",
            excerpt:
              "Previziuni despre cele mai așteptate lansări de jocuri și evoluția hardware-ului dedicat gaming-ului în 2025.",
            content: "Lorem ipsum dolor sit amet...",
            author: "Cristian Ionescu",
            date: "28 Martie 2025",
            category: "Gaming",
            tags: ["Gaming", "Tendințe", "Hardware"],
            image: "/images/blog/gaming-trends.jpg",
          },
        ];

        // Find the post with the matching slug
        const foundPost = blogPostsData.find((p) => p.slug === slug);

        if (foundPost) {
          setPost(foundPost);

          // Find related posts (same category or common tags)
          const related = blogPostsData
            .filter(
              (p) =>
                p.id !== foundPost.id &&
                (p.category === foundPost.category ||
                  p.tags.some((tag) => foundPost.tags.includes(tag)))
            )
            .slice(0, 3);

          setRelatedPosts(related);
        } else {
          setError("Articolul nu a fost găsit.");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("A apărut o eroare la încărcarea articolului.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container my-5 pt-5">
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Navbar />
        <div className="container my-5 pt-5">
          <div className="alert alert-danger">
            {error || "Articolul nu a fost găsit."}
          </div>
          <Link to="/blog" className="btn btn-danger">
            Înapoi la Blog
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        <div className="row">
          <div className="col-lg-8">
            {/* Back to Blog Link */}
            <div className="mb-4">
              <Link to="/blog" className="text-decoration-none text-white-50">
                <i className="bi bi-arrow-left me-2"></i> Înapoi la Blog
              </Link>
            </div>

            {/* Article Header */}
            <div className="blog-header mb-4">
              <span className="badge bg-danger mb-2">{post.category}</span>
              <h1 className="text-white">{post.title}</h1>
              <div className="d-flex align-items-center text-white-50 mt-3">
                <div className="me-4">
                  <i className="bi bi-person-circle me-2"></i> {post.author}
                </div>
                <div>
                  <i className="bi bi-calendar me-2"></i> {post.date}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div
              className="blog-featured-image rounded mb-4"
              style={{
                height: "400px",
                backgroundImage: `url(${
                  post.image ||
                  "https://placehold.co/800x400/222222/FF0000?text=Computer+Bazaar"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            {/* Article Content */}
            <div className="card bg-dark">
              <div className="card-body">
                <div
                  className="blog-content text-white"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>

                {/* Tags */}
                <div className="blog-tags mt-5">
                  <h5 className="text-white mb-3">Tags</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Link
                        key={index}
                        to={`/blog?tag=${tag}`}
                        className="badge bg-secondary text-white text-decoration-none"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Share Links */}
                <div className="blog-share mt-4">
                  <h5 className="text-white mb-3">Distribuie articolul</h5>
                  <div className="d-flex gap-2">
                    <a href="#" className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-facebook"></i> Facebook
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-info">
                      <i className="bi bi-twitter"></i> Twitter
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-envelope"></i> Email
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-success">
                      <i className="bi bi-whatsapp"></i> WhatsApp
                    </a>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="blog-author mt-5 p-4 bg-secondary-dark rounded">
                  <div className="d-flex">
                    <div
                      className="rounded-circle bg-danger d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <i className="bi bi-person-fill text-white fs-3"></i>
                    </div>
                    <div className="ms-4">
                      <h5 className="text-white">Despre autor</h5>
                      <h6 className="text-white">{post.author}</h6>
                      <p className="text-white-50 mb-0">
                        Expert în hardware și tehnologii moderne,{" "}
                        {post.author.split(" ")[0]} are peste 10 ani de
                        experiență în industria IT. Pasionat de gaming și
                        ultimele inovații tehnologice, scrie regulat articole
                        informative pentru comunitatea Computer Bazaar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {/* About Author Card */}
            <div className="card bg-dark mb-4">
              <div className="card-body">
                <h5 className="card-title text-white mb-3">Despre autor</h5>
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="rounded-circle bg-danger d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className="bi bi-person-fill text-white fs-4"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="text-white mb-1">{post.author}</h6>
                    <div className="text-white-50 small">
                      Content Writer & Tech Expert
                    </div>
                  </div>
                </div>
                <p className="text-white-50 small">
                  Expert în hardware și componente PC,{" "}
                  {post.author.split(" ")[0]} își împărtășește cunoștințele prin
                  articole detaliate și analize comparative care ajută
                  utilizatorii să facă cele mai bune alegeri.
                </p>
                <div className="d-flex gap-2 mt-3">
                  <a href="#" className="btn btn-sm btn-outline-light">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a href="#" className="btn btn-sm btn-outline-light">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="btn btn-sm btn-outline-light">
                    <i className="bi bi-envelope"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Related Posts Card */}
            <div className="card bg-dark mb-4">
              <div className="card-body">
                <h5 className="card-title text-white mb-3">
                  Articole similare
                </h5>
                {relatedPosts.length > 0 ? (
                  <div className="list-group list-group-flush">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.slug}`}
                        className="list-group-item list-group-item-action bg-transparent border-0 text-white d-flex align-items-center gap-3 py-3"
                      >
                        <div
                          style={{
                            width: "80px",
                            height: "60px",
                            backgroundImage: `url(${
                              relatedPost.image ||
                              "https://placehold.co/600x400/222222/FF0000?text=CB"
                            })`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            flexShrink: 0,
                            borderRadius: "4px",
                          }}
                        ></div>
                        <div>
                          <h6 className="mb-0 small">{relatedPost.title}</h6>
                          <small className="text-white-50">
                            {relatedPost.date}
                          </small>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-white-50">
                    Nu există articole similare disponibile.
                  </p>
                )}
              </div>
            </div>

            {/* Categories Card */}
            <div className="card bg-dark mb-4">
              <div className="card-body">
                <h5 className="card-title text-white mb-3">Categorii</h5>
                <div className="list-group list-group-flush">
                  <Link
                    to="/blog?category=Hardware"
                    className="list-group-item list-group-item-action bg-transparent border-0 text-white d-flex justify-content-between align-items-center"
                  >
                    Hardware
                    <span className="badge bg-danger rounded-pill">8</span>
                  </Link>
                  <Link
                    to="/blog?category=Software"
                    className="list-group-item list-group-item-action bg-transparent border-0 text-white d-flex justify-content-between align-items-center"
                  >
                    Software
                    <span className="badge bg-danger rounded-pill">5</span>
                  </Link>
                  <Link
                    to="/blog?category=Gaming"
                    className="list-group-item list-group-item-action bg-transparent border-0 text-white d-flex justify-content-between align-items-center"
                  >
                    Gaming
                    <span className="badge bg-danger rounded-pill">12</span>
                  </Link>
                  <Link
                    to="/blog?category=Tutoriale"
                    className="list-group-item list-group-item-action bg-transparent border-0 text-white d-flex justify-content-between align-items-center"
                  >
                    Tutoriale
                    <span className="badge bg-danger rounded-pill">7</span>
                  </Link>
                  <Link
                    to="/blog?category=Laptopuri"
                    className="list-group-item list-group-item-action bg-transparent border-0 text-white d-flex justify-content-between align-items-center"
                  >
                    Laptopuri
                    <span className="badge bg-danger rounded-pill">4</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="card bg-dark mb-4">
              <div className="card-body">
                <h5 className="card-title text-white mb-3">
                  Abonează-te la newsletter
                </h5>
                <p className="card-text text-white-50">
                  Primește cele mai noi articole și oferte direct în inbox-ul
                  tău.
                </p>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control bg-secondary text-white"
                    placeholder="Adresa ta de email"
                  />
                  <button className="btn btn-danger" type="button">
                    Abonare
                  </button>
                </div>
                <small className="text-white-50">
                  Ne angajăm să îți protejăm datele și să nu facem spam.
                </small>
              </div>
            </div>

            {/* Featured Products Card */}
            <div className="card bg-dark">
              <div className="card-body">
                <h5 className="card-title text-white mb-3">
                  Produse recomandate
                </h5>
                <div className="list-group list-group-flush">
                  <Link
                    to="/product/rtx-5070"
                    className="list-group-item list-group-item-action bg-transparent border-0 text-white d-flex align-items-center gap-3 py-3"
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundImage: `url(https://placehold.co/600x400/222222/FF0000?text=GPU)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        flexShrink: 0,
                        borderRadius: "4px",
                      }}
                    ></div>
                    <div>
                      <h6 className="mb-0 small">NVIDIA GeForce RTX 5070</h6>
                      <div className="text-danger">3999 Lei</div>
                    </div>
                  </Link>
                  <Link
                    to="/product/rx-8700xt"
                    className="list-group-item list-group-item-action bg-transparent border-0 text-white d-flex align-items-center gap-3 py-3"
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundImage: `url(https://placehold.co/600x400/222222/FF0000?text=GPU)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        flexShrink: 0,
                        borderRadius: "4px",
                      }}
                    ></div>
                    <div>
                      <h6 className="mb-0 small">AMD Radeon RX 8700 XT</h6>
                      <div className="text-danger">3799 Lei</div>
                    </div>
                  </Link>
                  <Link
                    to="/product/arc-a950"
                    className="list-group-item list-group-item-action bg-transparent border-0 text-white d-flex align-items-center gap-3 py-3"
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundImage: `url(https://placehold.co/600x400/222222/FF0000?text=GPU)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        flexShrink: 0,
                        borderRadius: "4px",
                      }}
                    ></div>
                    <div>
                      <h6 className="mb-0 small">Intel Arc A950</h6>
                      <div className="text-danger">2599 Lei</div>
                    </div>
                  </Link>
                </div>
                <div className="mt-3">
                  <Link
                    to="/category/placi-video"
                    className="btn btn-outline-danger btn-sm w-100"
                  >
                    Vezi toate plăcile video
                  </Link>
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

export default BlogPostPage;
