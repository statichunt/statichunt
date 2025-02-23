import Image from "next/image";
import Link from "next/link";

const SponsorCards = ({ sponsors, className }) => {
  return (
    <div className={`mb-9 ${className}`}>
      <h2 className="text-xl mb-2.5 pl-1">
        Our <span className="text-gradient">Sponsors</span>
      </h2>
      <div
        className={`row !overflow-hidden px-2 py-4 md:row-cols-2 xl:row-cols-3 2xl:row-cols-4 g-3`}
      >
        {sponsors?.map((sponsor, index) => (
          <div key={`sponsor-${index}`}>
            <div className="bg-body dark:bg-darkmode-primary/10 h-full rounded-[5px] shadow relative flex p-4">
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                height={290}
                width={400}
                className="max-w-[120px] object-cover rounded-md"
                priority
              />
              <div className="p-4  pt-0">
                <h4 className="h6 mb-2">
                  {sponsor.link.startsWith("http") ? (
                    <Link
                      href={`${sponsor.link}${sponsor.link?.includes("?") ? "" : "?ref=statichunt.com"}`}
                      target="_blank"
                      rel="sponsor"
                      className="stretched-link"
                    >
                      {sponsor.name}
                    </Link>
                  ) : (
                    <Link href={sponsor.link} className="stretched-link">
                      {sponsor.name}
                    </Link>
                  )}
                </h4>
                <p className="line-clamp-2 leading-5 text-dark font-normal text-sm dark:text-darkmode-light">
                  {sponsor.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorCards;
