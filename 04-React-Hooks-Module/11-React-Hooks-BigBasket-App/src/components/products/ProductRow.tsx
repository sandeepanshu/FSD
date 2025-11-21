import { Link } from "react-router-dom";
import type { IProduct } from "./models/IProduct";

interface Props {
  product: IProduct;
  index: number;
  deleteProduct: (id: string, name: string) => void;
}

const ProductRow: React.FC<Props> = ({ product, index, deleteProduct }) => {
  return (
    <tr className="product-row">
      <td className="text-center fw-semibold">{index + 1}</td>

      <td className="text-center">
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow-sm"
          style={{ width: 60, height: 60, objectFit: "cover" }}
        />
      </td>

      <td>
        <div className="fw-semibold">{product.name}</div>
        {product.info && (
          <small className="text-muted d-block text-truncate" style={{ maxWidth: 300 }}>
            {product.info}
          </small>
        )}
      </td>

      <td className="text-center">
        <span className="badge bg-success-subtle text-success">
          ₹{product.price.toFixed(2)}
        </span>
      </td>

      <td className="text-center">
        <span className="badge bg-info-subtle text-info">{product.qty} Kgs</span>
      </td>

      <td className="text-center">
        <div className="btn-group">
          <Link className="btn btn-sm btn-outline-secondary" to={`/products/${product._id}`}>
            <i className="fas fa-edit"></i>
          </Link>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => deleteProduct(product._id!, product.name)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
