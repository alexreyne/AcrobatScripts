var pages = []; // create array for the pages to be pushed into
var searchOne = "ORDERS:"; // string the action will search for, cannot use spaces

// this assumes your files are named LAST FIRST REFRAD.pdf, as mine are.
var fileName = this.documentFileName.replace(/.pdf/,""); // returns "LAST FIRST REFRAD"
console.println("FILE NAME: " + fileName)

var refradString = fileName.lastIndexOf(" "); // returns " REFRAD" (with space)
console.println("REFRAD STRING: " + refradString)

var soldierName = fileName.substring(0, refradString); // returns "LAST FIRST" (no space at end)
console.println("SOLDIER NAME: " + soldierName)


for (var p = 0; p < this.numPages; p++) { // search all the pages
    for (var n = 0; n < this.getPageNumWords(p); n++) { // search every word on the page for string match
        var curWord = this.getPageNthWord(p, n, false).trim();
        if (curWord == searchOne) { 
            pages.push(p); // push the found page into the pages array
            break;
        }
    }
}

if (pages.length > 0) { // actually extract the pages
    var newDoc = app.newDoc(); // create a new document
    for (var n=0; n < pages.length; n++) {
         newDoc.insertPages({
              nPage: newDoc.numPages-1,
              cPath: this.path,
              nStart: pages[n],
              nEnd: pages[n],
         });
    }
    // remove the initial blank page
    newDoc.deletePages(0);
    // Try to save document, print error if occurs
    try {
        newDoc.saveAs({ cPath: "/c/foldername/" + soldierName + " ORDERS.pdf" });
    } catch(e) {
        app.alert("Error During Save: " + e);
    }
 
} else if (pages.length == 0) {
    console.println(soldierName + " has no orders in their file.");
}
