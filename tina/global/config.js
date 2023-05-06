const config = {
  label: "Configuration",
  name: "configuration",
  path: "config",
  format: "json",
  ui: {
    global: true,
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  match: {
    include: "config",
  },
  fields: [
    {
      label: "Site",
      name: "site",
      type: "object",
      fields: [
        {
          label: "Title",
          name: "title",
          type: "string",
        },
      ],
    },
    {
      label: "Announcement",
      name: "announcement",
      type: "object",
      fields: [
        {
          label: "Enable",
          name: "enable",
          type: "boolean",
        },
        {
          label: "Name",
          name: "name",
          type: "string",
        },
        {
          label: "Link",
          name: "link",
          type: "string",
        },
        {
          label: "Content",
          name: "content",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
    {
      label: "Metadata",
      name: "metadata",
      type: "object",
      fields: [
        {
          label: "Author",
          name: "meta_author",
          type: "string",
        },
        {
          label: "Image",
          name: "meta_image",
          type: "image",
        },
        {
          label: "Description",
          name: "meta_description",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
};

export default config;
