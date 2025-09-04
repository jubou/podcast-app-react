const BASE_ITUNES_URL = "https://itunes.apple.com";
const PROXY_URL = "https://api.allorigins.win/get";

export const fetchWithFallback = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (directError) {
    console.error(
      `Direct fetch failed (CORS): ${directError.message}, falling back to proxy`,
    );

    const proxyUrl = `${PROXY_URL}?url=${encodeURIComponent(url)}`;
    const proxyResponse = await fetch(proxyUrl);

    if (!proxyResponse.ok) {
      console.error(`Proxy fetch failed: ${proxyResponse.status}`);
      return null;
    }

    const proxyData = await proxyResponse.json();
    return JSON.parse(proxyData?.contents || "{}");
  }
};

export const buildItunesUrl = (path) => `${BASE_ITUNES_URL}${path}`;
