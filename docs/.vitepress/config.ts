import { defineConfig } from "vitepress";
import { mdRenderFilename } from "./markdown";

export default defineConfig({
  lang: "en-US",
  title: 'Windi JS',
  cleanUrls: 'without-subfolders',
  description: 'The Utility-first CSS-In-JS Framework Powered by ES6 Proxy API and TypeScript.',
  markdown: {
    config(md) {
      md.use(mdRenderFilename)
    }
  },
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: 'Guide', link: '/guide/what-is-windijs' },
      { text: 'API', link: '/api' },
      { text: 'Repl', link: '/repl' },
      { text: 'Examples', link: 'https://github.com/windijs/windijs/tree/main/examples' },
    ],
    sidebar: [
      {
        text: 'Guide',
        collapsible: false,
        items: [
          {
            text: 'What is Windi JS?',
            link: '/guide/what-is-windijs'
          },
          {
            text: 'Getting Started',
            link: '/guide/getting-started'
          },
          {
            text: 'Configuration',
            link: '/guide/configuration'
          },
          {
            text: 'Optimization',
            link: '/guide/optimization'
          },
          {
            text: 'Browser Support',
            link: '/guide/browser-support'
          },
        ]
      },
      {
        text: "Integrations",
        collapsible: false,
        items: [
          {
            text: "CLI",
            link: "/integrations/cli",
          },
          {
            text: "Vite",
            link: "/integrations/vite",
          },
          {
            text: "Rollup",
            link: "/integrations/rollup",
          },
          {
            text: "Webpack",
            link: "/integrations/webpack",
          }
        ]
      },
      {
        text: "Customization",
        collapsible: false,
        items: [
          {
            text: "Theme",
            link: "/customization/theme"
          },
          {
            text: "Utility",
            link: "/customization/utility"
          },
          {
            text: "Variant",
            link: "/customization/variant"
          },
          {
            text: "Handler",
            link: "/customization/handler"
          },
          {
            text: "Loader",
            link: "/customization/loader",
          },
          {
            text: "Namer",
            link: "/customization/namer",
          },
          {
            text: "Plugins",
            link: "/customization/plugins"
          }
        ]
      },
      {
        text: "Posts",
        collapsible: false,
        items: [
          {
            text: "How Windi JS Works",
            link: "/posts/how-windijs-works"
          },
          {
            text: "Ways of Using Windi JS",
            link: "/posts/ways-of-using-windijs"
          },
          {
            text: "Windi JS and Web Components",
            link: "/posts/windijs-and-web-components"
          }
        ]
      }
    ],
    editLink: {
      pattern: 'https://github.com/windijs/windijs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/windijs/windijs' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Raven Satir'
    },
  }
});
