import {makeColorFromCSS} from '../helpers/utils';

class ColorAsset {
  constructor({red, green, blue, alpha}) {
    this.setName(name);
    this.setColor(red, green, blue);
    this.setAlpha(alpha);
  }

  setName(name) {
    this._name = name;
  }

  setColor(red, green, blue) {
    this._red = red;
    this._green = green;
    this._blue = blue;
  }

  setAlpha(alpha) {
    this._alpha = alpha;
  }

  static fromCSS(color) {
    return new ColorAsset(makeColorFromCSS(color));
  }

  toJSON() {
    const obj = {
      _class: 'MSImmutableColorAsset',
      color: {
        _class: 'color',
        red: this._red,
        green: this._green,
        blue: this._blue,
        alpha: this._alpha
      }
    };

    if (this._name) {
      obj.name = this._name;
    }

    return obj;
  }
}

export default ColorAsset;
