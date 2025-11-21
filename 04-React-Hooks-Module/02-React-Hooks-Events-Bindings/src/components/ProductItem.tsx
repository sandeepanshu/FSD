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
  product: IProduct;
}

const ProductItem: React.FC<IProps> = () => {
  const [productState, setProductState] = useState<IState>({
    product: {
      sno: "AA102",
      name: "Mi Watch",
      image:
        "https://www.gizmochina.com/wp-content/uploads/2019/11/XIaomi-Mi-Watch-m-500x500.jpg",
      price: 1500,
      qty: 2,
    },
  });

  const incrQty = () => {
    setProductState({
      product: {
        ...productState.product,
        qty: productState.product.qty + 1,
      },
    });
  };

  const decrQty = () => {
    setProductState({
      product: {
        ...productState.product,
        qty:
          productState.product.qty - 1 > 0 ? productState.product.qty - 1 : 1,
      },
    });
  };

  const { product } = productState;
  return (
    <React.Fragment>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary">Product Item</p>
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
      {/*   <pre>{JSON.stringify(this.state.product)}</pre>*/}
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
                  <tr>
                    <td>{product.sno}</td>
                    <td>
                      <img src={product.image} alt="" width="50" height="50" />
                    </td>
                    <td>{product.name}</td>
                    <td>&#8377; {product.price.toFixed(2)}</td>
                    <td>
                      <i
                        className="fa fa-minus-circle mx-1"
                        onClick={decrQty}
                      />
                      {product.qty}
                      <i className="fa fa-plus-circle mx-1" onClick={incrQty} />
                    </td>
                    <td>&#8377; {(product.price * product.qty).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductItem;
