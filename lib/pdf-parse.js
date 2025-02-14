const renderPage = ( pageData ) => {
    //check documents https://mozilla.github.io/pdf.js/
    //ret.text = ret.text ? ret.text : "";

    let renderOptions = {
        //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
        normalizeWhitespace: false,
        //do not attempt to combine same line TextItem's. The default value is `false`.
        disableCombineTextItems: false
    }

    return pageData.getTextContent( renderOptions )
        .then(function(textContent) {
            let lastY, text = '';
            //https://github.com/mozilla/pdf.js/issues/8963
            //https://github.com/mozilla/pdf.js/issues/2140
            //https://gist.github.com/hubgit/600ec0c224481e910d2a0f883a7b98e3
            //https://gist.github.com/hubgit/600ec0c224481e910d2a0f883a7b98e3
            for (let item of textContent.items) {
                if (lastY === item.transform[5] || !lastY){
                    text += item.str;
                }
                else{
                    text += '\n' + item.str;
                }
                lastY = item.transform[5];
            }
            //let strings = textContent.items.map(item => item.str);
            //let text = strings.join("\n");
            //text = text.replace(/[ ]+/ig," ");
            //ret.text = `${ret.text} ${text} \n\n`;
            return text;
        });
}

const defaultOptions = {
    pageRender: renderPage,
    max: 0,
    //check https://mozilla.github.io/pdf.js/getting_started/
    //version: 'v1.10.100',
    version: 'v4.10.38',
}

const PdfParse = async( dataBuffer, options ) => {
    
    let pdfJsLibrary = null;
    let isDebugMode = false;
    
    let result = {
        numPages: 0,
        numRender: 0,
        info: null,
        metadata: null,
        text: "",
        version: null
    };
    
    if (typeof options === 'undefined') {
        options = defaultOptions;
    }
    
    if (typeof options.pageRender !== 'function') {
        options.pageRender = defaultOptions.pageRender;
    }
    
    if (typeof options.max !== 'number') {
        options.max = defaultOptions.max;
    }
    
    if (typeof options.version !== 'string') {
        options.version = defaultOptions.version;
    }
    
    if (options.version === 'default') {
        options.version = defaultOptions.version;
    }
    
    // Set the version
    pdfJsLibrary = await import(`./pdf.js/${options.version}/build/pdf.js`)
    
    result.version = pdfJsLibrary.version;
    
    // Disable workers to avoid yet another cross-origin issue (workers need
    // the URL of the script to be loaded, and dynamically loading a cross-origin
    // script does not work).
    //pdfJsLibrary.disableWorker = true;
    let doc = await pdfJsLibrary.getDocument( dataBuffer );
    result.numPages = doc.numPages;
    
    let metaData = await doc.getMetadata().catch(function(err) {
        return null;
    });
    
    result.info = metaData ? metaData.info : null;
    result.metadata = metaData ? metaData.metadata : null;
    
    let counter = options.max <= 0 ? doc.numPages : options.max;
    counter = counter > doc.numPages ? doc.numPages : counter;
    
    result.text = "";
    
    for ( let i = 1; i <= counter; i++ ) {
        let pageText = await doc.getPage(i).then(pageData => options.pageRender(pageData)).catch((err)=>{
            // todo log err using debug
            debugger;
            return "";
        });
        
        result.text = `${result.text}\n\n${pageText}`;
    }
    
    result.numRender = counter;
    doc.destroy();
    
    return result;
}

export default PdfParse
