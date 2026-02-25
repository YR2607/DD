import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_DbzVTzW4.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DSVrZ2Rp.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/yarik/Dumitru/New_copy/","cacheDir":"file:///Users/yarik/Dumitru/New_copy/node_modules/.astro/","outDir":"file:///Users/yarik/Dumitru/New_copy/dist/","srcDir":"file:///Users/yarik/Dumitru/New_copy/src/","publicDir":"file:///Users/yarik/Dumitru/New_copy/public/","buildClientDir":"file:///Users/yarik/Dumitru/New_copy/dist/client/","buildServerDir":"file:///Users/yarik/Dumitru/New_copy/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":true,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/index.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"company/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/company","isIndex":true,"type":"page","pattern":"^\\/company\\/?$","segments":[[{"content":"company","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/company/index.astro","pathname":"/company","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"works/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/works","isIndex":true,"type":"page","pattern":"^\\/works\\/?$","segments":[[{"content":"works","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/works/index.astro","pathname":"/works","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{margin:0;padding:0}\n"}],"routeData":{"type":"page","isIndex":false,"route":"/admin/[...params]","pattern":"^\\/admin(?:\\/(.*?))?\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@sanity/astro/dist/studio/studio-route.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/yarik/Dumitru/New_copy/node_modules/@sanity/astro/dist/studio/studio-route.astro",{"propagation":"none","containsHead":true}],["/Users/yarik/Dumitru/New_copy/src/pages/about/index.astro",{"propagation":"none","containsHead":true}],["/Users/yarik/Dumitru/New_copy/src/pages/company/index.astro",{"propagation":"none","containsHead":true}],["/Users/yarik/Dumitru/New_copy/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/yarik/Dumitru/New_copy/src/pages/works/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/yarik/Dumitru/New_copy/src/pages/works/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/about/index@_@astro":"pages/about.astro.mjs","\u0000@astro-page:node_modules/@sanity/astro/dist/studio/studio-route@_@astro":"pages/admin/_---params_.astro.mjs","\u0000@astro-page:src/pages/company/index@_@astro":"pages/company.astro.mjs","\u0000@astro-page:src/pages/works/[slug]@_@astro":"pages/works/_slug_.astro.mjs","\u0000@astro-page:src/pages/works/index@_@astro":"pages/works.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DkIymFn8.mjs","/Users/yarik/Dumitru/New_copy/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_rr6JQFZQ.mjs","@astrojs/react/client.js":"_astro/client.CWu9C_3G.js","/Users/yarik/Dumitru/New_copy/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.B2JwCNOJ.js","/Users/yarik/Dumitru/New_copy/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.B3K-FTeS.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/resources2.js":"_astro/resources2.DGBwvEda.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/resources6.js":"_astro/resources6.BHmPcXiL.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/VideoPlayer.js":"_astro/VideoPlayer.DSrYoVbA.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/resources4.js":"_astro/resources4.HNJlvRUe.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/resources.js":"_astro/resources.XhQCrAMC.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/resources5.js":"_astro/resources5.B7H0fjps.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/resources3.js":"_astro/resources3.ou3VQyxx.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/ViteDevServerStopped.js":"_astro/ViteDevServerStopped.CCyvNL8V.js","/Users/yarik/Dumitru/New_copy/node_modules/@sanity/client/dist/_chunks-es/stegaEncodeSourceMap.js":"_astro/stegaEncodeSourceMap.B7559XSW.js","/Users/yarik/Dumitru/New_copy/node_modules/@sanity/ui/dist/_chunks-es/refractor.mjs":"_astro/refractor.IKvaVw85.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/resources8.js":"_astro/resources8.BYBeJXDT.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/PresentationToolGrantsCheck.js":"_astro/PresentationToolGrantsCheck.ofVZFA0y.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/BroadcastDisplayedDocument.js":"_astro/BroadcastDisplayedDocument.BLwMkVuI.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/index2.js":"_astro/index2.CuxeVqJC.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/index3.js":"_astro/index3.BH7BeqNy.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/index4.js":"_astro/index4.CQMOVdgF.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/resources7.js":"_astro/resources7.CMvuNXAh.js","/Users/yarik/Dumitru/New_copy/node_modules/@sanity/visual-editing/dist/_chunks-es/renderVisualEditing.js":"_astro/renderVisualEditing.BLzQTcCK.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/QRCodeSVG.js":"_astro/QRCodeSVG.CxU6dBLT.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/LiveQueries.js":"_astro/LiveQueries.lxu_CJIF.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/PostMessageDocuments.js":"_astro/PostMessageDocuments.Co7uEuSU.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/PostMessageRefreshMutations.js":"_astro/PostMessageRefreshMutations.BGTsl6ij.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/PostMessagePerspective.js":"_astro/PostMessagePerspective.BPlDPu6i.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/PostMessagePreviewSnapshots.js":"_astro/PostMessagePreviewSnapshots.CczS6q-J.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/PostMessageSchema.js":"_astro/PostMessageSchema.DbcK_ZSX.js","/Users/yarik/Dumitru/New_copy/node_modules/sanity/lib/_chunks-es/PostMessageTelemetry.js":"_astro/PostMessageTelemetry.Bhy5MGm9.js","/Users/yarik/Dumitru/New_copy/node_modules/urlpattern-polyfill/index.js":"_astro/index.DPyTNidZ.js","/Users/yarik/Dumitru/New_copy/node_modules/@sanity/astro/dist/studio/studio-component":"_astro/studio-component.DcLSU83g.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.C2jNEG6n.css","/about_arch.png","/about_arch_2.png","/contact_portal.png","/hero.png","/vite.svg","/work1.png","/work2.png","/work3.png","/_astro/BroadcastDisplayedDocument.BLwMkVuI.js","/_astro/DisplayedDocumentBroadcaster.DjlGGhGj.js","/_astro/Layout.astro_astro_type_script_index_0_lang.B2JwCNOJ.js","/_astro/Layout.astro_astro_type_script_index_1_lang.B3K-FTeS.js","/_astro/LiveQueries.lxu_CJIF.js","/_astro/PostMessageDocuments.Co7uEuSU.js","/_astro/PostMessagePerspective.BPlDPu6i.js","/_astro/PostMessagePreviewSnapshots.CczS6q-J.js","/_astro/PostMessageRefreshMutations.BGTsl6ij.js","/_astro/PostMessageSchema.DbcK_ZSX.js","/_astro/PostMessageTelemetry.Bhy5MGm9.js","/_astro/PresentationToolGrantsCheck.ofVZFA0y.js","/_astro/QRCodeSVG.CxU6dBLT.js","/_astro/VideoPlayer.DSrYoVbA.js","/_astro/ViteDevServerStopped.CCyvNL8V.js","/_astro/browser.DGFY0RSf.js","/_astro/client.C73kiKoU.js","/_astro/client.CWu9C_3G.js","/_astro/compiler-runtime.BVN8GnAY.js","/_astro/index.DB4Po_jQ.js","/_astro/index.DN6yRWMu.js","/_astro/index.DPyTNidZ.js","/_astro/index.GAdVpEDN.js","/_astro/index2.CuxeVqJC.js","/_astro/index3.BH7BeqNy.js","/_astro/index4.CQMOVdgF.js","/_astro/refractor.IKvaVw85.js","/_astro/renderVisualEditing.BLzQTcCK.js","/_astro/resources.XhQCrAMC.js","/_astro/resources2.DGBwvEda.js","/_astro/resources3.ou3VQyxx.js","/_astro/resources4.HNJlvRUe.js","/_astro/resources5.B7H0fjps.js","/_astro/resources6.BHmPcXiL.js","/_astro/resources7.CMvuNXAh.js","/_astro/resources8.BYBeJXDT.js","/_astro/stegaEncodeSourceMap.B7559XSW.js","/_astro/studio-component.CBxzOH7u.js","/_astro/studio-component.DcLSU83g.js","/about/index.html","/company/index.html","/works/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"O5V32V4UUkcT7hEj+MnEY2ZjZDT32B5UFmAE/mGR3aQ="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
