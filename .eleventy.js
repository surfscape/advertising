const markdownIt = require("markdown-it");
const markdownItAnc = require("markdown-it-anchor");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

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
  if (process.env.ELEVENTY_ENV === "production") {
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
      // The base URL: defaults to Path Prefix
      baseHref: "/advertising",
      // But you could use a full URL here too:
      // baseHref: "http://example.com/"

      // Comma separated list of output file extensions to apply
      // our transform to. Use `false` to opt-out of the transform.
      extensions: "html",

      // Rename the filters
      filters: {
        base: "htmlBaseUrl",
        html: "transformWithHtmlBase",
        pathPrefix: "addPathPrefixToUrl",
      },
    });
  }
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
