var storage = chrome.storage.local;

storage.get('terms', function(items) {
  // If there is CSS specified, inject it into the page.
  if (items.terms) {

 	var filterTerms = items.terms.split(",");

  	tableRows = document.getElementsByClassName("title"); 
  	table = findParentTable(tableRows[0]);
  	titleElements = document.querySelectorAll(".title a");

  	for (var i = 0; i < titleElements.length; i++) {
  		for (var j=0; j < filterTerms.length; j++){
  			if (titleElements[i].innerHTML.toLowerCase().indexOf(filterTerms[j].toLowerCase()) !== -1){
  				var row = titleElements[i].parentNode.parentNode;
  				row.style.display = "none";
  				next(row).style.display = "none";
  				next(next(row)).style.display = "none";
  			}

  		}
  	}
  } 
});

function findParentTable(tr){
	var ele = tr.parentNode; while( ele.tagName != "TABLE" ){ ele = ele.parentNode; }
	return ele;
}

/* 
   Credit to John Resig for this function 
   taken from Pro JavaScript techniques 
*/
function next(elem) {
    do {
    	elem = elem.nextSibling;
    } while (elem && elem.nodeType != 1);
    return elem;		
}
