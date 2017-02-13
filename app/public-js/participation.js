//获取商品记录
// var gid = getQueryString("gid");
var gid = 26;
//获取商品期数
var qishu = localStorage.getItem("goodQiShu");
//获取用户id/可选填



var pageIndex = 1,
    pageSize = 10;
    // gid = 105;
$.ajax({
    url:ip + "winn/findCurrentJoinListByQsUidGid",
    type:"get",
    data:{
        pageIndex:pageIndex,
        pageSize:pageSize,
        gid:gid,
        qishu:qishu
    },
    success:function (data) {
        // console.log(pageIndex);
        //先加载数据
        var participation_record = $(".participation-record");
        participation_record.empty();
        var html = "";
        //单页面存储数据数量
        sessionStorage.setItem("data-participation", data.list.length);
        $(data.list).each(function (i,j) {
            // console.log(typeof (userPho) == 'string');
            html += '<li class="record-list clearfix">'+
                    '<a class="participation-logo" href="javascript:void (0)">'+
                    '<img src="'+ j.user_pho +'" alt="">'+
                    '</a>'+
                    '<div class="participation-title">'+
                    '<div class="participation-top">'+
                    '<a class="blue" href="javascript:void(0)">'+ j.user_nickname +'</a>('+ j.buycity +'ip:'+ j.buyip +')'+
                    '</div>'+
                    '<div class="participation-bo">'+
                    '参与了<em class="red">'+ j.joinperson +'</em>人次 '+ j.buytime +' '+
                    '</div>'+
                    '</div>'+
                    '</li>';
        });
        participation_record.append(html);
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
        var pageIndex_num = sessionStorage.getItem("data-participation");
        pageIndex = pageIndex +1;
        if(pageIndex != pageIndex_num){
            $.ajax({
                url:ip + "winn/findCurrentJoinListByQsUidGid",
                type:"get",
                data:{
                    pageIndex:pageIndex,
                    pageSize:pageSize,
                    gid:gid,
                    qishu:qishu
                },
                success:function (data) {
                    var html = "";
                    $(data.list).each(function (i,j) {
                        // console.log(typeof (userPho) == 'string');
                        html += '<li class="record-list clearfix">'+
                            '<a class="participation-logo" href="javascript:void (0)">'+
                            '<img src="'+ j.user_pho +'" alt="">'+
                            '</a>'+
                            '<div class="participation-title">'+
                            '<div class="participation-top">'+
                            '<a class="blue" href="javascript:void(0)">'+ j.user_nickname +'</a>('+ j.buycity +'ip:'+ j.buyip +')'+
                            '</div>'+
                            '<div class="participation-bo">'+
                            '参与了<em class="red">'+ j.joinperson +'</em>人次 '+ j.buytime +' '+
                            '</div>'+
                            '</div>'+
                            '</li>';
                    });
                   $(".record-list:last").after(html);
                }
            })
        }else{
            $(".participation_record").append("<p class='public-earth'>已经没有更多了</p>");
            return false;
        }
    }
});