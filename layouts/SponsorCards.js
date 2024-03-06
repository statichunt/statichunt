import Image from "next/image";
import Link from "next/link";

const SponsorCards = ({ sponsors, className }) => {
  return (
    <div
      className={`row !overflow-hidden px-2 py-4 sm:row-cols-2 xl:row-cols-3 2xl:row-cols-4 ${className}`}
    >
      {sponsors?.map((sponsor, index) => (
        <div className="mb-8" key={`sponsor-${index}`}>
          <div className="bg-primary/10 dark:bg-darkmode-primary/10 h-full rounded relative shadow">
            <Image
              src={sponsor.image}
              alt={sponsor.name}
              height={290}
              width={400}
              className="w-full rounded-t object-cover"
            />
            <div className="p-4">
              <h4 className="h6 mb-3">
                {sponsor.link.startsWith("http") ? (
                  <Link
                    href={`${sponsor.link}${sponsor.link?.includes("?ref=") ? "" : "?ref=statichunt.com"}`}
                    target="_blank"
                    rel="noopener sponsor"
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
              <p className="text-sm text-dark dark:text-darkmode-light">
                {sponsor.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SponsorCards;
