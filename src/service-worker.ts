/// <reference lib="webworker" />

import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

import API from "./Api";

declare const self: any;

/**
 * Precaching assets created by build process
 */
precacheAndRoute(self.__WB_MANIFEST);

/**
 *
 * INSTALL
 *
 * Instructs the latest service worker to activate after installation, as soon as it enters the waiting phase.
 * https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#skip_the_waiting_phase
 *
 */
self.addEventListener("install", (event: any) => {
    console.log("V1 installing…");

    self.skipWaiting();
});

/**
 *
 * ACTIVATE
 *
 * Instructs the latest service worker to take control of all clients as soon as it's activated.
 * https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#clientsclaim
 *
 */
self.addEventListener("activate", (event: any) => {
    console.log("V1 now ready to handle fetches!");
    event.waitUntil(clientsClaim());
});

/**
 * Cache frontend pages
 * https://developers.google.com/web/tools/workbox/guides/common-recipes#restrict_caches_for_a_specific_origin
 * StaleWhileRevalidate: Request resources from cache and network in parallel. Cache is updated with network response if it is available
 */
registerRoute(
    ({ url }) => !url.pathname.startsWith(API.defaults.baseURL!),
    new StaleWhileRevalidate({
        cacheName: "fluginfoFrontend",
    })
);
