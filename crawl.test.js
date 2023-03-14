const { normalizeURL, crawl } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("Crawl link then return report.", () => {
  crawl("http://127.0.0.1:5500/", "http://127.0.0.1:5500/").then((report) => {
    const expected = {
      "http://127.0.0.1:5500": {
        description: "index desc",
        keywords: "index keyword",
        ref: 1,
        title: "Index",
        url: "http://127.0.0.1:5500",
      },
      "http://127.0.0.1:5500/index.html": {
        description: "index desc",
        keywords: "index keyword",
        ref: 5,
        title: "Index",
        url: "http://127.0.0.1:5500/index.html",
      },
      "http://127.0.0.1:5500/page1.html": {
        description: "Page1 desc",
        keywords: "page1 keyword",
        ref: 5,
        title: "Page 1",
        url: "http://127.0.0.1:5500/page1.html",
      },
    };
    expect(report).toEqual(expected);
  });
});
test("Normalize full URL.", () => {
  const actual = normalizeURL(
    "http://127.0.0.1:5500/",
    "http://127.0.0.1:5500/"
  );
  const expected = "http://127.0.0.1:5500";
  expect(actual).toEqual(expected);
});
test("Normalize abs / URL.", () => {
  const actual = normalizeURL("/index.html", "http://127.0.0.1:5500/");
  const expected = "http://127.0.0.1:5500/index.html";
  expect(actual).toEqual(expected);
});
test("Normalize abs // URL.", () => {
  const actual = normalizeURL("//car.smcegy.com", "http://127.0.0.1:5500/");
  const expected = "";
  expect(actual).toEqual(expected);
});
test("Normalize page URL.", () => {
  const actual = normalizeURL("page1.html", "http://127.0.0.1:5500/");
  const expected = "http://127.0.0.1:5500/page1.html";
  expect(actual).toEqual(expected);
});
test("Normalize page URL with ./", () => {
  const actual = normalizeURL("./page1.html", "http://127.0.0.1:5500/");
  const expected = "http://127.0.0.1:5500/page1.html";
  expect(actual).toEqual(expected);
});
test("Normalize page URL with ../", () => {
  const actual = normalizeURL("../current_folder", "http://127.0.0.1:5500/");
  const expected = "http://127.0.0.1:5500/../current_folder";
  expect(actual).toEqual(expected);
});
test("Normalize page URL with #", () => {
  const actual = normalizeURL("#anchor", "http://127.0.0.1:5500/");
  const expected = "";
  expect(actual).toEqual(expected);
});
test("Normalize page URL with javascript:", () => {
  const actual = normalizeURL("javascript:", "http://127.0.0.1:5500/");
  const expected = "";
  expect(actual).toEqual(expected);
});
