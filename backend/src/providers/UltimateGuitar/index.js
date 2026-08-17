import { UltimateGuitarImporter } from "./Importer.js";
import { UltimateGuitarSearch } from "./Search.js";

class UltimateGuitar {
  static urlPattern = /^https:\/\/tabs\.ultimate-guitar\.com\/tab\/.*\/[^0-9]*[0-9]+$/m;
  static id = "ultimateguitar";
  static name = "Ultimate Guitar";

  static async search(query) {
    return await UltimateGuitarSearch.search(query);
  }

  static async load(url) {
    return await UltimateGuitarImporter.load(url);
  }
  
  static canLoad(url) {
    return this.urlPattern.test(url);
  }
}

export { UltimateGuitar };
