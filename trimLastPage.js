// the below doesn't work on NIPR, works on clearnet for whatever reason
// if (this.numPages>1) this.deletePages(this.numPages-1);

// this one works on NIPR
var pageCount = this.numPages;

if (pageCount > 1) {
    try {
        this.deletePages(pageCount-1);
    } catch(e) {
        app.alert("Error, could not delete: " + e);
    }
}
