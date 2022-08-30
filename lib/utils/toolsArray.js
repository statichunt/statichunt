export const toolsArray = (theme) => {
  var cms = [];
  if (theme.frontmatter?.cms) {
    cms = theme.frontmatter?.cms;
  }
  var css = [];
  if (theme.frontmatter?.css) {
    cms = theme.frontmatter?.css;
  }

  const tool = [...theme.frontmatter?.ssg, ...css, ...cms];
  return tool;
};
