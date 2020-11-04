import { fork, hydrate, serialize } from "effector";
import { useMemo } from "react";

let scope;

function initializeScope(domain, initialData) {
  const _scope = scope ?? fork(domain, { values: { ...initialData } });

  // If your page has Next.js data fetching methods that use a Effector scope, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    hydrate(domain, {
      values: {
        ...initialData,
      },
    });
  }
  // For SSG and SSR always create a new scope
  if (typeof window === "undefined") return _scope;
  // Create the scope once in the client
  if (!scope) scope = _scope;

  return _scope;
}

export function useScope(domain, initialState) {
  return useMemo(() => initializeScope(domain, initialState), [
    domain,
    initialState,
  ]);
}
