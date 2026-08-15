import { UltimateGuitarLoader } from "./Loader.js";

/**
 * A utility class to load Ultimate Guitar tabs.
 * @example
 * const myTab = await UltimateGuitarImporter.loadTab(tabUrl);
 */
export class UltimateGuitarImporter {
  /**
   * Generates an object containing various pieces of tab metadata
   * @static
   * @param {object} tabData The full tab data object
   * @returns A simplified object containing various pieces of the tab metadata
   */
  static getTabMetadata(tabData) {
    return {
      src: tabData?.tab?.tab_url,
      tabId: tabData?.tab?.id,
      tabName: tabData?.tab?.song_name,
      key: tabData?.tab_view?.versions[tabData?.tab?.version - 1].tonality_name,
      artist: tabData?.tab?.artist_name,
      artistUrl: tabData?.tab?.artist_url,
      uploader: tabData?.tab?.username,
      uploaderUrl: 'https://www.ultimate-guitar.com/u/' + tabData?.tab?.username
    }
  }

  /**
   * Gets the tab content string from the full tab data object
   * @static
   * @param {object} tabData The full tab data object
   * @returns The tab content data string
   */
  static getTabContent(tabData) {
    return tabData?.tab_view?.wiki_tab?.content;
  }

  /**
   * Takes any line from the Ultimate Guitar tab and separates the text and the chords
   * @static
   * @param {string} tabLine The line from the tab
   * @returns An object containing the tab text and chords
   */
  static parseTabLine(tabLine) {
    let lineText = tabLine;
    let lineChords = [];

    // Check for every chord in the line
    while (lineText.indexOf('[ch]') >= 0) {
      const chordPos = lineText.indexOf('[ch]');
      const chord = lineText.slice(chordPos, lineText.indexOf('[/ch]') + 5);
      const chordText = chord.slice(4, -5);

      // Replace the chord in the line text with whitespace
      lineText = lineText.slice(0, chordPos) + ' '.repeat(chord.length - 9) + lineText.slice(chordPos + chord.length);

      // Add the chord to the chord list
      lineChords.push({ pos: chordPos, text: chordText })
    }

    return { text: lineText, chords: lineChords };
  }

  /**
   * Takes the tab content string and parses it
   * @static
   * @param {string} tabContent The tab content string
   * @returns An array containing the parsed chord data
   */
  static parseTabContent(tabContent) {
    const tabs = tabContent
      .match(/\[tab\].*?\[\/tab\]/gms)
      .map(e => e.slice(5, -6));

    for (let tab in tabs) {
      tabs[tab] = tabs[tab].split('\r\n').map(e => this.parseTabLine(e));
    }

    return tabs;
  }

  /**
   * Loads a formatted tab data object from an Ultimate Guitar tab url
   * @static
   * @async
   * @param {string} tabUrl The Ultimate Guitar tab url
   * @returns A formatted tab data object with all of the needed tab data
   */
  static async load(tabUrl) {
    const tabData = await UltimateGuitarLoader.load(tabUrl);
    const tabMeta = this.getTabMetadata(tabData);
    const tabContent = this.getTabContent(tabData);
    const tabContentParsed = this.parseTabContent(tabContent);

    return {
      ...tabMeta,
      content: tabContentParsed,
      separators: [],
      version: 1
    };
  }
}
