import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { createSidebarGroups } from "./src/scripts/createSidebarGroups";

const sidebarGroups = await createSidebarGroups();

// https://astro.build/config
export default defineConfig({
  site: process.env.ASTRO_SITE,
  base: process.env.ASTRO_BASE,
  integrations: [
    starlight({
      title: "JS Assertion Cheat Sheet",
      editLink: {
        baseUrl: "https://github.com/idea-pool/js-assertion-cheat-sheet/edit/main/src/content/docs/",
      },
      social: {
        github: "https://github.com/idea-pool",
      },
      logo:{
        src: './src/assets/idea-pool.png',
      },
      favicon: './src/assets/idea-pool.png',
      sidebar: [
        {
          label: "Introduction",
          link: "/",
        },
        ...sidebarGroups,
        {
          label: "Best Practices",
          link: "/practices",
        },
        {
          label: "Contribution",
          link: "/contribution",
        },
      ],
      components: {
        Footer: './src/components/Footer.astro',
      },
    }),
  ],
});
