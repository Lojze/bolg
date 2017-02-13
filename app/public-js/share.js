//配置文件
var config = {
    //获取商品id
    SHARE_GID:getQueryString("gid"),

    //获取商品期数
    SHARE_QISHU:getQueryString("qishu"),

    //初始化列表
    SHARE_PAGEINDEX:1,
    SHARE_share_box:$(".share-box"),
};

(function () {
    $.ajax({
        url: ip + "appfindWinnBill/findListApp",
        data:{
            "pageIndex":config.SHARE_PAGEINDEX,
            "pageSize":4,
            goodsId:config.SHARE_GID
        },
        type:"get",
        success:function (data) {
            var html = "";
            $(data.data).each(function (i,j) {
                config.SHARE_share_box.replaceWith(
                    '<li class="share-list">'+
                    '<a class="share-list-logo" href="javascript:void(0)">'+
                    '<img src="../public-img/geren-logo.png" alt=""></a>'+
                    '<div class="share-mid"><div class="share-mid-top clearfix">'+
                    '<h3><a href="javascript:void(0)">孙大圣</a></h3>'+
                    '<p>08-01 00:08</p></div><div class="share-title">'+
                    '<h3>中了一个苹果6，心情大好</h3>'+
                    '<h4>第1898期）iPhoto 6Plus5.5英寸64G</h4>'+
                    '<p>很赞喔，和想象的一样还想中一个，一元淘宝还是很不错的希望中奖品更好更多，加油！加油···</p>'+
                    '</div><div class="share-img">'+
                    '<a href="javascript:void(0)"><img src="../public-img/sj-1.jpg" alt=""></a>'+
                    <a href="javascript:void(0)"><img src="../public-img/sj-2.jpg" alt=""></a>
                    <a href="javascript:void(0)"><img src="../public-img/sj-3.jpg" alt=""></a>
                    </div>
                    </div>
                    </li>'
                )
            })
        }
    });
})();

