(function($){

    $(document).ready(function(){
        $.parallax({speed: .9});

        // Check if the authorinfo text has to be changed back to black/white
        if($(".authorinfo").length > 0 && $("header.image.singlepost").length > 0){
            $(window).scroll(function(){
                if($(document).scrollTop() > $("header.image.singlepost").height() - 30){
                    $("a.openmenu, .authorinfo").removeClass("white");
                }
                else{
                    $("a.openmenu, .authorinfo").addClass("white");
                }
            });
        }

        $("a.openmenu").click(function(e){
            e.preventDefault();
            $("nav.mainmenu, a.openmenu").toggleClass("open");
        });

        $("nav.mainmenu .bt-overlay").click(function(){
            $("nav.mainmenu, a.openmenu").removeClass("open");
        });

        $("a.share").click(function(e){
            e.preventDefault();
            console.log();
            var twitterurl = "https://twitter.com/intent/tweet?original_referer=" + $(this).attr('data-url') + "&text='" + $(".postdetails h1").first().text() + "'&tw_p=tweetbutton&url=" + $(this).attr('data-url') + "&via=dirkgroenen";

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
            }

        });
    });

})(jQuery);