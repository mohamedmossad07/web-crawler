# Simple JS Bot Crawler 

#### Crawl web pages to collect basic information like e.g : title, description, keywords, count of referencing.
<br>

> ⚠️ This code is'nt for production , `just for practice` .
<br>
<br>

```bash
$ git clone https://github.com/mohamedmossad07/web-crawler
```

**Requirements**
- Node Js & (NPM).

##  Start crawling
 
```bash
$ npm start 'URL'
$ npm start http://127.0.0.1:5500/index.htm
```

## Or manually 
```javascript
const {crawl} = require('./crawl')
const response = crawl(pageURL,webSiteDomain)
response.then(result => console.log(result))
```

## Result :

```javascript
result will be like..
{'http://127.0.0.1:5500/index.html': {
    url: 'http://127.0.0.1:5500/index.html',
    ref: 4,
    title: 'Index',
    description: 'index desc',
    keywords: 'index keyword'
}
```
