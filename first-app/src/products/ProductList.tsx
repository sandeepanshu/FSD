import { useEffect, useState } from "react";
import axios from "axios";
import type { IProduct } from "./models/IProduct";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  // load data
  useEffect(() => {
    const dataURL = "http://127.0.0.1:5000/api/products";

    axios
      .get(dataURL)
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}

      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success">Product List</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
                impedit, incidunt ipsum nulla sapiente sint suscipit?
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            {products.length > 0 &&
              products.map((product) => (
                <div className="col-md-3" key={product._id}>
                  <div className="card">
                    <div className="card-header text-center bg-white">
                      <img
                        src={product.image}
                        alt=""
                        width="150"
                        height="150"
                      />
                    </div>

                    <div className="card-body rgba-light-green-light">
                      <ul className="list-group">
                        <li className="list-group-item">
                          NAME : {product.name}
                        </li>
                        <li className="list-group-item">
                          PRICE : ₹ {product.price.toFixed(2)}
                        </li>
                        <li className="list-group-item">
                          QTY : {product.qty} Kgs
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* No Records */}
          {products.length === 0 && (
            <div className="row mt-3">
              <div className="col text-center">
                <p className="font-weight-bold text-success">
                  No Records Found in Database
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductList;
