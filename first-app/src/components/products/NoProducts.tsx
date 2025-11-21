import { Link } from "react-router-dom";

export default function NoProducts() {
  return (
    <tr>
      <td colSpan={6} className="text-center py-5">
        <i className="fas fa-box-open fa-3x text-muted opacity-50 mb-3"></i>
        <h5 className="text-muted">No Products Found</h5>
        <p className="text-muted">Start by creating your first product</p>
        <Link className="btn btn-success" to="/products/create">
          <i className="fas fa-plus-circle me-2"></i>Create Product
        </Link>
      </td>
    </tr>
  );
}
