import React from "react";
import type { IProduct } from "./models/IProduct";
import ProductRow from "./ProductRow";
import NoProducts from "./NoProducts";
// import type { IProduct } from "../../models/IProduct";
// import ProductRow from "./ProductRow";
// import NoProducts from "./NoProducts";

interface Props {
  products: IProduct[];
  deleteProduct: (id: string, name: string) => void;
}

const ProductTable: React.FC<Props> = ({ products, deleteProduct }) => {
  return (
    <section className="mb-5">
      <div className="container">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3">
            <h5 className="mb-0">
              <i className="fas fa-list me-2 text-success"></i>Product Catalogue
            </h5>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-center">SNO</th>
                  <th className="text-center">Image</th>
                  <th>Product Name</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.length > 0 ? (
                  products.map((p, i) => (
                    <ProductRow
                      key={p._id}
                      product={p}
                      index={i}
                      deleteProduct={deleteProduct}
                    />
                  ))
                ) : (
                  <NoProducts />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductTable;
