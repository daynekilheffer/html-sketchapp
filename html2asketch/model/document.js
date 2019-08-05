import {generateID} from '../helpers/utils';
import ColorAsset from './colorAsset';

function pageToPageReference(page) {
  return {
    '_class': 'MSJSONFileReference',
    '_ref_class': 'MSImmutablePage',
    '_ref': `pages/${page.getID()}`
  };
}

function textStyleToSharedStyle(textLayer, id) {
  return {
    '_class': 'sharedStyle',
    'do_objectID': id || generateID(),
    name: textLayer._name,
    'style': textLayer._style.toJSON()
  };
}

class Document {
  constructor() {
    this._objectID = generateID();
    this._colors = [];
    this._textStyles = [];
    this._pages = [];
  }

  setName(name) {
    this._name = name;
  }

  setObjectID(id) {
    this._objectID = id;
  }

  addPage(page) {
    this._pages.push(page);
  }

  addTextStyle(textLayer, id) {
    this._textStyles.push(textStyleToSharedStyle(textLayer, id));
  }

  addColor(color) {
    if (color instanceof ColorAsset) {
      this._colors.push(color);
    }
    this._colors.push(ColorAsset.fromCSS(color));
  }

  toJSON() {
    return {
      '_class': 'document',
      'do_objectID': this._objectID,
      'assets': {
        '_class': 'assetCollection',
        'colorAssets': this._colors
      },
      'currentPageIndex': 0,
      'enableLayerInteraction': true,
      'enableSliceInteraction': true,
      'foreignSymbols': [],
      'layerStyles': {
        '_class': 'sharedStyleContainer',
        'objects': []
      },
      'layerSymbols': {
        '_class': 'symbolContainer',
        'objects': []
      },
      'layerTextStyles': {
        '_class': 'sharedTextStyleContainer',
        'objects': this._textStyles
      },
      'pages': this._pages.map(pageToPageReference)
    };
  }
}

export default Document;
