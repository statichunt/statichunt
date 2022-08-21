import Base from "@layouts/Baseof";

const notFound = () => {
  return (
    <Base>
      <section className="section">
        <div className="container">
          <div className="flex h-[40vh] items-center justify-center">
            <div className="text-center">
              <h1 className="mb-4">Error 404</h1>
              <p className="text-h2">Page Not Found!!</p>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default notFound;
