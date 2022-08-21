import Base from "@layouts/Baseof";
import ResourceSingle from "@layouts/ResourceSingle";
import { getSinglePages, getSinglePagesSlug } from "@lib/contents";

const Resource = ({ resource, slug }) => {
  const { frontmatter, content } = resource[0];
  const { title, description, image, noindex, canonical, website } =
    frontmatter;

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
      image={image}
    >
      <ResourceSingle
        title={title}
        description={description}
        website={website}
        slug={slug}
      />
    </Base>
  );
};

export default Resource;

export const getStaticPaths = () => {
  const slugs = getSinglePagesSlug("content/resources");
  const paths = slugs.map((resource) => ({
    params: {
      resource: resource,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params }) => {
  const { resource } = params;
  const allResources = getSinglePages("content/resources");
  const tools = getSinglePages("content/tool");
  const singleResources = allResources.filter((data) => data.slug == resource);

  return {
    props: {
      resource: singleResources,
      slug: resource,
      tool: tools,
      allResources: allResources,
    },
  };
};
