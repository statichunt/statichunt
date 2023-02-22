import { toolsArray } from "@lib/utils/toolsArray";
import { useSerachContext } from "context/searchContext";
import Link from "next/link";
import ImageFallback from "../ImageFallback";
import ToolsIcon from "../ToolsIcon";

const ThemesCard = ({ tools, themes, resources, blogs, setSearchModal }) => {
  const { isBlog, isResource } = useSerachContext();

  return (
    <div
      className={`row p-2 ${
        (blogs.length || resources.length) && (isBlog || isResource)
          ? "row-cols-1 sm:row-cols-2"
          : "row-cols-1 sm:row-cols-2 md:row-cols-3 lg:row-cols-4"
      }`}
    >
      {themes.slice(0).map((theme, i) => (
        <div key={`theme-${i}`} className={`col mb-4`}>
          <div className="relative rounded-md shadow">
            <ImageFallback
              src={`/themes/${theme.slug}.png`}
              fallback={`https://teamosis-sg.vercel.app/api/img?url=${theme.frontmatter.demo}`}
              height={130}
              width={230}
              alt={theme.frontmatter?.title}
              className="mb-4 block h-auto w-full rounded-t"
            />

            <div className="px-4">
              <h3 className="h6 mb-3 text-base font-bold leading-4">
                <Link
                  className="after:absolute after:inset-0 hover:underline"
                  href={`/themes/${theme.slug}`}
                  onClick={() => setSearchModal(false)}
                >
                  {theme.frontmatter.title}
                </Link>
              </h3>

              <div style={{ zoom: 0.8 }}>
                <ToolsIcon
                  tools={tools}
                  type={toolsArray(theme)}
                  themeCard={true}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThemesCard;
