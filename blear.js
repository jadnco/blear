(function($) {
    $.fn.blear = function(options) {
        var self = this,
            content = "",

            settings = $.extend({
                radius:       "15",
                background:   "#ffffff",
                opacity:      "60",
                wrapperClass: ".blear-wrap",
                blurClass:    ".blear"
            }, options),

            hex2rgb = function(hex) {
                hex = hex.substring(1);

                var bigint = parseInt(hex, 16),
                    r = (bigint >> 16) & 255,
                    g = (bigint >> 8) & 255,
                    b = bigint & 255;

                return r+","+g+","+b;
            },

            createElements = function() {
                $("#main-header").after("<div class=\""+settings.wrapperClass.substring(1)+"\"><div class=\""+settings.blurClass.substring(1)+"\"></div></div>");

                $("body > *:not(#"+$(self).attr("id")+", "+settings.wrapperClass+")").each(function(k, v) {
                    content += v.outerHTML;
                });
                $(settings.blurClass).html(content);
            },

            stylize = function() {
                $(self).css({
                    "background": "rgba("+hex2rgb(settings.background)+","+(settings.opacity/100)+")",
                    "overflow":   "hidden"
                });

                $(settings.wrapperClass).css({
                    "width":    "100%",
                    "height":   "90px",
                    "overflow": "hidden",
                    "position": "fixed",
                    "z-index":  "998"
                });

                $(settings.blurClass).css({
                    "position":       "relative",
                    "-webkit-filter": "blur("+settings.radius+"px)",
                    "-moz-filter":    "blur("+settings.radius+"px)",
                    "filter":         "blur("+settings.radius+"px)"
                });
            };

        createElements();
        stylize();

        $(window).on("scroll", function() {
            scrolled = $(window).scrollTop()

            $(settings.blurClass).css({
                "-webkit-transform": "translate3d(0px,"+(-scrolled)+"px,0px)",
                "-moz-transform":    "translate3d(0px,"+(-scrolled)+"px,0px)",
                "transform":         "translate3d(0px,"+(-scrolled)+"px,0px)"
            });

            return false;
        });
    };
}(jQuery));