# @mmaaikel/pdf-parse

**Pure javascript cross-platform module to extract texts from PDFs.**

## Similar Packages
* [pdf2json](https://www.npmjs.com/package/pdf2json) buggy, no support anymore, memory leak, throws non-catchable fatal errors
* [j-pdfjson](https://www.npmjs.com/package/j-pdfjson) fork of pdf2json
* [pdf-parser](https://github.com/dunso/pdf-parse) buggy, no tests
* [pdfreader](https://www.npmjs.com/package/pdfreader) using pdf2json
* [pdf-extract](https://www.npmjs.com/package/pdf-extract) not cross-platform using xpdf

## Based on
https://gitlab.com/autokent/pdf-parse

## Installation
`npm install @mmaaikel/pdf-parse`
 
## Basic Usage - Local Files

```js
import fs from 'fs'
import PdfParse from '@mmaaikel/pdf-parse'

let dataBuffer = fs.readFileSync('path to PDF file...');

PdfParse(dataBuffer).then(function(data) {
	// number of pages
	console.log(data.numpages);
	// number of rendered pages
	console.log(data.numrender);
	// PDF info
	console.log(data.info);
	// PDF metadata
	console.log(data.metadata); 
	// PDF.js version
	// check https://mozilla.github.io/pdf.js/getting_started/
	console.log(data.version);
	// PDF text
	console.log(data.text); 
        
});
```

## Exception Handling

```js
import fs from 'fs'
import PdfParse from '@mmaaikel/pdf-parse'

let dataBuffer = fs.readFileSync('path to PDF file...');

PdfParse(dataBuffer).then(function(data) {
	// use data
})
.catch(function(error){
	// handle exceptions
})
```

## Options

```js
const DEFAULT_OPTIONS = {
	// internal page parser callback
	// you can set this option, if you need another format except raw text
	pageRender: render_page,
	
	// max page number to parse
	max: 0,
	
	//check https://mozilla.github.io/pdf.js/getting_started/
	version: 'v1.10.100'
}
```
### *pageRender* (callback)
If you need another format except raw text.  

### *max* (number)
Max number of page to parse. If the value is less than or equal to 0, parser renders all pages.  

### *version* (string, pdf.js version)
check [pdf.js](https://mozilla.github.io/pdf.js/getting_started/)

* `'default'`
* `'v1.9.426'`
* `'v1.10.100'`
* `'v1.10.88'`
* `'v2.0.550'`

>*default* version is *v1.10.100*   
>[mozilla.github.io/pdf.js](https://mozilla.github.io/pdf.js/getting_started/#download)

## Test
* `mocha` or `npm test`
* Check [test folder](https://gitlab.com/autokent/pdf-parse/tree/master/test) and [quickstart.js](https://gitlab.com/autokent/pdf-parse/blob/master/quickstart.js) for extra usages.

## Support
I use this package actively myself, so it has my top priority. You can chat on WhatsApp about any infos, ideas and suggestions.

[![WhatsApp](https://img.shields.io/badge/style-chat-green.svg?style=flat&label=whatsapp)](https://api.whatsapp.com/send?phone=905063042480&text=Hi%2C%0ALet%27s%20talk%20about%20pdf-parse)

### Submitting an Issue
If you find a bug or a mistake, you can help by submitting an issue to [GitLab Repository](https://gitlab.com/autokent/pdf-parse/issues)

### Creating a Merge Request
GitLab calls it merge request instead of pull request.  

* [A Guide for First-Timers](https://about.gitlab.com/2016/06/16/fearless-contribution-a-guide-for-first-timers/)
* [How to create a merge request](https://docs.gitlab.com/ee/gitlab-basics/add-merge-request.html)
* Check [Contributing Guide](https://gitlab.com/autokent/pdf-parse/blob/master/CONTRIBUTING.md) 

## License
[MIT licensed](https://gitlab.com/autokent/pdf-parse/blob/master/LICENSE) and all it's dependencies are MIT or BSD licensed.
