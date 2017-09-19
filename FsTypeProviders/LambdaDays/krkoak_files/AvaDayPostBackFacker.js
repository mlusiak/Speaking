function AddAvaDayPostbackFackerEvents()
{
    $('#avaday-outbound-result .inputselect,#avaday-outbound-result .fareselect').live('click', function () {
        var postbackfakerId = $('#avaday-outbound-result .postbackfaker').attr('id');
        var hiddenField = $(this).find('input:hidden');
        if (hiddenField) {
            NasCommon.DoPostBack(postbackfakerId, hiddenField.val());
        }
    });

    $('#avaday-inbound-result .inputselect,#avaday-inbound-result .fareselect').live('click', function () {
        var postbackfakerId = $('#avaday-inbound-result .postbackfaker').attr('id');
        var hiddenField = $(this).find('input:hidden');
        if (hiddenField) {
            NasCommon.DoPostBack(postbackfakerId, hiddenField.val());
        }
    });

    $('#avaday-inbound-result .upsellselect').live('click', function () {
        var postbackfakerId = $('#avaday-inbound-result .postbackfaker').attr('id');
        var hiddenField = $(this).find('input:hidden');
        if (hiddenField) {
            NasCommon.DoPostBack(postbackfakerId, hiddenField.val());
        }
    });

    $('#avaday-outbound-result .upsellselect').live('click', function () {
        var postbackfakerId = $('#avaday-outbound-result .postbackfaker').attr('id');
        var hiddenField = $(this).find('input:hidden');
        if (hiddenField) {
            NasCommon.DoPostBack(postbackfakerId, hiddenField.val());
        }
    });

    $('#avaday-outbound-result .prevdaylink').live('click', function() {
        var postbackfakerId = $('#avaday-outbound-result .postbackfaker').attr('id');
        NasCommon.DoPostBack(postbackfakerId, 'prev');
    });
    $('#avaday-outbound-result .nextdaylink').live('click', function() {
        var postbackfakerId = $('#avaday-outbound-result .postbackfaker').attr('id');
        NasCommon.DoPostBack(postbackfakerId, 'next');
    });
    $('#avaday-inbound-result .prevdaylink').live('click', function() {
        var postbackfakerId = $('#avaday-inbound-result .postbackfaker').attr('id');
        NasCommon.DoPostBack(postbackfakerId, 'prev');
    });
    $('#avaday-inbound-result .nextdaylink').live('click', function() {
        var postbackfakerId = $('#avaday-inbound-result .postbackfaker').attr('id');
        NasCommon.DoPostBack(postbackfakerId, 'next');
    });

    //, #avaday-inbound-result .inputselect, #avaday-inbound-result .fareselect
    $('#avaday-outbound-result .showallflights').live('click', function() {
        var postbackfakerId = $('#avaday-outbound-result .postbackfaker').attr('id');
        NasCommon.DoPostBack(postbackfakerId, 'showallflights');
    });
    $('#avaday-inbound-result .showallflights').live('click', function() {
        var postbackfakerId = $('#avaday-inbound-result .postbackfaker').attr('id');
        NasCommon.DoPostBack(postbackfakerId, 'showallflights');
    });


    $('#avaday-outbound-result .prevdaylink, #avaday-inbound-result .prevdaylink, #avaday-outbound-result .nextdaylink, #avaday-inbound-result .nextdaylink').live({
        mouseenter: function() {
            $(this).addClass("navlinkhover");
        },
        mouseleave: function() {
            $(this).removeClass("navlinkhover");
        }
    });

    $('#avaday-outbound-result .showallflights, #avaday-inbound-result .showallflights').live({
        mouseenter: function() {
            $(this).addClass("linkhover");
        },
        mouseleave: function() {
            $(this).removeClass("linkhover");
        }
    });

//    $('#avaday-outbound-result .checkbox-ajax').live('click', function () {
//        var postbackfakerId = $('#avaday-outbound-result .postbackfaker').attr('id');
//        var postbackargument = $(this).attr('value');
//        NasCommon.DoPostBack(postbackfakerId, postbackargument);
//    });
//    $('#avaday-inbound-result .checkbox-ajax').live('click', function () {
//        var postbackfakerId = $('#avaday-inbound-result .postbackfaker').attr('id');
//        var postbackargument = $(this).attr('value');
//        NasCommon.DoPostBack(postbackfakerId, postbackargument);
//    });    


    $('#avaday-outbound-result .plusbundle .headerbox').live('click', function () {
        var checkbox = $('.checkbox-ajax', this);
        var postbackfakerId = $('#avaday-outbound-result .postbackfaker').attr('id');
        var postbackargument = checkbox.attr('value');
        NasCommon.DoPostBack(postbackfakerId, postbackargument);
    });
    $('#avaday-inbound-result .plusbundle .headerbox').live('click', function () {
        var checkbox = $('.checkbox-ajax', this);
        var postbackfakerId = $('#avaday-inbound-result .postbackfaker').attr('id');
        var postbackargument = checkbox.attr('value');
        NasCommon.DoPostBack(postbackfakerId, postbackargument);
    });

    $(".avadaytable .inputselect, .avadaytable .fareselect").live({
        mouseenter: function() {
          if ($(this).hasClass('selectedfare')) {
              return;
          }
          $(this).addClass("hover");
        },
        mouseleave: function() {
          $(this).removeClass("hover");
        }
    });

  $(".avadaytable li.tooltipclick").live({
      mouseenter: function () {
          $(this).addClass("hover");
      },
      mouseleave: function () {
          $(this).removeClass("hover");
      }
  });
       
}
