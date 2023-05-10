/** */
export default class WebAnnotation {
  /** */
  constructor({
    body, canvasId, creator, id, motivation, manifestId, target,
  }) {
    this.id = id;
    this.canvasId = canvasId;
    this.target = target;
    this.body = body;
    this.creator = creator;
    this.motivation = motivation;
    this.manifestId = manifestId;
  }

  /** */
  toJson() {
    if (this.creator) {
      return {
        body: this.body,
        creator: this.returnCreator(),
        id: this.id,
        motivation: this.returnMotivation(),
        target: this.returnTarget(),
        type: 'Annotation',
      };
    }
    return {
      body: this.body,
      id: this.id,
      motivation: this.returnMotivation(),
      target: this.returnTarget(),
      type: 'Annotation',
    };
  }

  /** */
  returnTarget() {
    let target = this.canvasId;
    if (this.target) {
      target = {
        selector: this.target,
        source: this.source(),
      };
    }
    return target;
  }

  /** */
  returnCreator() {
    return {
      id: 'https://anno.iiif.arthistoricum.net/user/1',
      name: this.creator,
      type: 'Person',
    };
  }

  /** */
  returnMotivation() {
    if (this.motivation) {
      return this.motivation;
    }
    return 'commenting';
  }

  /** */
  source() {
    let source = this.canvasId;
    if (this.manifest) {
      source = {
        id: this.canvasId,
        partOf: {
          id: this.manifest.id,
          type: 'Manifest',
        },
        type: 'Canvas',
      };
    }
    return source;
  }
}
