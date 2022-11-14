// module.exports = {
//   content: ['./pages/**/*.{html,js}', './components/**/*.{html,js}'],
//   plugins: [require('@tailwindcss/typography'), require('daisyui')],
//   daisyui: {
//     themes: [
//       'light',
//       'dark',
//       'cupcake',
//       'bumblebee',
//       'emerald',
//       'corporate',
//       'synthwave',
//       'retro',
//       'cyberpunk',
//       'valentine',
//       'halloween',
//       'garden',
//       'forest',
//       'aqua',
//       'lofi',
//       'pastel',
//       'fantasy',
//       'wireframe',
//       'black',
//       'luxury',
//       'dracula',
//       'cmyk',
//       'autumn',
//       'business',
//       'acid',
//       'lemonade',
//       'night',
//       'coffee',
//       'winter',
//     ],
//   },
// }

module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#111827", 
"secondary": "#111827",
"accent": "#18182F",
"neutral": "#18182F",
"base-100": "#FFFFFF",
"info": "#3ABFF8",
"success": "#36D399",        
"warning": "#FBBD23",        
"error": "#FF0000",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
  //...
}  