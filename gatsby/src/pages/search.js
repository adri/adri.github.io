/** @jsx jsx */
import { jsx } from "theme-ui";
import Search from "../@lekoarts/gatsby-theme-minimal-blog/components/search";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";

const SearchPage = () => (
  <Layout title="Search" hideSearch={true}>
    <Search />
  </Layout>
);
export default SearchPage;
