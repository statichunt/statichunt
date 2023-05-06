const tools = {
  label: "Tools",
  name: "tools",
  path: "content/tools",
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
      type: "string",
      name: "website",
      label: "website",
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
      type: "string",
      name: "category",
      label: "category",
      list: true,
    },
  ],
};

export default tools;
