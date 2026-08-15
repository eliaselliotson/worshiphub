import { UltimateGuitar } from "./UltimateGuitar/index.js";

export class Providers {
  static async search(query) {
    return (await UltimateGuitar.search(query)).map(e => ({ type: UltimateGuitar.id, ...e }));
  }

  static async load(url) {
    return { ...(await UltimateGuitar.load(url)), type: UltimateGuitar.id };
  }

  static canLoad(url) {
    return UltimateGuitar.canLoad(url);
  }
}
