//获取商品id
 var goodsId = getQueryString("gid");

// var goodsId = 44;
var pageIndex = 1,
    pageSize = 4;
$.ajax({
    url:ip + "winn/findOldAnnounced",
    type:"post",
    data:{
        goodsId:goodsId,
        pageIndex:pageIndex,
        pageSize:pageSize
    },
    success:function (data) {
        // console.log(pageIndex);
        //先加载数据
        var announced_ul_box = $(".announced-ul-box");
        announced_ul_box.empty();
        var html = "";
        //单页面存储数据数量
        sessionStorage.setItem("data-old", data.old.length);
        if($(data.old).length<1){
            html='<p style="text-align: center;font-size: 14px">目前没有往期记录哦~</p>'
        }else{
            $(data.old).each(function (i,j) {
                var userPho = j.userPho;
                // console.log(typeof (userPho) == 'string');
                html += '<li class="announced-list">'+
                    '<h3>期号：<em class="announced-num">'+ j.goodsQishu +'</em>（揭晓时间：<em class="announced-time">'+ j.openTime +'</em>)</h3>'+
                    '<div class="announced-list-box clearfix">'+
                    '<a class="list-box-img" href="javascript:void(0)">';
                if(typeof (userPho) == 'string'){
                    html += '<img src="'+ userPho +'" alt="">'
                }else{
                    html += '<img src="../public-img/geren-logo.png" alt="">'
                }
                html +='</a>'+
                    '<div class="list-box-right">'+
                    '<p>用户名：<em class="blue">'+ j.userNickname +'</em></p>'+
                    '<p class="green">（IP：'+ j.userBuyip +'）</p>'+
                    '<p>用户ID：64272991（唯一不变标识）</p>'+
                    '<p>幸运号码：<em class="red">'+ j.winNum +'</em></p>'+
                    '<p>本期参与：<em class="red">'+ j.joinTimes +'</em>人次</p>'+
                    '</div>'+
                    '</div>'+
                    '</li>';
            });
        }
        announced_ul_box.append(html);
    }
});

// 下拉加载
$(window).scroll( function(){
    var scrollTop = 0;
    var clientHeight = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
    } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
    }
    scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    if (scrollTop + clientHeight == scrollHeight) {
        //下拉加载数据
        var pageIndex_num = sessionStorage.getItem("data-old");
        pageIndex = pageIndex +1;
        if(pageIndex != pageIndex_num){
            $.ajax({
                url:ip + "winn/findOldAnnounced",
                type:"post",
                data:{
                    goodsId:goodsId,
                    pageIndex:pageIndex,
                    pageSize:pageSize
                },
                success:function (data) {
                    var html = "";
                    $(data.old).each(function (i, j) {
                            var userPho = j.userPho;
                            // console.log(typeof (userPho) == 'string');
                            html += '<li class="announced-list">' +
                                '<h3>期号：<em class="announced-num">' + j.goodsQishu + '</em>（揭晓时间：<em class="announced-time">' + j.openTime + '</em>)</h3>' +
                                '<div class="announced-list-box clearfix">' +
                                '<a class="list-box-img" href="javascript:void(0)">';
                            if (typeof (userPho) == 'string') {
                                html += '<img src="' + userPho + '" alt="">'
                            } else {
                                html += '<img src="../public-img/geren-logo.png" alt="">'
                            }
                            html += '</a>' +
                                '<div class="list-box-right">' +
                                '<p>用户名：<em class="blue">' + j.userNickname + '</em></p>' +
                                '<p class="green">（IP：' + j.userBuyip + '）</p>' +
                                '<p>用户ID：64272991（唯一不变标识）</p>' +
                                '<p>幸运号码：<em class="red">' + j.winNum + '</em></p>' +
                                '<p>本期参与：<em class="red">' + j.joinTimes + '</em>人次</p>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                        });
                    $(".announced-list:last").after(html);
                }
            });
        }else{
            $(".announced-ul-box").append("<p class='public-earth'>已经没有更多了</p>");
            return false;
        }
    }
});

