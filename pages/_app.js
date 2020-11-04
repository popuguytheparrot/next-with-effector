import { Provider } from "effector-react/ssr";
import { useScope } from "../src/useScope";
import { app, $lastUpdate } from "../src/model";

$lastUpdate.watch(console.log);

export default function App({ Component, pageProps }) {
  const scope = useScope(app, pageProps.initialState);

  console.log("scope.getState", scope.getState($lastUpdate));

  return (
    <Provider value={scope}>
      <Component {...pageProps} />
    </Provider>
  );
}
