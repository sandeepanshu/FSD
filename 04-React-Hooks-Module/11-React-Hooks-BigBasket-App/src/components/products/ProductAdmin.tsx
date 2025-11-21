import React, { useEffect, useState } from "react";
import "./products.styles.css";
import { Link } from "react-router-dom";
import type { IProduct } from "./models/IProduct";
import { deleteProductAPI, getProducts } from "../services/productService";
import ProductStats from "./ProductStats";
import ProductLoader from "./ProductLoader";
import ProductTable from "./ProductTable";

interface IState {
  products: IProduct[];
  loading: boolean;
}

const ProductAdmin: React.FC = () => {
  const [state, setState] = useState<IState>({
    products: [],
    loading: true,
  });

  const fetchProducts = () => {
    setState((p) => ({ ...p, loading: true }));

    getProducts()
      .then((res: any) => {
        setState({ products: res.data.products, loading: false });
      })
      .catch(() => {
        setState({ products: [], loading: false });
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete handler
  const deleteProduct = (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}" permanently?`)) return;

    deleteProductAPI(id).then(fetchProducts);
  };

  return (
    <>
      <section className="bg-light py-4 mb-4">
        <div className="container d-flex justify-content-between">
          <div>
            <h2 className="h3 text-success fw-bold">
              <i className="fas fa-tasks me-2"></i>Product Admin Panel
            </h2>
            <p className="text-muted">
              Manage your product inventory & catalogue.
            </p>
          </div>
          <Link to="/products/create" className="btn btn-success shadow-sm">
            <i className="fas fa-plus-circle me-2"></i>
            Create Product
          </Link>
        </div>
      </section>

      {!state.loading && <ProductStats products={state.products} />}
      {state.loading && <ProductLoader />}
      {!state.loading && (
        <ProductTable
          products={state.products}
          deleteProduct={deleteProduct}
        />
      )}

       
    </>
  );
};

export default ProductAdmin;
