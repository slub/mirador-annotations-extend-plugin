# mirador-annotations-extend-plugin

[![npm package][npm-badge]][npm]

`mirador-annotations-extend-plugin` is a [Mirador 3](https://github.com/projectmirador/mirador) plugin that adds annotation creation tools to the user interface. Users can create rectangle, oval, and freehand annotations, add text descriptors or tags and add an author to the annotation. The `mirador-annotations-extend-plugin` is based on the plugin [`mirador-annotations`](https://github.com/ProjectMirador/mirador-annotations/) and provides an adapted annotation panel to the user.

## Persisting Annotations
Persisting annotations requires implementing an a IIIF annotation server. Several [examples of annotation servers](https://github.com/IIIF/awesome-iiif#annotation-servers) are available on iiif-awesome.
`mirador-annotations-extend-plugin` currently supports adapters for [Heidelberger annotation server](https://github.com/slub/mirador-annotations-extend-plugin/blob/master/src/adapters/HeiAnnoAdapter.js) and [local storage](https://github.com/slub/mirador-annotations-extend-plugin/blob/master/src/adapters/LocalStorageAdapter.js).

## Installing `mirador-annotations-extend-plugin`
`mirador-annotations-extend-plugin` requires an instance of Mirador 3. This package is not part of the `npmjs registry`, so to install the package run `npm i https://github.com/user_name/mirador-annotations-extend-plugin`. See the [Mirador wiki](https://github.com/ProjectMirador/mirador/wiki) for examples of embedding Mirador within an application. See the [demo's index.js](https://github.com/slub/mirador-annotations-extend-plugin/blob/master/demo/src/index.js) for an example of importing the `mirador-annotations-extend-plugin` plugin and configuring the adapter.

## Credits
### NFDI4Culture
The Consortium for Research Data on Material and Immaterial Cultural Heritage (NFDI4Culture)

The aim of NFDI4Culture is to establish a demand-oriented infrastructure for research data on material and immaterial cultural assets. This includes 2D digitised reproductions of paintings, photographs and drawings as well as 3D digital models of culturally and historically important buildings, monuments or audiovisual data of music, film and stage performances. Concept and structure of the consortium were developed over two years in an open process and in close cooperation between 11 professional societies, 9 supporting institutions and 52 partners. The consortium addresses the needs of a broad spectrum of disciplines from architecture, art, music, theatre, dance, film and media studies.

[nfdi4culture.de](https://www.nfdi4culture.de)

[![Twitter](https://img.shields.io/twitter/follow/nfdi4culture?style=social)](https://twitter.com/nfdi4culture)


[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
