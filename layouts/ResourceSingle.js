import Image from "next/future/image";

const ResourceSingle = ({ description, title, website, slug }) => {
  return (
    <section className="section">
      <div className="container max-w-[1200px]">
        <div className="row justify-center">
          <div className="mb-8 md:col-8 md:mb-0">
            <Image
              src={`/resources/${slug}.png`}
              alt={title}
              height={550}
              width={825}
              className="w-full rounded shadow-lg"
            />
          </div>
          <div className="md:col-4 lg:pl-12">
            <h1 className="mb-[10px] font-primary text-h2">{title}</h1>
            <p className="mb-2 text-lg">{description}</p>
            <div className="mt-5">
              <a
                className="btn btn-demo w-full border border-primary"
                href={`${website}?ref=statichunt.com`}
                target="_blank"
                rel="nofollow noreferrer"
              >
                Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourceSingle;
