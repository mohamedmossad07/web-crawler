const { JSDOM } = require("jsdom");

async function crawl(url, base, retObj = {}) {
  const normalizedUrl = normalizeURL(url, base);

  if (!normalizedUrl) return retObj;

  console.log(`Crawling ${normalizedUrl.slice(0, 50)}...`);

  if (normalizedUrl in retObj) {
    retObj[normalizedUrl].ref += 1;
    return retObj;
  }
  try{
	  const res = await fetch(normalizedUrl);
	  if (res.status > 399) return retObj;
	  const html = await res.text();
	  const dom = new JSDOM(html);
	  const aElements = dom.window.document.querySelectorAll("a");

	  const returnReport = {
	    url: normalizedUrl,
	    ref: 1,
	    title:
	      dom.window.document.querySelectorAll("title").item(0)?.innerHTML || "",
	    description: "",
	    keywords: "",
	  };

	  dom.window.document.querySelectorAll("meta").forEach((meta) => {
	    if (
	      meta.name.toLowerCase() == "description" ||
	      meta.httpEquiv.toLowerCase() == "description"
	    )
	      returnReport.description = meta.content;
	    if (meta.name.toLowerCase() == "keywords")
	      returnReport.keywords = meta.content;
	  });

	  console.log(`Found ${aElements.length} 'a' Tag in ${normalizedUrl}.`);

	  retObj[normalizedUrl] = returnReport;

	  for (const a of aElements) {
	    await crawl(a.href, base, retObj);
	  }
    
  } catch (error) {
    console.log(`Network ERROR fetch failed.`);
  }
  return retObj;
  
}

function normalizeURL(url, baseURL) {
  try {
    if (!url) return "";

    const base = new URL(baseURL);
    if (url.endsWith("/")) url = url.slice(0, -1);

    //check if the url as like the base
    if (url && url.startsWith("http")) {
      const newUrl = new URL(url);
      if (newUrl.hostname != base.hostname) return "";
      return url;
    } else {
      if (url.startsWith("//")) {
        return "";
      } else if (url.startsWith("/")) {
        return base.origin + url;
      } else if (url.startsWith("../")) {
        return base.origin + "/" + url;
      } else if (url.startsWith("./")) {
        return base.origin + url.slice(1);
      } else if (url.startsWith("#") || url.startsWith("javascript:")) {
        return "";
      } else {
        return base.origin + "/" + url;
      }
    }
  } catch (error) {
    console.log(`Couldn't normalize ${url}.`);
  }
  return "";
}

module.exports = {
  normalizeURL,
  crawl,
};
