var selectCityIds = [];
var callbackUpdateInitialized = false;

function EndRequest(sender, args) {
    UpdateCountryItemsFont();
}

function UpdateCountryItemsFont() {
    if (!callbackUpdateInitialized) {
        var prm = Sys.WebForms.PageRequestManager.getInstance();
        prm.add_endRequest(EndRequest);
        callbackUpdateInitialized = true;
    }
    for (var i = 0; i < selectCityIds.length; i++) {
        var selectId = selectCityIds[i];
        var selectElement = document.getElementById(selectId);
        for (var j = 0; j < selectElement.options.length; ++j) {
            var option = selectElement.options[j];
            if (option.tagName.toLowerCase() == 'option' && option.value == "") {
                option.className = option.className + ' countryItem';
            }
        }
    }
}
