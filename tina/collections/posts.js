const posts = {
  label: "Posts",
  name: "posts",
  path: "content/blog",
  format: "md",
  match: {
    include: "**/*",
    exclude: "{_index,_template}",
  },
  fields: [
    {
      type: "rich-text",
      name: "body",
      label: "Body of Document",
      description: "This is the markdown body",
      isBody: true,
    },
    {
      type: "string",
      name: "title",
      label: "title",
    },
    {
      type: "datetime",
      name: "date",
      label: "date",
    },
    {
      type: "string",
      name: "meta_title",
      label: "meta title",
    },
    {
      type: "string",
      name: "description",
      label: "description",
    },
    {
      type: "string",
      name: "categories",
      label: "categories",
      list: true,
    },
    {
      type: "string",
      name: "authors",
      label: "authors",
      list: true,
    },
    {
      type: "image",
      name: "image",
      label: "image",
    },
    {
      type: "boolean",
      name: "sponsored",
      label: "sponsored",
    },
    {
      type: "boolean",
      name: "draft",
      label: "draft",
    },
  ],
};

export default posts;
