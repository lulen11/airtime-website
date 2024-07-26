var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";
/**
 * The project's Prismic repository name.
 */
export var repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;
/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
var routes = [
  // Examples:
  {
    type: "home_page",
    uid: "homepage",
    path: "/",
  },
  {
    type: "development_home_page",
    uid: "development-home",
    path: "/development-home",
  },
  // {
  //   type: "player_page",
  //   path: "/:uid",
  // },
  {
    type: "player_listing_page",
    path: "/players",
  },
  {
    type: "player_card",
    path: "/players/:uid",
  },
  // {
  //   type: "page",
  //   path: "/:uid",
  // },
  // {
  //   type: "page",
  //   path: "/about",
  // },
];
/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export var createClient = function (config) {
  if (config === void 0) {
    config = {};
  }
  var client = prismic.createClient(
    repositoryName,
    __assign(
      {
        routes: routes,
        fetchOptions:
          process.env.NODE_ENV === "production"
            ? { next: { tags: ["prismic"] }, cache: "force-cache" }
            : { next: { revalidate: 5 } },
      },
      config
    )
  );
  prismicNext.enableAutoPreviews({
    client: client,
    previewData: config.previewData,
    req: config.req,
  });
  return client;
};
