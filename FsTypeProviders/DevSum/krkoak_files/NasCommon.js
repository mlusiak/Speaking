/* NAS COMMON START */
var NasCommon;

if (!NasCommon) NasCommon = {};

NasCommon.GetElement = function (elementId) {
    var element = null;
    if (elementId && typeof elementId == "string") {
        if (document.getElementById) {
            // this is the way the standards work
            element = document.getElementById(elementId);
        }
        else if (document.all) {
            // this is the way old msie versions work
            element = document.all[elementId];
        }
        else if (document.layers) {
            // this is the way nn4 works
            element = document.layers[elementId];
        }
    }

    return element;
};
NasCommon.SetElementClass = function (elementId, elementClassName) {
    var element = NasCommon.GetElement(elementId);
    if (element) {
        element.className = elementClassName;
    }
};
NasCommon.GoToElementValue = function (element) {
    if (element) {
        document.body.style.cursor = "wait";
        element.style.cursor = "wait";
        document.location.href = element.value;

    }
};
NasCommon.ShowHideElement = function (element) {
    if (element) {
        element.style.display = element.style.display == 'block' ? 'none' : 'block';
    }
};
NasCommon.SetInnerHtml = function (elementId, elementValue) {
    var element = NasCommon.GetElement(elementId);
    if (element) {
        element.innerHTML = elementValue;
    }
};
NasCommon.SubmitForm = function (form, action) {
    form.action = action;
    form.submit();
};
NasCommon.DoPostBack = function (clientId, argument) {
    __doPostBack(clientId, argument);
};
NasCommon.ResetScrollPosition = function () {
    setTimeout("window.scrollTo(0,0)", 0);
};
NasCommon.WindowOpen = function (url, width, height) {
    var infoWindow = window.open(url, 'InfoWindow', 'width=' + width + ',height=' + height + ',resizable=1,scrollbars=1,location=0,menubar=0,status=0,toolbar=0');
    infoWindow.focus();
};
NasCommon.ConfirmMessage = function (message) {
    return confirm(message);
};
NasCommon.ElementHasValue = function (element) {
    if (element && element.value != "") {
        return true;
    }
    return false;
};
NasCommon.SetWaitStyle = function () {
    if (!theForm) {
        return;
    }
    theForm.style.cursor = "wait";
};
/*** NAS COMMON END ***/

/*** RESERVATION  ***/

function SetUniqueRadioButton(nameregex, current) {
    var re = new RegExp(nameregex);
    for (var i = 0; i < document.forms[0].elements.length; i++) {
        var elm = document.forms[0].elements[i];
        if (elm.type == 'radio') {
            if (re.test(elm.name)) {
                elm.checked = false;
            }
        }
    }
    current.checked = true;
}

function ShowHideTravelDetails(showHideId, toggleId, imgRootFolder) {
    var showHideElement = NasCommon.GetElement(showHideId);
    if (showHideElement) {
        NasCommon.ShowHideElement(showHideElement);
        var toggleElement = NasCommon.GetElement(toggleId);
        if (toggleElement) {
            var collapseIcon = '<img src="' + imgRootFolder + '/icons/treeview_minus.gif" border="0" alt="[-]" width="9" height="9" />';
            var expandIcon = '<img src="' + imgRootFolder + '/icons/treeview_plus.gif" border="0" alt="[+]" width="9" height="9" />';
            toggleElement.innerHTML = showHideElement.style.display == 'block' ? collapseIcon : expandIcon;
        }
    }
}

function CheckCreditCard(bnCardNumber, ccElement, infoElementId) {
    var infoElement = NasCommon.GetElement(infoElementId);
    if (bnCardNumber != null && ccElement != null && infoElement != null) {

        if (bnCardNumber.length <= ccElement.value.length) {
            if (ccElement.value.indexOf(bnCardNumber) == 0) {
                infoElement.style.display = "block";
            }
            else {
                infoElement.style.display = "none";
            }
        }
        else {
            infoElement.style.display = "none";
        }
    }
}
/*** RESERVATION  END ***/

/*** FARECALENDAR theForm = document.forms['aspnetForm']***/
function FareCal_OnClick(dayElement, mydate, fare, direction) {
    if (!theForm) {
        return false;
    }

    FareCal_Reset(direction);
    /* select calendar day */
    if (dayElement) {
        dayElement.className = dayElement.className + 'Selected';
    }

    if (!theForm.SelectedDate_OutboundFareCalendar) {
        return false;
    }
    if (direction == 'Outbound') {
        theForm.SelectedDate_OutboundFareCalendar.value = mydate;
        theForm.SelectedFare_OutboundFareCalendar.value = fare;
    }

    if (!theForm.SelectedDate_ReturnFareCalendar) {
        return false;
    }


    if (direction == 'Inbound') {
        theForm.SelectedDate_ReturnFareCalendar.value = mydate;
        theForm.SelectedFare_ReturnFareCalendar.value = fare;
    }

}

