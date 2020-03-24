module.exports = {
  distDir: "_next",
  pageExtensions: ["jsx", "js"],
  exportPathMap: function() {
    return {
      "/": { page: "/" }
    }
  }
}
