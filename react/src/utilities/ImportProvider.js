export const backendRoot = "https://backend.worshiphubcloud.workers.dev";

export class ImportProvider {
  static async search(query) {
    try {
      // Handle invalid queries
      if (typeof query !== "string" || !query?.length) {
        return { directImport: false, results: [] };
      }

      // Send a request to the backend worker
      const encodedQuery = encodeURIComponent(query);
      const requestUrl = `${backendRoot}/search?query=${encodedQuery}`;
      const response = await fetch(requestUrl);

      // Handle failed requests
      if (!response.ok) {
        return { directImport: false, results: [] };
      }

      const responseBody = await response.json();

      // Handle when the request gives a direct import string
      if (typeof responseBody === "string") {
        return { directImport: responseBody, results: [] };
      }
      
      // Handle when the request gives an array of results
      else if (typeof responseBody === "object" && Array.isArray(responseBody)) {
        return { directImport: false, results: responseBody };
      }
      
      // Handle anything else the request might give
      else {
        return { directImport: false, results: [] };
      }
    }
    
    // Handle any errors
    catch(e) {
      console.error(e);
      return { directImport: false, results: [] };
    }
  }

  static async import(url) {
    try {
      // Handle invalid urls
      if (typeof url !== "string" || !url?.length) {
        return;
      }

      // Send a request to the backend worker
      const encodedUrl = encodeURIComponent(url);
      const requestUrl = `${backendRoot}/import?url=${encodedUrl}`;
      const response = await fetch(requestUrl);

      // Handle failed requests
      if (!response.ok) {
        return;
      }

      const responseBody = await response.json();
      
      // Handle when the request gives an output object
      if (typeof responseBody === "object") {
        return responseBody;
      }
      
      // Handle anything else the request might give
      else {
        return;
      }
    }
    
    // Handle any errors
    catch(e) {
      console.error(e);
      return;
    }
  }
}
