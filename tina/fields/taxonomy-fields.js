const taxonomyFields = [
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
    name: "meta_title",
    label: "meta_title",
  },
  {
    type: "string",
    name: "page_title",
    label: "page_title",
  },
  {
    type: "number",
    name: "weight",
    label: "weight",
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
    type: "image",
    name: "icon",
    label: "icon",
  },
  {
    type: "string",
    name: "website",
    label: "website",
  },
  {
    type: "string",
    name: "github_path",
    label: "github_path",
  },
  {
    type: "string",
    name: "twitter_username",
    label: "twitter_username",
  },
  {
    type: "string",
    name: "license",
    label: "license",
  },
  {
    type: "string",
    name: "license_url",
    label: "license_url",
  },
  {
    type: "string",
    name: "language",
    label: "language",
  },
  {
    type: "string",
    name: "url",
    label: "url",
  },
  {
    type: "boolean",
    name: "draft",
    label: "draft",
  },
];

export default taxonomyFields;