function FareCal_OnMouseHoover(dayElement, mydate, style, direction) {
    if (!theForm) {
        return false;
    }
    if (!theForm.SelectedDate_OutboundFareCalendar) {
        return false;
    }
    if (direction == 'Outbound' && theForm.SelectedDate_OutboundFareCalendar.value != mydate) {
        dayElement.className = style;
    }
    if (!theForm.SelectedDate_ReturnFareCalendar) {
        return false;
    }
    if (direction == 'Inbound' && theForm.SelectedDate_ReturnFareCalendar.value != mydate) {
        dayElement.className = style;
    }
}

/**
* Resets all elements in the calendar which isn't the currently selected date.
**/
function FareCal_Reset(direction) {
    if (!theForm) {
        return false;
    }
    if (document.getElementsByTagName) {
        var allDivs = document.getElementsByTagName("DIV");
        for (var i = 0; i < allDivs.length; i++) {
            var trgDiv = allDivs[i];
            /* reset calendar day */
            if (trgDiv.id.indexOf(direction) != -1 && trgDiv.className.indexOf('fareCalDay') != -1) {
                var lastIndex;
                if (trgDiv.className.indexOf('MouseOver') != -1) {
                    lastIndex = trgDiv.className.lastIndexOf('MouseOver');
                    trgDiv.className = trgDiv.className.substring(0, lastIndex);
                }

                if (trgDiv.className.indexOf('Selected') != -1) {
                    lastIndex = trgDiv.className.lastIndexOf('Selected');
                    trgDiv.className = trgDiv.className.substring(0, lastIndex);
                }

            }
        }
    }
}


function CheckFareCalSelection(tripType, eOutboundId, eInboundId, errOutbound, errOutboundReturn, errDates) {
    var eOutbound = document.getElementById(eOutboundId);
    if (!eOutbound) {
        return true;
    }

    var outboundDate = eOutbound.value;
    if (tripType == 1) {
        if (outboundDate == "") {
            alert(errOutbound);
            return false;
        }
        return true;
    }
    var eInbound = document.getElementById(eInboundId);
    if (!eInbound) {
        return true;
    }
    var inboundDate = eInbound.value;
    if (outboundDate == "" || inboundDate == "") {
        alert(errOutboundReturn);
        return false;
    }

    var oDay = outboundDate.substr(0, 2);
    var oMonth = outboundDate.substr(2, 6);
    var rDay = inboundDate.substr(0, 2);
    var rMonth = inboundDate.substr(2, 6);
    if (!ValidateDates(oDay, oMonth, rDay, rMonth)) {
        alert(errDates);
        return false;
    }
    return true;
}

function ValidateDates(oday, omonth, rday, rmonth) {
    if ((1 * omonth) < (1 * rmonth)) {
        return true;
    }
    else if ((1 * omonth) == (1 * rmonth) && (oday <= rday)) {
        return true;
    }
    return false;
}
/*** FARECALENDAR END***/

// From/to text change
function ChangeToFrom(toId, fromId) {

    var elementTo = document.getElementById(toId);
    //    var elementFrom = document.getElementById(fromId);

    if (elementTo.style.display == '') {

        document.getElementById(toId).style.display = 'none';
        document.getElementById(fromId).style.display = '';
    }
    else {
        document.getElementById(toId).style.display = '';
        document.getElementById(fromId).style.display = 'none';
    }

    //    if (value == 'Departure')
    //    {
    //        document.getElementById(toId).style.display = 'none';
    //        document.getElementById(fromId).style.display = 'block';
    //    }
    //    else
    //    {
    //        document.getElementById(toId).style.display = 'block';
    //        document.getElementById(fromId).style.display = 'none';
    //    }
}

function setNewCssClassName(sTagName, sFromClassName, sToClassName) {
    document.body.style.cursor = "auto";
    if (document.getElementsByTagName) {
        var arrElements = document.getElementsByTagName(sTagName);
        var oElement;
        for (var i = 0; i < arrElements.length; i++) {
            oElement = arrElements[i];
            if (oElement.className == sFromClassName) {
                oElement.className = sToClassName;
            }
        }
    }
}

