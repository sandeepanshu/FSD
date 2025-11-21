import React, { useState } from "react";

interface IProduct {
  sno: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}
interface IProps {}
interface IState {
  products: IProduct[];
}

const ShoppingCart: React.FC<IProps> = () => {
  const [productState, setProductState] = useState<IState>({
    products: [
      {
        sno: "AA102",
        name: "Mi Watch",
        image:
          "https://www.gizmochina.com/wp-content/uploads/2019/11/XIaomi-Mi-Watch-m-500x500.jpg",
        price: 1500,
        qty: 2,
      },
      {
        sno: "AA103",
        name: "Apple Watch",
        image:
          "https://images-na.ssl-images-amazon.com/images/I/61OUIIXnPqL._AC_SX569_.jpg",
        price: 1800,
        qty: 2,
      },
      {
        sno: "AA104",
        name: "Sumsung Watch",
        image:
          "https://images-na.ssl-images-amazon.com/images/I/419QC1uNzSL._SY355_.jpg",
        price: 1950,
        qty: 2,
      },
    ],
  });

  const decrQty = (sno: string) => {
    const updatedProducts: IProduct[] = productState.products.map((product) => {
      if (product.sno === sno) {
        return {
          ...product,
          qty: product.qty - 1 > 0 ? product.qty - 1 : 1,
        };
      }
      return product;
    });
    setProductState({
      products: [...updatedProducts],
    });
  };

  const incrQty = (sno: string) => {
    const updatedProducts: IProduct[] = productState.products.map((product) => {
      if (product.sno === sno) {
        return {
          ...product,
          qty: product.qty + 1,
        };
      }
      return product;
    });
    setProductState({
      products: [...updatedProducts],
    });
  };

  const { products } = productState;
  return (
    <React.Fragment>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary">Shopping Cart</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
                et exercitationem fuga, nobis qui quo totam voluptas voluptatem?
                Ad architecto earum id natus officia quia reprehenderit rerum
                soluta vero voluptates.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <table className="table table-hover text-center table-striped">
                <thead className="bg-dark text-primary">
                  <tr>
                    <th>SNO</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    return (
                      <tr key={product.sno}>
                        <td>{product.sno}</td>
                        <td>
                          <img
                            src={product.image}
                            alt=""
                            width="50"
                            height="50"
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>&#8377; {product.price.toFixed(2)}</td>
                        <td>
                          <i
                            className="fa fa-minus-circle mx-1"
                            onClick={decrQty.bind(this, product.sno)}
                          />
                          {product.qty}
                          <i
                            className="fa fa-plus-circle mx-1"
                            onClick={incrQty.bind(this, product.sno)}
                          />
                        </td>
                        <td>
                          &#8377; {(product.price * product.qty).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ShoppingCart;
