import config from "@config/config.json";
import { slugify } from "@lib/utils/textConverter";
import { useFilterContext } from "context/state";
import Image from "next/image";
import { useEffect, useState } from "react";

const Accordion = ({ data, slug, type, params, themes, SetShowIntro }) => {
  const [taxonomy, setTaxonomy] = useState(type);
  const [test, setTest] = useState("");
  console.log(params);

  const { darkIconList } = config;

  const {
    setArraySSG,
    arraySSG,
    arrayCMS,
    setArrayCMS,
    arrayCSS,
    setArrayCSS,
    arrayCategory,
    setArrayCategory,
    arrayTool,
    setArrayTool,
    allReset,
  } = useFilterContext();

  useEffect(() => {
    const filterAddition = taxonomy.map((item, id) => ({
      ...item,
      selected: false,
    }));
    setTaxonomy(filterAddition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, allReset]);

  const handleOnClick = (label, type) => {
    setTest(type);
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
    if (SetShowIntro) {
      if (
        arraySSG?.length > 0 ||
        arrayCategory?.length > 0 ||
        arrayCMS?.length > 0 ||
        arrayCSS?.length > 0
      ) {
        SetShowIntro(false);
      } else {
        SetShowIntro(true);
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
  // const countItems = (params, item) => {
  //   const dataLength =
  //     test && test === item.taxonomy
  //       ? themes.filter((theme) =>
  //           theme.frontmatter[item.taxonomy]
  //             ?.map((theme) => slugify(theme))
  //             .includes(slugify(item.frontmatter.title))
  //         ).length
  //       : themes.filter((theme) =>
  //           theme.frontmatter[item.taxonomy]
  //             ?.map((theme) => slugify(theme))
  //             .includes(slugify(item.frontmatter.title))
  //         ).length;
  //   return dataLength;
  // };
  return (
    <>
      {data.selected &&
        data.type === params &&
        taxonomy.map(
          (item, i) => (
            // countItems(params, item) > 0 && (
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

              <span className="ml-2 block">{item.frontmatter.title}</span>
              <span className="ml-auto">
                {
                  themes.filter((d) =>
                    d.frontmatter[data.type]
                      .map((d) => slugify(d))
                      .includes(slugify(item.frontmatter.title))
                  ).length
                }
              </span>
            </a>
          )
          // )
        )}
    </>
  );
};

export default Accordion;
