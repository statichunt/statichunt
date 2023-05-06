const menu = {
  label: "Menu",
  name: "menu",
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
    include: "menu",
  },
  fields: [
    {
      label: "Main Menu",
      name: "main",
      type: "object",
      list: true,
      fields: [
        {
          label: "Name",
          name: "name",
          type: "string",
        },
        {
          label: "URL",
          name: "url",
          type: "string",
        },
      ],
      ui: {
        itemProps: (item) => {
          return { label: `${item?.name}` };
        },
      },
    },
    {
      label: "Footer Menu",
      name: "footer",
      type: "object",
      list: true,
      fields: [
        {
          label: "Name",
          name: "name",
          type: "string",
        },
        {
          label: "Pages",
          name: "pages",
          type: "object",
          list: true,
          fields: [
            {
              label: "Name",
              name: "page",
              type: "string",
            },
            {
              label: "URL",
              name: "url",
              type: "string",
            },
          ],
          ui: {
            itemProps: (item) => {
              return { label: `${item?.page}` };
            },
          },
        },
      ],
      ui: {
        itemProps: (item) => {
          return { label: `${item?.name}` };
        },
      },
    },
  ],
};

export default menu;
