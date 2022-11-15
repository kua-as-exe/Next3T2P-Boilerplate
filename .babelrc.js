module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    'babel-plugin-twin',
    'babel-plugin-macros',
    [ '@babel/plugin-transform-typescript', {
      allowDeclareFields: true
    }],
    [ 'next-apikit/babel-plugin/dist', {
      'printClientCode': true
    }],
    '@emotion/babel-plugin', 
    ["transform-imports", {
      // "react-icons/[a-z]{2}": {
      //   transform: (importName) => {
      //     console.log("R-Icon:", importName)
      //     const initials = String(importName).slice(0, 2)
      //     const pkg = initials.toLowerCase() // ex: "md", "hi", "fi", "fa"
      //     return `@react-icons/all-files/${pkg}/${importName}` 
      //   },
      //   preventFullImport: false,
      // }
      // "flowbite-react": {
      //   transform: (importName, matches, e) => {
      //     console.log({ importName, matches, e })
      //     return `flowbite-react/lib/cjs/components/${importName}` 
      //   },
      //   preventFullImport: true
      // },
    }],
  ],
}
