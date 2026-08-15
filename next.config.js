/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static: no api routes, no server actions, no image optimization.
  // `next build` writes plain html/js to out/, which is published to the
  // gh-pages branch and served at javier.xyz/cohesive-colors.
  output: "export",
  basePath: "/cohesive-colors",
};

module.exports = nextConfig;
