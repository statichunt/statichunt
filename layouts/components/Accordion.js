import config from "@config/config.json";
import { slugify } from "@lib/utils/textConverter";
import Image from "next/future/image";
import { useEffect, useState } from "react";

const Accordion = ({
  data,
  slug,
  type,
  params,
  themes,
  arraySSG,
  setArraySSG,
  arrayCMS,
  setArrayCMS,
  arrayCSS,
  setArrayCSS,
  arrayCategory,
  setArrayCategory,
  arrayTool,
  setArrayTool,
  setIsIntro,
}) => {
  const [taxonomy, setTaxonomy] = useState(type);
  const { darkIconList } = config;

  useEffect(() => {
    const filterAddition = taxonomy.map((item, id) => ({
      ...item,
      selected: false,
    }));
    setTaxonomy(filterAddition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  //  sorting texonomy
  // const sortedTaxonomy = taxonomySorted(taxonomy);

  // const loadMore = () => {
  //   setnoOfElements(sortedTaxonomy.length);
  //   setReadMore(true);
  // };
  // const loadLess = () => {
  //   setnoOfElements(4);
  //   setReadMore(false);
  // };

  const handleOnClick = (label, type) => {
    // scroll to top
    window.scrollTo({ top: 0 });

    // set active state
    const temp = [...taxonomy];
    for (let i in temp) {
      const item = temp[i];
      if (slugify(item.frontmatter.title) === label) {
        item.selected = !item.selected;
      }
    }
    setTaxonomy(temp);

    // set ssg array
    if (type === "ssg") {
      if (arraySSG.includes(label)) {
        setArraySSG(arraySSG.filter((x) => x !== label));
      } else {
        setArraySSG((prevValue) => [...prevValue, label]);
      }
    }

    // set cms array
    if (type === "cms") {
      if (arrayCMS.includes(label)) {
        setArrayCMS(arrayCMS.filter((x) => x !== label));
      } else {
        setArrayCMS((prevValue) => [...prevValue, label]);
      }
    }

    // set css array
    if (type === "css") {
      if (arrayCSS.includes(label)) {
        setArrayCSS(arrayCSS.filter((x) => x !== label));
      } else {
        setArrayCSS((prevValue) => [...prevValue, label]);
      }
    }

    // set category array
    if (type === "category") {
      if (arrayCategory.includes(label)) {
        setArrayCategory(arrayCategory.filter((x) => x !== label));
      } else {
        setArrayCategory((prevValue) => [...prevValue, label]);
      }
    }

    // set tool array
    if (type === "tool") {
      if (arrayTool.includes(label)) {
        setArrayTool(arrayTool.filter((x) => x !== label));
      } else {
        setArrayTool((prevValue) => [...prevValue, label]);
      }
    }
  };
  // hide intro function
  useEffect(() => {
    if (setIsIntro) {
      if (
        arraySSG?.length > 0 ||
        arrayCategory?.length > 0 ||
        arrayCMS?.length > 0 ||
        arrayCSS?.length > 0
      ) {
        setIsIntro(false);
      } else {
        setIsIntro(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    arraySSG?.length,
    arrayCategory?.length,
    arrayCMS?.length,
    arrayCSS?.length,
  ]);
  // category items count
  const countItems = (params, item) =>
    themes.filter((theme) =>
      theme.frontmatter[params]
        ?.map((theme) => slugify(theme))
        .includes(slugify(item.frontmatter.title))
    ).length;

  return (
    <>
      {data.selected &&
        data.type === params &&
        taxonomy.map(
          (item, i) =>
            countItems(params, item) > 0 && (
              <a
                onClick={() =>
                  handleOnClick(slugify(item.frontmatter.title), data.type)
                }
                key={`item-${i}`}
                className={`filter-list ${item.selected && "active"}`}
                style={{ order: item.frontmatter.weight || "100" }}
              >
                <Image
                  className={`${
                    darkIconList.includes(slugify(item.frontmatter.title))
                      ? "dark:invert"
                      : ""
                  } ml-2`}
                  src={item.frontmatter.icon}
                  height={18}
                  width={18}
                  alt={item.frontmatter.title}
                  style={{ maxHeight: "18px" }}
                />

                <span className="ml-2 block"> {item.frontmatter.title}</span>
                <span className="ml-auto">{countItems(params, item)}</span>
              </a>
            )
        )}
    </>
  );
};

export default Accordion;
