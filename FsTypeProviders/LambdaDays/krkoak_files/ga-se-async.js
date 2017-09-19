// Gule Sider "hack"
regex = new RegExp("^https?://w?w?w?\.?gulesider\.[^/]+/finn:(.*)");
var match = regex.exec(document.referrer); 
if (match != null) {
_gaq.push(['_setReferrerOverride','http://www.gulesider.no?q='+match[1]]);
}
// Search Engines Norway
_gaq.push(
['_addOrganic', 'gulesider.no','q'],
['_addOrganic', 'gulesider.no','search_word'],
['_addOrganic', 'online.no','q'],
['_addOrganic', 'startsiden.no','q'],
['_addOrganic', 'verden.abcsok.no','q'],
['_addOrganic', 'norge.abcsok.no','q'],
['_addOrganic', 'abcsok.no','q'],
['_addOrganic', 'nettkatalogen.no','search'],
['_addOrganic', 'kvass.no','Terms'],
['_addOrganic', '1881.no','query'],
['_addOrganic', '180.no','search_what']
);
// Search Engines Sweden
_gaq.push(
['_addOrganic', 'eniro.se','search_word'],
['_addOrganic', 'seek.se','q'],
['_addOrganic', 'gulex.se','search']
);
// Search Engines Denmark
_gaq.push(
['_addOrganic', 'search.jubii.dk','q'],
['_addOrganic', 'eniro.dk','search_word'],
['_addOrganic', 'soegning.dk','query'],
['_addOrganic', 'gulex.dk','search']
);

// Google Images
_gaq.push(['_addOrganic', 'google', 'q', true, 'google images', '/imgres?']);