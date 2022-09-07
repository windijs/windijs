import { defineConfig } from "vitepress";

export default defineConfig({
  title: 'Windi JS',
  lang: "en-US",
  description: 'The Utility-first CSS-In-JS Framework Powered by ES6 Proxy API and TypeScript.',
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
            text: "Custom Theme",
            link: "/customization/custom-theme"
          },
          {
            text: "Custom Utility",
            link: "/customization/custom-utility"
          },
          {
            text: "Custom Variant",
            link: "/customization/custom-variant"
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
            text: "How Configuration Works",
            link: "/posts/how-config-works"
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
