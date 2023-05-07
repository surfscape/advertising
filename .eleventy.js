const markdownIt = require("markdown-it");
const markdownItAnc = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/public/");
  eleventyConfig.addPassthroughCopy("src/css/");
  eleventyConfig.addPassthroughCopy("src/*.txt");
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/*/*.md/");
  const md = markdownIt({
    html: true,
  });
  md.use(markdownItAnc, {
    tabIndex: false,
  });
  eleventyConfig.setLibrary("md", md);
  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "docs",
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: ["njk", "html"],
    dataTemplateEngine: "njk",
  };
};
