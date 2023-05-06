import taxonomyFields from "../fields/taxonomy-fields";

const taxonomies = [
  {
    format: "md",
    label: "SSG",
    name: "ssg",
    path: "content/ssg",
    match: {
      include: "*",
      exclude: "_index",
    },
    fields: [...taxonomyFields],
  },
  {
    format: "md",
    label: "CMS",
    name: "cms",
    path: "content/cms",
    match: {
      include: "*",
      exclude: "_index",
    },
    fields: [...taxonomyFields],
  },
  {
    format: "md",
    label: "CSS",
    name: "css",
    path: "content/css",
    match: {
      include: "*",
      exclude: "_index",
    },
    fields: [...taxonomyFields],
  },
  {
    format: "md",
    label: "Category",
    name: "category",
    path: "content/category",
    match: {
      include: "*",
      exclude: "_index",
    },
    fields: [...taxonomyFields],
  },
  {
    format: "md",
    label: "Tools Category",
    name: "tools_category",
    path: "content/tools-category",
    match: {
      include: "*",
      exclude: "_index",
    },
    fields: [...taxonomyFields],
  },
];

export default taxonomies;
