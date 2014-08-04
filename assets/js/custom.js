(function($){

    $(document).ready(function(){
        $.parallax({speed: .9});

        // Check if the authorinfo text has to be changed back to black/white
        if($(".authorinfo").length > 0 && $("header.image.singlepost").length > 0){
            $(window).scroll(function(){
                if($(document).scrollTop() > $("header.image.singlepost").height() - 30){
                    $("a.openmenu, .authorinfo:not(.open)").removeClass("white");
                }
                else{
                    $("a.openmenu, .authorinfo").addClass("white");
                }
            });
        }

        if($(".authorinfo").length){
            $(".showcontact").click(function(e){
                e.preventDefault();
                $(".authorinfo, .contactoverlay").addClass("open white"); 
                $("nav.mainmenu, a.openmenu").removeClass("open");
                $("a.openmenu").addClass("closearrow");
                $("header.main .profile").addClass("hidden");
            });
        }

        $("a.openmenu").click(function(e){
            e.preventDefault();
            if($(this).hasClass("closearrow")){
                $(this).removeClass("closearrow");
                $(".authorinfo, .contactoverlay").removeClass("open"); 
                $("header.main .profile").removeClass("hidden");
            }
            else{
                $("nav.mainmenu, a.openmenu").toggleClass("open");
            }
        });

        $("nav.mainmenu .bt-overlay").click(function(){
            $("nav.mainmenu, a.openmenu").removeClass("open");
        });

        $("a.share").click(function(e){
            e.preventDefault();
            console.log();
            var twitterurl = "https://twitter.com/intent/tweet?original_referer=" + $(this).attr('data-url') + "&text='" + $(".postdetails h1").first().text() + "'&tw_p=tweetbutton&url=" + $(this).attr('data-url') + "&via=dirkgroenen";
            var googleurl = "https://plus.google.com/share?url=" + $(this).attr("data-url");

            switch($(this).attr("id")){
                case "twitter":
                    window.open(twitterurl, 'Twitter','width=600,height=400,scrollbars=no,toolbar=no'); 
                    break;
                case "facebook":
                    FB.ui({
                      method: 'share',
                      href: $(this).attr("data-url"),
                    }, function(response){});
                    break;
                case "googleplus":
                    window.open(googleurl, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
                    break;
            }

        });
    });

})(jQuery);