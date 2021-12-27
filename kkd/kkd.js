"ui";
ui.layout(
<vertical>
     <appbar>
        <toolbar title="快看点脚本 BY yml" />
    </appbar>
    
    <text text="↓↓↓请给与以下权限↓↓↓" size="20sp" bg="#d3d7d4" color="#000000" />   //分割用
    <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="20sp" />
    <Switch id="overlayService" text="悬浮窗权限" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="20sp" />
    
    <text text="👇请输入每条观看时间,建议8000-12000 毫秒(8-12秒)👇" size="15" bg="#d3d7d4" color="#ff0000" />   //分割用
    <input id="yanchi" inputType="number" text="10000" />  
        

    <text text="👇请输看资讯数量👇" size="15" bg="#d3d7d4" color="#ff0000" />   //分割用
    <input id="shuliang" inputType="number" hint="没有建议 看自己" text="" />  

    <frame height="30" gravity="center">
        <text text="请👇点击下方开始" size="11" gravity="center" bg="#d3d7d4" color="#ff0000" />
    </frame>
        <button id="start" text="开始运行快看点-bingo" style="Widget.AppCompat.Button.Colored" textSize="30sp" />
        

    <text text="=============温馨提示=============" size="20sp" color="#000000" />   //提示

    <text text="1. 如果遇到卡住不懂请手动下拉刷新下,对auto.js限制严格!" size="20sp" color="#000000" />  
    <text text="2. 长按音量键可快速关闭脚本!!" size="20sp" color="#000000" />     
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
    
    kkd();
});


function kkd() {
    

    threads.start(function () {
        "auto";
        // toast(shuliang)
        var i = 0;
        var shuliang = ui.shuliang.getText();
        var yanchi = ui.yanchi.getText();  //定义每条 资讯 延迟
        sleep(1000);
        toast("【你设置观看资讯】：" + shuliang + "次")
        
        console.show();      //显示悬浮窗显示日志（需要先打开悬浮窗权限）
        app.launch("com.yuncheapp.android.pearl");       //打开快看点
        sleep(5000);        //等待应用打开  5s
        console.log("准备就绪！");
        toast("ready!");
        //console.log(device.width/2)

        for (var i = 0; i < shuliang; i++) {
            
            if (i%3==0) {
                while (!click("首页"));
                sleep(4000);        //等待 4 秒
                while (!click("首页"));
                sleep(4000);        //等待 4 秒
                id("root").className("android.widget.LinearLayout").desc("TYPE_KEY_NORMAL_IMAGE").findOne().click();   //点击第一条资讯
                sleep(1000);
                toast("阅读成功");
                sleep(yanchi);
                id("back").findOne().click();  //点击左上角返回
                sleep(2000);
                u = i + 1;
                console.log("总任务量：" + shuliang + ";已完成：" + u);

            } else {
                while (!click("首页"));
                sleep(4000);        //等待 4 秒
                id("root").className("android.widget.LinearLayout").desc("TYPE_KEY_NORMAL_IMAGE").findOne().click();   //点击第一条资讯
                sleep(1000);
                toast("阅读成功");
                sleep(yanchi);
                id("back").findOne().click();  //点击左上角返回
                sleep(2000);
                u = i + 1;
                console.log("总任务量：" + shuliang + ";已完成：" + u);
            
            }
        }

    })

}


