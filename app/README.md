###     公用头部标签
    *   `header-main`
###     公用底部标签
    *   `footer`
    
###     页面详情
    +   index（首页）
        -   index.html(首页)
        -   members.html(会员专区)
        -   local-index.html(本地优选)
    +   personal(个人中心相关页面）
        -   user-index.html（个人信息页面）
        -   personal.html(个人中心)
        -   other-information.html(他的个人中心)
        -   top-up.html(充值)
        -   red-bao.html(抢红包)
        -   (发布商品待定)
        -	my-message.html(我的消息)
        -	payment-records.html(支付记录)
    +   buy-shop(购买商品相关页面)
        -   lottery.html(开奖倒计时详情页)
        -   new-time-list.html(最新揭晓)
        -   buy-shop.html(购物车)
        -   pay-shop(支付订单)
        -   calculate.html(计算详情)
        -   announced.html(已揭晓商品)
        -   share.html(晒单分享)
        -   details.html(奖品详情)
        -   details-selfish.html(奖品详情-私有)
        -	sun-shop.html(发布晒单/收货确认)
        -	sun-shop-user.html(发布晒单-私有)x
        -	announce.hyml(往期揭晓)
        -	my-redBao.html(我的红包) 
        -	shipping-address.html(我的收货地址)
        -   participation.html(本期参与记录)
    +   found(发现)    
        -   found.html(发现)
    +   classify(所有商品)  
        -   classify.html(所有商品)
    
###  缺少
  

    
###     需要优化的地方

*   使用requirejs异步加载js，加载渲染

*   上拉，下拉，加载时的动态效果
    
*   img用法：
        -   列子
        -   <img width="180" height="180" alt="" 
        //占位图片
        src="https://mimg.127.net/p/one/web/lib/img/products/m.png" 
        //获取服务器图片
        data-src="https://onegoods.nosdn.127.net/goods/1928/a11e162fee58529b241a31f922712a4a.jpg" 
        //无响应时加载图片
        onerror="this.src='https://mimg.127.net/p/one/web/lib/img/products/l.png'" />
 
*   缺少公用组件库
    -   公用到达底部：`<p class="public-earth">已经没有更多了</p>`;
    -   (缺)loading动画
    -   (缺)转场动画
    -   公用banner占位图
    -   公用img占位图


*   缺少微信授权登录
*   微信支付(需要授权)

*  支付宝 接收1
*   微信  接收2
*   余额  接收3

###  总需/剩余/参与人次
    +   总需：required = goodsPrice/goodsIsone
        `var required = parseInt(j.goodsPrice/j.goodsIsone);`
    +   剩余：Surplus =（goodsPrice/goodsIsone）-joinTimes
        `var Surplus = parseInt(j.goodsPrice/j.goodsIsone)-j.joinTimes;`
    +   参与人次：participate = （required - Surplus）总需-剩余人次
        `var participate = parseInt(required - Surplus);`