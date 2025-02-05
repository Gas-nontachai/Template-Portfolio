import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: "smooth",
            };
        }
        return savedPosition || { top: 0, behavior: "smooth" };
    },
};
