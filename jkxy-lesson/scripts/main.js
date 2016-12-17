'use strict';

$(function () {

    //菜单导航显示/隐藏
    $('.header-nav li').each(function (index, element) {
        $(element).mouseenter(function () {
            var that = this;
            $(that).children('.submenu').css('display', 'block').animate({
                'opacity': '1'
            }, 600);
        });
        $(element).mouseleave(function () {
            var that = this;
            $(that).children('.submenu').css({ 'display': 'none', 'opacity': '0' });
        });
    });

    //搜索效果
    $('#search-btn').click(function () {
        $('#searchbox').addClass('scale');
    });
    $('#close-btn').click(function () {
        $('#searchbox').removeClass('scale');
    });

    //左侧菜单
    $('.aside-cList>li>div').each(function (index, element) {
        $(element).mouseenter(function () {
            $(element).find('.list-show').show();
        });
        $(element).mouseleave(function () {
            $(element).find('.list-show').hide();
        });
    });

    /***********************************************************************
     * *********************************************************************
     * 老师你好，是这里有两个按钮，点击可以切换课程列表显示的样式，一种是卡片，一种是列表。
     * 如果切换到列表样式，不解绑的话，鼠标划过列表样式，还会触发动画效果
     * **********************************************************************
     * **********************************************************************
     */
    //切换课程展示样式
    $('.kuai-icon').click(function () {
        $(this).addClass('curr').siblings().removeClass('curr');
        $('#lesson_wrap').removeClass('lesson-list2').addClass('lesson-list');
    });
    $('.list-icon').click(function () {
        $(this).addClass('curr').siblings().removeClass('curr');
        $('#lesson_wrap').removeClass('lesson-list').addClass('lesson-list2');
    });

    //课程鼠标滑入动效
    $('.lesson-list li').each(function (index, element) {
        var ele = $(element);
        ele.on('mouseenter', function () {
            ele.children('.lesson-infor').stop().animate({
                'height': '175px'
            }, 300);
            ele.find('p').stop().animate({
                'height': '52px'
            }, 300).css({ 'display': 'block', 'opacity': '1' });
            ele.find('.learn-number, .zhongji').show();
        });

        ele.on('mouseleave', function () {
            ele.children('.lesson-infor').stop().animate({
                'height': '88px'
            }, 600);
            ele.find('p').stop().animate({
                'height': '0'
            }, 600, function () {
                $(this).css({ 'display': 'none', 'opacity': '0' });
            });
            ele.find('.learn-number, .zhongji').hide();
        });
    });

    //解绑课程鼠标滑入动效
    $('.list-icon').click(function () {
        var list2 = $('.lesson-list2 li');
        list2.off();
        list2.find('.lesson-infor, .zhongji, .learn-number, p').attr('style', '');
    });

    //重新绑定课程鼠标滑入动效
    $('.kuai-icon').click(function () {
        $('.lesson-list li').each(function (index, element) {
            var ele = $(element);
            ele.on('mouseenter', function () {
                ele.children('.lesson-infor').stop().animate({
                    'height': '175px'
                }, 300);
                ele.find('p').animate({
                    'height': '52px'
                }, 300).css({ 'display': 'block', 'opacity': '1' });
                ele.find('.learn-number, .zhongji').show();
            });

            ele.on('mouseleave', function () {
                ele.children('.lesson-infor').stop().animate({
                    'height': '88px'
                }, 600);
                ele.find('p').stop().animate({
                    'height': '0'
                }, 600, function () {
                    $(this).css({ 'display': 'none', 'opacity': '0' });
                });
                ele.find('.learn-number, .zhongji').hide();
            });
        });
    });
});