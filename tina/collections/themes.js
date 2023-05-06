const themes = {
  label: "Themes",
  name: "themes",
  path: "content/themes",
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
      name: "github",
      label: "github",
    },
    {
      type: "string",
      name: "demo",
      label: "demo",
    },
    {
      type: "string",
      name: "author",
      label: "author",
    },
    {
      type: "string",
      name: "author_link",
      label: "author_link",
    },
    {
      type: "string",
      name: "ssg",
      label: "ssg",
      list: true,
    },
    {
      type: "string",
      name: "css",
      label: "css",
      list: true,
    },
    {
      type: "string",
      name: "cms",
      label: "cms",
      list: true,
    },
    {
      type: "string",
      name: "category",
      label: "category",
      list: true,
    },
    {
      type: "string",
      name: "description",
      label: "description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "boolean",
      name: "draft",
      label: "draft",
    },
  ],
};

export default themes;
