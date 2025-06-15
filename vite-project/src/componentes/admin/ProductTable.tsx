import React from "react";
import { products } from "../../dataa/product";

const ProductTable = () => {
  return (
    <div>
      <h4 className="mb-3">Menaxhimi i Produkteve</h4>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Titulli</th>
              <th>Përshkrimi</th>
              <th>Çmimi</th>
              <th>Etiketa</th>
              <th>Vlerësimi</th>
              <th>Produkt i Ri?</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <img
                    src={`/images/${p.img}`}
                    alt={p.title}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                    className="rounded"
                  />
                </td>
                <td>{p.title}</td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>
                  {p.tags.map((tag, i) => (
                    <span key={i} className="badge bg-secondary me-1">
                      {tag}
                    </span>
                  ))}
                </td>
                <td>{p.rating ?? "-"}</td>
                <td>{p.isNew ? "Po" : "Jo"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
