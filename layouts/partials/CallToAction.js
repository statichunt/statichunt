import { markdownify } from "lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const CallToAction = ({ call_to_action }) => {
  return (
    call_to_action.enable && (
      <section className="mb-28">
        <div className="container">
          <div className="rounded-md bg-white shadow px-4 py-16 dark:bg-darkmode-theme-light xl:p-20 relative z-20">
            <div className="row items-center justify-center text-center">
              <div className="md:col-7">
                {markdownify(call_to_action.title, "h2", "mb-2 h1")}
                {markdownify(call_to_action.description, "p", "mb-6")}
                <Link
                  className="btn btn-primary"
                  href={call_to_action.button_link}
                >
                  {call_to_action.button_label}
                </Link>
              </div>
            </div>

            {/* Start CTA BG SHAPES  */}
            <div className="pointer-events-none absolute left-0 top-0 -z-10 select-none">
              <Image
                className="overflow-hidden rounded-md max-md:w-1/2"
                src="/images/shapes/cta-s-1.svg"
                alt="shape"
                width={150}
                height={150}
              />
            </div>
            <div className="pointer-events-none absolute top-0 -z-10 select-none right-full md:right-0">
              <Image
                className="overflow-hidden rounded-md max-md:w-1/2"
                src="/images/shapes/cta-s-2.svg"
                alt="shape"
                width={150}
                height={150}
              />
            </div>
            <div className="pointer-events-none absolute left-0 bottom-0 -z-10 select-none">
              <Image
                className="overflow-hidden rounded-md max-md:w-1/2"
                src="/images/shapes/cta-s-3.svg"
                alt="shape"
                width={180}
                height={150}
              />
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default CallToAction;
