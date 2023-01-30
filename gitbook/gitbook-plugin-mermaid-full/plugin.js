/**
 * Copyright (C) 2016 yanni4night.com
 * plugin.js
 *
 * changelog
 * 2016-06-04[14:38:58]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */

require(["gitbook", "jquery"], function (gitbook, $) {
    mermaidAPI.initialize({
        startOnLoad: false
    });

    gitbook.events.bind("page.change", function () {
        $('code.lang-graph').each(function (index, element) {
            var $element = $(element);
            var code = $element.text();

            var insertSvg = function (svgCode, bindFunctions) {
                $element.html(svgCode);
            };

            mermaidAPI.render('graphDiv-' + index, code, insertSvg);
        });
    });
});