/*script powerd by jQuery*/
NasCommon.tooltiphovertable = function () {
    /* CONFIG */
    var xOffset = 30;
    var yOffset = 40;
    var tooltipSelector = ".titletooltip";
    var tooltipElementId = "#titletooltip";
    /* END CONFIG */
    $(tooltipSelector).hover(function (e) {
        this.t = this.title;
        this.title = "";
        if (this.t != "") {
            var splitResult = this.t.split("|");
            var tipHtml = "";
            tipHtml += "<table class='layouttable'>";
            for (var i = 0; i < splitResult.length; i++) {
                var itemResult = splitResult[i];
                if (itemResult.substring(0, 2) == "/b") {
                    itemResult = "<b>" + itemResult.substring(2) + "</b>";
                }
                itemResult = "<tr><td>" + itemResult + "</td></tr>";
                tipHtml += itemResult;
                /*tipHtml += itemResult + "<br />";*/
            }
            tipHtml += "</table>";
            $("body").append("<div id='titletooltip'>" + tipHtml + "</div>");
            $(tooltipElementId)
			.css("top", (e.pageY - xOffset) + "px")
			.css("left", (e.pageX + yOffset) + "px")
			.fadeIn("fast");
        }
    },
	function () {
	    this.title = this.t;
	    $(tooltipElementId).remove();
	});
    $(tooltipSelector).mousemove(function (e) {
        $(tooltipElementId)
			.css("top", (e.pageY - xOffset) + "px")
			.css("left", (e.pageX + yOffset) + "px");
    });
};

//tooltipSelector = element to attach click event to
//tooltipHtmlBoxIdList = array of boxes to show. on click element, set one of this in the class attribute
NasCommon.tooltipclick = function (tooltipSelector, tooltipHtmlBoxIdList) {
    if (!tooltipSelector || !tooltipHtmlBoxIdList) {
        return;
    }
    /* CONFIG */
    var xOffset = 90;
    var yOffset = 30;
    /* END CONFIG */
    $(tooltipSelector).live("click", function (e) {
        var $this = $(this);
        var elementClass = $this.attr('class');
        var tooltipHtmlBoxId = "";
        for (var i = 0; i < tooltipHtmlBoxIdList.length; i++) {
            var currTooltipHtmlBoxId = "#" + tooltipHtmlBoxIdList[i];
            if (elementClass.indexOf(tooltipHtmlBoxIdList[i]) != -1) {
                tooltipHtmlBoxId = currTooltipHtmlBoxId;
            }
            else {
                $(currTooltipHtmlBoxId).hide();
            }
        }
        $(tooltipHtmlBoxId)
   			.css("top", (e.pageY - xOffset) + "px")
			.css("left", (e.pageX + yOffset) + "px")
            .toggle("fast");
        $(tooltipHtmlBoxId).click(function () {
            $(tooltipHtmlBoxId).hide();
        });

    });
};
//tooltipSelector = element to attach click event to
//tooltipHtmlBoxIdList = array of boxes to show. on click element, set one of this in the class attribute
NasCommon.tooltiphover = function (tooltipSelector, tooltipHtmlBoxIdList) {
    if (!tooltipSelector || !tooltipHtmlBoxIdList) {
        return;
    }
    /* CONFIG */
    var xOffset = 90;
    var yOffset = 30;
    /* END CONFIG */
    $(tooltipSelector).hover(function (e) {
        var $this = $(this);
        var elementClass = $this.attr('class');
        var tooltipHtmlBoxId = "";
        for (var i = 0; i < tooltipHtmlBoxIdList.length; i++) {
            var currTooltipHtmlBoxId = "#" + tooltipHtmlBoxIdList[i];
            if (elementClass.indexOf(tooltipHtmlBoxIdList[i]) != -1) {
                tooltipHtmlBoxId = currTooltipHtmlBoxId;
                break;
            }
        }
        $(tooltipHtmlBoxId)
   			.css("top", (e.pageY - xOffset) + "px")
			.css("left", (e.pageX + yOffset) + "px")
            .fadeIn("fast");
    }, function () {
        var $this = $(this);
        var elementClass = $this.attr('class');
        var tooltipHtmlBoxId = "";
        for (var i = 0; i < tooltipHtmlBoxIdList.length; i++) {
            var currTooltipHtmlBoxId = "#" + tooltipHtmlBoxIdList[i];
            if (elementClass.indexOf(tooltipHtmlBoxIdList[i]) != -1) {
                tooltipHtmlBoxId = currTooltipHtmlBoxId;
                break;
            }
        }
        $(tooltipHtmlBoxId).hide();
    }
    );
};

/*script powerd by jQuery end*/
/* Ga functions */
function gaEventLink(link, category, action, label) {
    if (typeof(_gaq) != 'undefined') {
        _gaq.push(['_trackEvent', category, action, label]);
    }
    setTimeout(function () {document.location.href = link.href;}, 100);
}

function gaOpenWindow(link) {
    _gaq.push(function () {
        var tracker = _gaq._getAsyncTracker();
        window.open(tracker._getLinkerUrl(link.href));
    });
    return false;
}

function gaOpenWindowUrl(url) {
    _gaq.push(function () {
        var tracker = _gaq._getAsyncTracker();
        window.open(tracker._getLinkerUrl(url));
    });
    return false;
}

//Javascript Functions called from flash file - Override flash variables- myAction = "Clickthrough"
function djkClickthrough(myCategory, myAction, myLabel, myValue) {
    if(typeof(_gaq) != 'undefined'){
        _gaq.push(["_trackEvent", myCategory, myAction, myLabel, myValue]);
    }
}

/* Ga functions end*/
