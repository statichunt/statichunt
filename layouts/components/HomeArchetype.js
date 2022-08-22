import { slugify } from "@lib/utils/textConverter";
import { useEffect, useState } from "react";

const HomeArchetype = ({
  themes,
  archetype,
  arrayArchetype,
  setArrayArchetype,
}) => {
  const [taxomomy, setTaxonomy] = useState(archetype);

  useEffect(() => {
    const filterAddition = taxomomy.map((item) => ({
      ...item,
      selected: false,
    }));
    setTaxonomy(filterAddition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClick = (label) => {
    const temp = [...taxomomy];
    for (let i in temp) {
      const item = temp[i];
      if (slugify(item.frontmatter.title) === label) {
        item.selected = !item.selected;
      }
    }
    setTaxonomy(temp);

    if (arrayArchetype.includes(label)) {
      setArrayArchetype(arrayArchetype.filter((x) => x !== label));
    } else {
      setArrayArchetype((prevValue) => [...prevValue, label]);
    }
  };

  // category items count
  const countItems = (item) =>
    themes.filter((theme) =>
      theme.frontmatter.archetype
        ?.map((theme) => slugify(theme))
        .includes(slugify(item.frontmatter.title))
    ).length;

  return (
    <ul className="archetype-list">
      {taxomomy.map((item, i) => (
        <li
          onClick={() => handleOnClick(slugify(item.frontmatter.title))}
          key={`item-${i}`}
          className={item.selected ? "active" : undefined}
        >
          {item.frontmatter.title}
          <span className="ml-auto">{countItems(item)}</span>
        </li>
      ))}
    </ul>
  );
};

export default HomeArchetype;
