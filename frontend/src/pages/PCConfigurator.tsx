// frontend/src/pages/PCConfigurator.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { ProductData, getProductsByCategory } from "../services/productService";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ComponentSelector from "../components/PCConfigurator/ComponentSelector";
import CompatibilityChecker from "../components/PCConfigurator/CompatibilityChecker";
import BuildSummary from "../components/PCConfigurator/BuildSummary";
import "./styles.css";

// Interface for PC configuration
export interface PCConfiguration {
  motherboard: ProductData | null;
  processor: ProductData | null;
  graphicsCard: ProductData | null;
  memory: ProductData | null;
  storage: ProductData | null;
  powerSupply: ProductData | null;
}

// Interface for component category mapping
interface CategoryMapping {
  [key: string]: string;
}

const PCConfigurator: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // State for PC configuration
  const [configuration, setConfiguration] = useState<PCConfiguration>({
    motherboard: null,
    processor: null,
    graphicsCard: null,
    memory: null,
    storage: null,
    powerSupply: null,
  });

  // State for active component selection
  const [activeComponent, setActiveComponent] = useState<string>("motherboard");

  // State for component options (products by category)
  const [componentOptions, setComponentOptions] = useState<{
    [key: string]: ProductData[];
  }>({
    motherboard: [],
    processor: [],
    graphicsCard: [],
    memory: [],
    storage: [],
    powerSupply: [],
  });

  // State for loading
  const [loading, setLoading] = useState<boolean>(true);

  // State for compatibility issues
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([]);

  // Category mapping for API calls
  const categoryMapping: CategoryMapping = React.useMemo(
    () => ({
      motherboard: "Plăci de bază",
      processor: "Procesoare",
      graphicsCard: "Plăci video",
      memory: "Memorii RAM",
      storage: "SSD & HDD",
      powerSupply: "Surse",
    }),
    []
  );

  // Component display names
  const componentDisplayNames: CategoryMapping = {
    motherboard: "Placă de bază",
    processor: "Procesor",
    graphicsCard: "Placă video",
    memory: "Memorie RAM",
    storage: "Stocare",
    powerSupply: "Sursă de alimentare",
  };

  // Fetch component options
  useEffect(() => {
    const fetchAllComponents = async () => {
      setLoading(true);

      try {
        const fetchPromises = Object.entries(categoryMapping).map(
          async ([key, category]) => {
            const result = await getProductsByCategory(category);
            return { key, products: result.products };
          }
        );

        const results = await Promise.all(fetchPromises);

        const options: { [key: string]: ProductData[] } = {};
        results.forEach(({ key, products }) => {
          options[key] = products;
        });

        setComponentOptions(options);
      } catch (error) {
        console.error("Error fetching components:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllComponents();
  }, [categoryMapping]);

  // Check compatibility between components
  const checkCompatibility = useCallback(() => {
    const issues: string[] = [];

    // Check CPU and motherboard compatibility
    if (configuration.processor && configuration.motherboard) {
      let cpuSocket: string | undefined;
      let mbSocket: string | undefined;

      const cpuSpecs = configuration.processor.specifications;
      const mbSpecs = configuration.motherboard.specifications;

      if (cpuSpecs instanceof Map) {
        cpuSocket = cpuSpecs.get("Socket");
      } else if (cpuSpecs && typeof cpuSpecs === "object") {
        cpuSocket = (cpuSpecs as { [key: string]: string })["Socket"];
      }

      if (mbSpecs instanceof Map) {
        mbSocket = mbSpecs.get("Socket");
      } else if (mbSpecs && typeof mbSpecs === "object") {
        mbSocket = (mbSpecs as { [key: string]: string })["Socket"];
      }

      if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
        issues.push(
          `Procesorul (${cpuSocket}) nu este compatibil cu placa de bază (${mbSocket}).`
        );
      }
    }

    // Check memory and motherboard compatibility
    if (configuration.memory && configuration.motherboard) {
      let memoryType: string | undefined;
      let mbMemoryType: string | undefined;

      const memorySpecs = configuration.memory.specifications;
      const mbSpecs = configuration.motherboard.specifications;

      if (memorySpecs instanceof Map) {
        memoryType = memorySpecs.get("Tip memorie");
      } else if (memorySpecs && typeof memorySpecs === "object") {
        memoryType = (memorySpecs as { [key: string]: string })["Tip memorie"];
      }

      if (mbSpecs instanceof Map) {
        mbMemoryType = mbSpecs.get("Memorie suportată");
      } else if (mbSpecs && typeof mbSpecs === "object") {
        mbMemoryType = (mbSpecs as { [key: string]: string })[
          "Memorie suportată"
        ];
      }

      if (memoryType && mbMemoryType && !mbMemoryType.includes(memoryType)) {
        issues.push(
          `Memoria (${memoryType}) nu este compatibilă cu placa de bază (${mbMemoryType}).`
        );
      }
    }

    // Check power requirements (simplified)
    let totalPower = 0;
    if (configuration.processor) totalPower += 120; // Estimated CPU power
    if (configuration.graphicsCard) totalPower += 250; // Estimated GPU power

    if (configuration.powerSupply && totalPower > 0) {
      let psuPower = 0;
      const psuSpecs = configuration.powerSupply.specifications;
      if (psuSpecs instanceof Map) {
        psuPower = Number(psuSpecs.get("Putere") || 0);
      } else if (psuSpecs && typeof psuSpecs === "object") {
        psuPower = Number(
          (psuSpecs as { [key: string]: string })["Putere"] || 0
        );
      }

      if (psuPower > 0 && totalPower > psuPower * 0.8) {
        // 80% of PSU capacity for safety
        issues.push(
          `Sursa selectată (${psuPower}W) ar putea fi insuficientă pentru configurația curentă (estimat: ${totalPower}W).`
        );
      }
    }

    setCompatibilityIssues(issues);
  }, [configuration]);

  // Check compatibility when configuration changes
  useEffect(() => {
    checkCompatibility();
  }, [checkCompatibility]);

  // Handle component selection
  const handleSelectComponent = (
    component: string,
    product: ProductData | null
  ) => {
    setConfiguration((prev) => ({
      ...prev,
      [component]: product,
    }));
  };

  // Add all components to cart
  const addConfigurationToCart = () => {
    Object.values(configuration).forEach((product) => {
      if (product) {
        addToCart(product, 1);
      }
    });

    // Navigate to cart
    navigate("/cart");
  };

  // Component card click handler
  const handleComponentCardClick = (componentType: string) => {
    setActiveComponent(componentType);

    // Scroll to component selector
    document.getElementById("component-selector")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h1 className="text-white mb-4">Configurator PC</h1>

        <div className="row">
          {/* Component overview cards */}
          <div className="col-lg-3 mb-4">
            <div className="configurator-sidebar bg-dark p-3 rounded">
              <h4 className="text-white mb-3">Componente</h4>

              {Object.keys(categoryMapping).map((componentType) => (
                <div
                  key={componentType}
                  className={`component-card mb-3 p-3 rounded ${
                    activeComponent === componentType ? "selected" : ""
                  } ${
                    configuration[componentType as keyof PCConfiguration]
                      ? "filled"
                      : "empty"
                  }`}
                  onClick={() => handleComponentCardClick(componentType)}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      {componentDisplayNames[componentType]}
                    </h5>
                    {configuration[componentType as keyof PCConfiguration] ? (
                      <i className="bi bi-check-circle-fill text-success"></i>
                    ) : (
                      <i className="bi bi-plus-circle text-light"></i>
                    )}
                  </div>

                  {configuration[componentType as keyof PCConfiguration] && (
                    <div className="mt-2 text-light">
                      <small>
                        {
                          configuration[componentType as keyof PCConfiguration]
                            ?.name
                        }
                      </small>
                      <div className="text-danger">
                        {configuration[
                          componentType as keyof PCConfiguration
                        ]?.price.toLocaleString()}{" "}
                        Lei
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <BuildSummary
                configuration={configuration}
                onAddToCart={addConfigurationToCart}
                compatibilityIssues={compatibilityIssues}
              />
            </div>
          </div>

          {/* Component selector and details */}
          <div className="col-lg-9">
            {/* Compatibility checker */}
            <CompatibilityChecker
              configuration={configuration}
              issues={compatibilityIssues}
            />

            {/* Component selector */}
            <div id="component-selector" className="bg-dark p-4 rounded mb-4">
              <h3 className="text-white mb-3">
                Selectează {componentDisplayNames[activeComponent]}
              </h3>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-light mt-3">Se încarcă componentele...</p>
                </div>
              ) : (
                <ComponentSelector
                  products={componentOptions[activeComponent] || []}
                  selectedProduct={
                    configuration[activeComponent as keyof PCConfiguration]
                  }
                  onSelectProduct={(product) =>
                    handleSelectComponent(activeComponent, product)
                  }
                />
              )}
            </div>

            {/* Selected component details */}
            {configuration[activeComponent as keyof PCConfiguration] && (
              <div className="bg-dark p-4 rounded">
                <h4 className="text-white mb-3">
                  {
                    configuration[activeComponent as keyof PCConfiguration]
                      ?.name
                  }
                </h4>

                <div className="row">
                  <div className="col-md-4">
                    <div className="product-image-container bg-secondary-dark p-3 rounded mb-3 mb-md-0 d-flex align-items-center justify-content-center">
                      <img
                        src={(() => {
                          const img =
                            configuration[
                              activeComponent as keyof PCConfiguration
                            ]?.images?.[0];
                          if (typeof img === "string") {
                            return img;
                          } else if (
                            img &&
                            typeof img === "object" &&
                            "url" in img
                          ) {
                            return (img as { url: string }).url;
                          }
                          return undefined;
                        })()}
                        alt={
                          configuration[
                            activeComponent as keyof PCConfiguration
                          ]?.name
                        }
                        className="img-fluid"
                        style={{ maxHeight: "150px" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-8">
                    <p className="text-light">
                      {configuration[
                        activeComponent as keyof PCConfiguration
                      ]?.description.substring(0, 200)}
                      ...
                    </p>

                    <div className="row mt-3">
                      <div className="col-6">
                        <h5 className="text-danger mb-3">
                          {configuration[
                            activeComponent as keyof PCConfiguration
                          ]?.price.toLocaleString()}{" "}
                          Lei
                        </h5>
                      </div>
                      <div className="col-6 text-end">
                        <button
                          className="btn btn-outline-danger"
                          onClick={() =>
                            handleSelectComponent(activeComponent, null)
                          }
                        >
                          <i className="bi bi-trash me-1"></i> Elimină
                        </button>
                      </div>
                    </div>

                    {/* Specifications */}
                    {configuration[activeComponent as keyof PCConfiguration]
                      ?.specifications && (
                      <div className="mt-3">
                        <h5 className="text-white">Specificații</h5>
                        <div className="specs-table">
                          {Object.entries(
                            configuration[
                              activeComponent as keyof PCConfiguration
                            ]?.specifications as Record<string, string>
                          )
                            .slice(0, 5)
                            .map(([key, value]) => (
                              <div key={key} className="specs-row d-flex">
                                <div className="specs-key text-light-gray">
                                  {key}:
                                </div>
                                <div className="specs-value text-white">
                                  {value}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PCConfigurator;
