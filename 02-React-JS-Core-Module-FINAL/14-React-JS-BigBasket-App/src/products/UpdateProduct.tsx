import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import type { IProduct } from "./models/IProduct";

const UpdateProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState<IProduct>({
    name: "",
    image: "",
    price: 0,
    qty: 0,
    info: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // ------------------------------------------
  // Load Product on Mount
  // ------------------------------------------
  useEffect(() => {
    if (!productId) return;

    const url = `http://127.0.0.1:5000/api/products/${productId}`;
    axios
      .get(url)
      .then((res) => setSelectedProduct(res.data))
      .catch((err) => console.error(err));
  }, [productId]);

  // ------------------------------------------
  // Update text inputs
  // ------------------------------------------
  const updateInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedProduct({
      ...selectedProduct,
      [event.target.name]: event.target.value,
    });
  };

  // ------------------------------------------
  // Image Upload (Base64)
  // ------------------------------------------
  const updateImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const base64 = await convertBase64String(file);

    setSelectedProduct({
      ...selectedProduct,
      image: base64.toString(),
    });
  };

  const convertBase64String = (
    file: Blob
  ): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => resolve(fileReader.result!);
      fileReader.onerror = () => reject("Error converting image");
    });
  };

  // ------------------------------------------
  // Submit Update
  // ------------------------------------------
  const submitUpdateProduct = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const url = `http://127.0.0.1:5000/api/products/${selectedProduct._id}`;

    axios
      .put(url, selectedProduct)
      .then(() => {
        setIsSubmitted(true);

        // Redirect after success
        setTimeout(() => {
          navigate("/products/admin");
        }, 1000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-secondary">Update Product</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              {/* ✅ Show success message */}
              {isSubmitted && (
                <div className="alert alert-success p-2">
                  ✔ Product updated successfully! Redirecting...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-4">

              <div className="card">
                <div className="card-header bg-secondary text-white">
                  <p className="h4">Update Product</p>
                </div>

                <div className="card-body rgba-green-light">
                  <form onSubmit={submitUpdateProduct}>
                    {/* NAME */}
                    <div className="form-group">
                      <input
                        required
                        name="name"
                        value={selectedProduct.name}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>

                    {/* IMAGE */}
                    <div className="form-group mt-2">
                      <input
                        name="image"
                        type="file"
                        onChange={updateImage}
                        className="form-control"
                      />
                      {selectedProduct.image && (
                        <img
                          src={selectedProduct.image}
                          alt=""
                          width="25"
                          height="25"
                          className="mt-2"
                        />
                      )}
                    </div>

                    {/* PRICE */}
                    <div className="form-group mt-2">
                      <input
                        required
                        name="price"
                        value={selectedProduct.price}
                        onChange={updateInput}
                        type="number"
                        className="form-control"
                        placeholder="Price"
                      />
                    </div>

                    {/* QTY */}
                    <div className="form-group mt-2">
                      <input
                        required
                        name="qty"
                        value={selectedProduct.qty}
                        onChange={updateInput}
                        type="number"
                        className="form-control"
                        placeholder="Qty"
                      />
                    </div>

                    {/* INFO */}
                    <div className="form-group mt-2">
                      <textarea
                        required
                        name="info"
                        value={selectedProduct.info}
                        onChange={updateInput}
                        rows={3}
                        className="form-control"
                        placeholder="Information"
                      />
                    </div>

                    {/* SUBMIT */}
                    <div className="form-group mt-2">
                      <input
                        type="submit"
                        className="btn btn-secondary btn-sm"
                        value="Update"
                      />
                    </div>

                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateProduct;
