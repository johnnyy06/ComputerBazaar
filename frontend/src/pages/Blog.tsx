// frontend/src/pages/Blog.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // This would normally be an API call to fetch blog posts
    // For now, we'll use static data
    const fetchPosts = () => {
      setLoading(true);

      // Sample blog posts data
      const blogPostsData: BlogPost[] = [
        {
          id: 1,
          title: "Cum să alegi cea mai bună placă video pentru gaming în 2025",
          slug: "cum-sa-alegi-cea-mai-buna-placa-video-pentru-gaming-2025",
          excerpt:
            "Ghid complet pentru alegerea plăcii video potrivite nevoilor tale de gaming, în funcție de buget și cerințele jocurilor moderne.",
          content: "Lorem ipsum dolor sit amet...",
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

      setPosts(blogPostsData);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(blogPostsData.map((post) => post.category))
      );
      setCategories(uniqueCategories);

      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Filter posts by category and search term
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "" || post.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <div className="container my-5 pt-5">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="text-white mb-4">Blog Computer Bazaar</h1>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="alert alert-info">
                Nu am găsit articole care să corespundă criteriilor de căutare.
              </div>
            ) : (
              <div className="row">
                {filteredPosts.map((post) => (
                  <div className="col-md-6 mb-4" key={post.id}>
                    <div className="card bg-dark h-100">
                      <div
                        className="card-img-top"
                        style={{
                          height: "200px",
                          backgroundImage: `url(${
                            post.image ||
                            "https://placehold.co/600x400/222222/FF0000?text=Computer+Bazaar"
                          })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <div className="card-body d-flex flex-column">
                        <span className="badge bg-danger mb-2">
                          {post.category}
                        </span>
                        <h5 className="card-title">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="text-white text-decoration-none"
                          >
                            {post.title}
                          </Link>
                        </h5>
                        <p className="card-text text-white-50">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto d-flex justify-content-between align-items-center">
                          <small className="text-white-50">
                            <i className="bi bi-calendar me-1"></i> {post.date}
                          </small>
                          <Link
                            to={`/blog/${post.slug}`}
                            className="btn btn-outline-danger btn-sm"
                          >
                            Citește mai mult
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="card bg-dark mb-4">
              <div className="card-body">
                <h5 className="card-title text-white mb-3">Caută articole</h5>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-secondary text-white"
                    placeholder="Caută după cuvinte cheie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-danger" type="button">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="card bg-dark mb-4">
              <div className="card-body">
                <h5 className="card-title text-white mb-3">Categorii</h5>
                <div className="list-group list-group-flush">
                  <button
                    className={`list-group-item list-group-item-action bg-transparent border-0 text-white ${
                      selectedCategory === "" ? "active bg-danger" : ""
                    }`}
                    onClick={() => setSelectedCategory("")}
                  >
                    Toate categoriile
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`list-group-item list-group-item-action bg-transparent border-0 text-white ${
                        selectedCategory === category ? "active bg-danger" : ""
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="card bg-dark mb-4">
              <div className="card-body">
                <h5 className="card-title text-white mb-3">
                  Articole populare
                </h5>
                <div className="list-group list-group-flush">
                  {posts.slice(0, 3).map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="list-group-item list-group-item-action bg-transparent border-0 text-white d-flex align-items-center gap-3 py-3"
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          backgroundImage: `url(${
                            post.image ||
                            "https://placehold.co/600x400/222222/FF0000?text=CB"
                          })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          flexShrink: 0,
                          borderRadius: "4px",
                        }}
                      ></div>
                      <div>
                        <h6 className="mb-0">{post.title}</h6>
                        <small className="text-white-50">{post.date}</small>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

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
          </div>
        </div>

        {/* Featured Articles Section */}
        <div className="row mt-5">
          <div className="col-12">
            <h3 className="text-white border-bottom pb-2 mb-4">
              Articole recomandate
            </h3>
          </div>

          {posts.slice(0, 3).map((post) => (
            <div className="col-md-4 mb-4" key={`featured-${post.id}`}>
              <div className="card bg-dark h-100">
                <div
                  className="card-img-top"
                  style={{
                    height: "180px",
                    backgroundImage: `url(${
                      post.image ||
                      "https://placehold.co/600x400/222222/FF0000?text=Computer+Bazaar"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="card-body d-flex flex-column">
                  <span className="badge bg-danger mb-2">{post.category}</span>
                  <h5 className="card-title">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-white text-decoration-none"
                    >
                      {post.title}
                    </Link>
                  </h5>
                  <p className="card-text text-white-50">{post.excerpt}</p>
                  <div className="mt-auto">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Citește mai mult
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
