import { slugify } from "@lib/utils/textConverter";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Accordion = ({
  data,
  type,
  params,
  themes,
  arraySSG,
  setArraySSG,
  arrayCMS,
  setArrayCMS,
  arrayCSS,
  setArrayCSS,
  arrayArchetype,
  setArrayArchetype,
  arrayTool,
  setArrayTool,
}) => {
  const [taxomomy, setTaxonomy] = useState(type);
  const router = useRouter();
  const parseSSG = router.query.ssg && router.query.ssg.split("~");

  const handleOnClick = (label, type) => {
    const temp = [...taxomomy];
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

    // set archetype array
    if (type === "archetype") {
      if (arrayArchetype.includes(label)) {
        setArrayArchetype(arrayArchetype.filter((x) => x !== label));
      } else {
        setArrayArchetype((prevValue) => [...prevValue, label]);
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
        taxomomy.map(
          (item, i) =>
            countItems(params, item) > 0 && (
              <a
                onClick={() =>
                  handleOnClick(slugify(item.frontmatter.title), data.type)
                }
                key={`item-${i}`}
                className={`filter-list ${item.selected && "active"} ${
                  parseSSG?.includes(slugify(item.frontmatter.title)) &&
                  "active"
                }`}
                style={{ order: item.frontmatter.weight || "100" }}
              >
                <Image
                  className="ml-2"
                  src={item.frontmatter.icon}
                  height={18}
                  width={18}
                  alt={item.frontmatter.title}
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
