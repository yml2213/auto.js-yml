"ui";
ui.layout(
    <vertical>
         <appbar>
            <toolbar title="抖音极速版看视频脚本 BY yml" />
        </appbar>
        
        <text text="↓↓↓请给与以下权限↓↓↓" size="20sp" bg="#d3d7d4" color="#000000" />   //分割用
        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="20sp" />
        <Switch id="overlayService" text="悬浮窗权限" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="20sp" />
        
        <text text="👇设置获取次数运行完停止" size="15" bg="#d3d7d4" color="#ff0000" />   //分割用
        
        <horizontal >
        <input id="shuliang" textSize="20sp" hint="请输入观看视频次数" inputType="number" text=""/>                  
        </horizontal>
      
        <frame height="30" gravity="center">
            <text text="请👇点击下方开始" size="11" gravity="center" bg="#d3d7d4" color="#ff0000" />
        </frame>
        <button id="start" text="开始刷视频-bingo" style="Widget.AppCompat.Button.Colored" textSize="30sp"  />

        
        <text text="=============温馨提示=============" size="20sp" color="#000000" />   //提示

        <text text="1. 长按音量键可快速关闭脚本!!" size="20sp" color="#000000" />   
        <text text="2. 有任何问题可以blog留言或直接加群交流!!" size="20sp" color="#000000" />
        
        
        <horizontal>
        <button id="click_me" marginLeft="60" text="开源地址" style="Widget.AppCompat.Button.Colored" w="auto"/>
        <button id="click_me1" marginLeft="60" text="blog地址" style="Widget.AppCompat.Button.Colored" w="auto" />
            
        </horizontal>
        
    </vertical>
        
    
);
    
ui.click_me.on("click", ()=>{
    app.openUrl("https://github.com/yml2213/auto.js-yml");
    toast("我被点啦");
});

ui.click_me.on("long_click", ()=>{
    toast("不要闹了!");
});
ui.click_me1.on("click", ()=>{
    app.openUrl("https://menglei.xyz/");
    toast("我被点啦");
});

ui.click_me1.on("long_click", ()=>{
    toast("不要闹了!");
});




ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});
//开启悬浮窗权限
ui.overlayService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked) {
        int = app.startActivity({
            packageName: "com.android.settings",
            className: "com.android.settings.Settings$AppDrawOverlaySettingsActivity",
            data: "package:" + auto.service.getPackageName().toString()
        });
        toast("请打开悬浮窗开关");
    }

    if (!checked && auto.service != null) {
        auto.service.disableSelf();
        toast("已关闭悬浮窗权限");
    }
});

ui.start.on("click", function () {
    //程序开始运行之前判断无障碍服务
    if (auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }
    
    ksksp();
});


function ksksp() {
    

    threads.start(function () {
        "auto";
        var i = 0;
        var shuliang = ui.shuliang.getText();
        sleep(1000);
        toast("【设置获取】：" + shuliang + "次")

        // toast(shuliang)
        console.show()      //显示悬浮窗显示日志（需要先打开悬浮窗权限）
        app.launch("com.ss.android.ugc.aweme.lite")       //打开抖音极速版
        sleep(10000)        //等待应用打开
        console.log("准备就绪！")
        toast("ready!")
        //console.log(device.width/2)

        /*核心部分开始*/
        for (var i = 0; i < shuliang; i++) {
            swipe(500,1700,500,180,500);            //向上滑动   下一个视频
            delayTime = random(8000, 12000)         
            sleep(delayTime);                       //每个视频停留时间
            u = i + 1
            console.log("总任务量：" + shuliang + ";已完成：" + u)
            /*随机回看 */
            j = random(1, 30)
            if (j == 1) {
                lookBack()
            }

        }
        /*核心部分结束 */
        /*退出程序 */
        console.hide()
        exits();            //退出js脚本
        home();             //回到首页
        /**--------------- */

        

        /*随机往回滑动 */
        function lookBack() {
            let back = random(1, 20)
            if (back == 1) {
                console.log("开始往回看一个视频");
                swipe(500, 700, 500, 1800, 500, 150);      //往下滑动
                sleep(random(10000, 15000));
                

            }
        }

    })

}