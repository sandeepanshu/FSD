import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import type { IProduct } from "./models/IProduct";

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState<IProduct>({
    name: "",
    image: "",
    price: 0,
    qty: 0,
    info: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update text input
  const updateInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  // Update image
  const updateImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const base64 = await convertBase64String(file);

    setProduct({
      ...product,
      image: base64.toString(),
    });
  };

  const convertBase64String = (
    imageFile: Blob
  ): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);

      fileReader.onload = () => resolve(fileReader.result!);
      fileReader.onerror = () => reject("Error converting image");
    });
  };

  // Submit Product
  const submitCreateProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:5000/api/products", product)
      .then(() => {
        setIsSubmitted(true);

        // redirect after 1 second
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
              <p className="h3 text-success">Create Product</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

              {/* ✅ Show success message when submitted */}
              {isSubmitted && (
                <div className="alert alert-success p-2 mt-2">
                  ✔ Product created successfully! Redirecting...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-success text-white">
                  <p className="h4">Create Product</p>
                </div>

                <div className="card-body rgba-green-light">
                  <form onSubmit={submitCreateProduct}>
                    <div className="form-group">
                      <input
                        required
                        name="name"
                        value={product.name}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>

                    <div className="form-group mt-2">
                      <input
                        required
                        name="image"
                        onChange={updateImage}
                        type="file"
                        className="form-control"
                      />
                    </div>

                    <div className="form-group mt-2">
                      <input
                        required
                        name="price"
                        value={product.price}
                        onChange={updateInput}
                        type="number"
                        className="form-control"
                        placeholder="Price"
                      />
                    </div>

                    <div className="form-group mt-2">
                      <input
                        required
                        name="qty"
                        value={product.qty}
                        onChange={updateInput}
                        type="number"
                        className="form-control"
                        placeholder="Qty"
                      />
                    </div>

                    <div className="form-group mt-2">
                      <textarea
                        required
                        name="info"
                        value={product.info}
                        onChange={updateInput}
                        rows={3}
                        className="form-control"
                        placeholder="Information"
                      />
                    </div>

                    <div className="form-group mt-3">
                      <input
                        type="submit"
                        className="btn btn-success btn-sm"
                        value="Create"
                      />
                    </div>
                  </form>

                  <div className="mt-3">
                    <Link to="/products/admin" className="btn btn-dark btn-sm">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateProduct;
