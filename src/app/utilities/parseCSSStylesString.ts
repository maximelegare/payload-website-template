import { kebabToCamelCase } from "./kebabToCamelCase";

export const parseCSSStylesString = (styleString:string) => {
    return styleString.split(';').reduce((styleObject, styleProperty) => {
      let [property, value] = styleProperty.split(':').map(item => item.trim());
      if (property && value) {
        property = kebabToCamelCase(property);
        styleObject[property] = value;
      }
      return styleObject;
    }, {});
  }