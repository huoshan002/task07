$(function () {
    var windowWidth = $(window).width();
    //初始化瀑布流
    imgLocation(windowWidth);

    //窗口大小改变重新调用
    $(window).resize(function () {
        imgLocation($(this).width());
    });

    //滚动加载
    var dataImg = {"data": [{"src": "1.jpg"}, {"src": "2.jpg"}, {"src": "3.jpg"}, {"src": "4.jpg"}, {"src": "5.jpg"}]};
    window.onscroll = function () {
        if (scroll()) {
            $.each(dataImg.data, function (index, element) {
                var box = $("<div>").addClass("box").appendTo($("#container"));
                var content = $("<div>").addClass("content").appendTo(box);
                $("<img>").attr("src", "./images/" + $(element).attr("src")).appendTo(content);
            });
            var windowWidth = $(window).width();
            imgLocation(windowWidth);
        }
    };
});


//瀑布流函数
function imgLocation(windowWidth) {
    var box = $(".box");
    box.attr("style", "");
    var boxWidth = box.eq(0).outerWidth();
    var num = Math.floor(windowWidth / boxWidth);
    var boxArr = [];

    box.each(function (index, element) {
        var boxHeight = box.eq(index).outerHeight();
        if (index < num) {
            boxArr[index] = boxHeight;
        } else {
            var minboxHeight = Math.min.apply(null, boxArr);
            var minboxIndex = $.inArray(minboxHeight, boxArr);
            $(element).css({
                "position": "absolute",
                "top": minboxHeight,
                "left": box.eq(minboxIndex).position().left
            });
            boxArr[minboxIndex] += box.eq(index).outerHeight();
        }
    })
};

//滚动加载
function scroll() {
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);
    var documentHeight = $(document).width();
    var scrollHeight = $(window).scrollTop();
    return (lastboxHeight < scrollHeight + documentHeight) ? true : false;
}

