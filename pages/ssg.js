import Page from "../components/Page";
import { $lastUpdate } from "../src/model";

export default function SSG() {
  return <Page title="Index Page" linkTo="/other" />;
}

// If you build and start the app, the date returned here will have the same
// value for all requests, as this method gets executed at build time.
export function getStaticProps() {
  return { props: { initialState: { [$lastUpdate.sid]: Date.now() } } };
}
