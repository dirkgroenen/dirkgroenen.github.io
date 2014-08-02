(function($){

    $(document).ready(function(){
        $.parallax({speed: .9});

        // Check if the goback text has to be changed back to black/white
        if($(".goback").length > 0 && $("header.image.singlepost").length > 0){
            $(window).scroll(function(){
                if($(document).scrollTop() > $("header.image.singlepost").height() - 30){
                    $(".goback .text").css("color", "#343436");
                    $("a.openmenu").removeClass("white");
                }
                else{
                    $(".goback .text").css("color", "#fff");
                    $("a.openmenu").addClass("white");
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
    });

})(jQuery);