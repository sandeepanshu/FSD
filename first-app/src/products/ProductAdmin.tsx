import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import type { IProduct } from "./models/IProduct";

const ProductAdmin: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

    // Get All Products
  const getAllProducts = () => {
    const dataURL = "http://127.0.0.1:5000/api/products";

    axios
      .get(dataURL)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  };

  
  // Fetch products on load
  useEffect(() => {
    getAllProducts();
  }, []);


  // Delete Product
  const deleteProduct = (productId: string) => {
    const dataURL = `http://127.0.0.1:5000/api/products/${productId}`;

    axios
      .delete(dataURL)
      .then(() => getAllProducts()) // reload updated list
      .catch((error) => console.error(error));
  };

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success">Product Admin</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                impedit, incidunt ipsum nulla sapiente sint suscipit?
              </p>
              <Link to="/products/create" className="btn btn-success btn-sm">
                Create Product
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <table className="table table-hover text-center table-striped">
                <thead className="bg-dark text-success">
                  <tr>
                    <th>SNO</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.length > 0 &&
                    products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id?.slice(-5)}</td>

                        <td>
                          <img
                            src={product.image}
                            alt=""
                            width="50"
                            height="50"
                          />
                        </td>

                        <td>{product.name}</td>

                        <td>₹ {product.price.toFixed(2)}</td>

                        <td>{product.qty} Kgs</td>

                        <td>
                          <Link
                            to={`/products/${product._id}`}
                            className="btn btn-secondary btn-sm mx-1"
                          >
                            Update
                          </Link>

                          <button
                            onClick={() => deleteProduct(product._id!)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                  {/* Empty Data */}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-success">
                        NO Records Found in Database
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductAdmin;
