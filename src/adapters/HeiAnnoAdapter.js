/* 
 * Annotation adapter for usage with heiANNO annotation server (https://github.com/kba/anno-common)
 * important! to create an annotation the id has to consist of the annotation id and the enpoint url
 * further actions on an annotation (update/delete) have to get adressed to the annotation id only
 * this is not pretty but it is the way it works
*/

/** */
export default class HeiAnnoAdapter {
  /** */
  constructor(canvasId, endpointUrl) {
    this.canvasId = canvasId;
    this.endpointUrl = endpointUrl;
  }

  /** */
  get annotationPageId() {
    return `${this.endpointUrl}/?uri=${this.canvasId}`;
  }

  /** */
  async create(annotation) {
    return fetch(this.endpointUrl, {
      body: JSON.stringify({
        body: annotation.body,
        created: new Date().toISOString(),
        ...(annotation.creator && { creator: annotation.creator }),
        id: `${this.endpointUrl}/${annotation.id}`,
        motivation: annotation.motivation,
        target: annotation.target,
        type: 'Annotation',
        uri: this.canvasId,
      }),
      dataType: 'json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => this.all())
      .catch(() => this.all());
  }

  /** */
  async update(annotation) {
    return fetch(annotation.id, {
      body: JSON.stringify({
        body: annotation.body,
        ...(annotation.creator && { creator: annotation.creator }),
        id: `${annotation.id}`,
        modified: new Date().toISOString(),
        ...(annotation.motivation && { motivation: annotation.motivation }),
        target: annotation.target,
        type: 'Annotation',
        uri: this.canvasId,
      }),
      dataType: 'json',
      headers: {
        Accept: 'application/ld+json',
        'Content-Type': 'application/json; charset=utf-8',
        'X-Anno-Collection': 'default',
        'X-Anno-Context': 'http://www.w3.org/ns/anno.jsonld',
      },
      method: 'PUT',
    })
      .then((response) => this.all())
      .catch(() => this.all());
  }

  /** */
  async delete(annotationId) {
    return fetch(`${annotationId}`, {
      dataType: 'json',
      headers: {
        Accept: 'application/ld+json',
        'Content-Type': 'application/json; charset=utf-8',
        'X-Anno-Collection': 'default',
        'X-Anno-Context': 'http://www.w3.org/ns/anno.jsonld',
      },
      method: 'DELETE',
    })
      .then((response) => this.all())
      .catch(() => this.all());
  }

  /** */
  async all() {
    // GET-Request for annotation Manifest
    const resp = await (await fetch(this.annotationPageId)).json();

    // check if there are annotations available
    if (resp.hasOwnProperty('first')) {
      // return an annotation page created out of the annotation items for displaying in Mirador3
      return this.returnAnnotationPage(resp.first.items);
    }
    return [];
  }

  /** basic sample function to create an annotation body */
  static createAnnotation(annotation) {
    const annotationBody = {};
    annotationBody.id = `${this.endpointUrl}/${encodeURIComponent(annotation.id)}`;
    annotationBody.type = 'Annotation';
    annotationBody.created = new Date().toISOString();
    annotation.creator && (annotationBody.creator = annotation.creator);
    annotationBody.uri = this.canvasId;
    // annotation.motivation && ( annotationBody.motivation = annotation.motivation );
    annotationBody.motivation = annotation.motivation;
    annotationBody.target = annotation.target;
    annotationBody.body = annotation.body;
    return annotationBody;
  }

  /** create AnnotationPage from all annotations */
  returnAnnotationPage(annotation) {
    if (Array.isArray(annotation)) {
      const annotationList = annotation.map(anno => this.returnAnnotation(anno, this.canvasId));
      return {
        id: this.annotationPageId,
        items: annotationList,
        type: 'AnnotationPage',
      };
    }
    return annotation;
  }

  /** */
  returnAnnotation(annotation) {
    const anno = {
      body: [],
      created: annotation.created,
      ...(annotation.creator && { creator: annotation.creator }),
      id: annotation.id,
      motivation: annotation.motivation,
      target: annotation.target,
      type: annotation.type,
      uri: annotation.uri,
    };
    if (annotation.body) {
      anno.body = annotation.body;
    }
    return anno;
  }

  /** */
  static returnAnnotationTarget(annoTarget) {
    return annoTarget;
  }

  /** */
  static returnAnnotationSelector(selector) {
    const FragmentSelector = {};
    const SvgSelector = {};
    if (Array.isArray(selector)) {
      return selector;
    } else {
      if (selector.type == 'SvgSelector') {
        SvgSelector.type = selector.type;
        SvgSelector.value = selector.value;
      }
      if (selector.oa_svg_value) {
        FragmentSelector.type = 'FragmentSelector';
        FragmentSelector.value = selector.oa_svg_value;
      }
    }
    return [FragmentSelector, SvgSelector];
  }
}
