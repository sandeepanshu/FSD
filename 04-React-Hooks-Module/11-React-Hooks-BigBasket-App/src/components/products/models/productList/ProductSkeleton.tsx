const ProductSkeleton = () => {
  return (
    <div className="row g-4">
      {[...Array(8)].map((_, i) => (
        <div className="col-lg-3 col-md-4 col-sm-6" key={i}>
          <div className="card placeholder-glow p-4">
            <div
              className="placeholder col-12 mb-3"
              style={{ height: 150 }}
            ></div>
            <div className="placeholder col-8 mb-2"></div>
            <div className="placeholder col-5"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
