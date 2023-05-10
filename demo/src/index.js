
import mirador from 'mirador/dist/es/src/index';
import annotationPlugins from '../../src';
import LocalStorageAdapter from '../../src/adapters/LocalStorageAdapter';

const endpointUrl = 'http://127.0.0.1:3000/annotations';

const config = {
    annotation: {
        adapter: (canvasId) => new LocalStorageAdapter(`localStorage://?canvasId=${canvasId}`),
        // exportLocalStorageAnnotations: true, // display annotation JSON export button
    },
    id: 'demo',
    window: {
        defaultSideBarPanel: 'annotations',
        sideBarOpenByDefault: true,
    },
    catalog: [{
        manifestId: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
    }],
    windows: [{
        loadedManifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
    }],
};

mirador.viewer(config, [...annotationPlugins]);
