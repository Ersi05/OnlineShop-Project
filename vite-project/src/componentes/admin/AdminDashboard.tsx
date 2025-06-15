import React, { useState } from "react";
import ProductTable from "./ProductTable";

const VerticalTabsBootstrap = () => {
  const [activeTab, setActiveTab] = useState(""); // bosh fillimisht
  const [showTabs, setShowTabs] = useState(false);

  const tabs = [
    { id: "dashboard", label: "Produkte", icon: "bi bi-box-seam" },
    { id: "users", label: "Përdoruesit", icon: "bi bi-people" },
    { id: "order", label: "Porosit", icon: "bi bi-bag-check" },
    { id: "rates", label: "Vlerësimi", icon: "bi bi-star-half" },
    { id: "raport", label: "Raporti", icon: "bi bi-graph-up" },
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="p-3 border-end mt-5 bg-light"
        style={{ width: "220px", minHeight: "100vh" }}
      >
        <button
          className="btn btn-primary w-100 mb-3"
          onClick={() => setShowTabs((prev) => !prev)}
        >
          <i className="bi bi-list  me-2"></i>
          Dashboard
        </button>

        {showTabs && (
          <div>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`btn btn-outline-primary d-flex align-items-center w-100 mb-2 text-start ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowTabs(false);
                }}
                style={{ gap: "8px" }}
              >
                <i className={tab.icon} style={{ fontSize: "1.2rem" }}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Përmbajtja që ndryshon sipas tab */}
      <div className="p-4 flex-grow-1">
        {activeTab === "dashboard" && <ProductTable />}
        {activeTab === "users" && <p>Përdoruesit do shfaqen këtu.</p>}
        {activeTab === "order" && <p>Porosit do shfaqen këtu.</p>}
        {activeTab === "rates" && <p>Vlerësimi do shfaqet këtu.</p>}
        {activeTab === "raport" && <p>Raportet do shfaqen këtu.</p>}
        {!activeTab && (
          <div className="text-center mt-5 text-muted">
            <i className="bi bi-arrow-left-circle me-2"></i>
            Zgjidh një seksion nga menuja
          </div>
        )}
      </div>
    </div>
  );
};

export default VerticalTabsBootstrap;
