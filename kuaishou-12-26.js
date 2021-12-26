"ui";
ui.layout(
<vertical>
     <appbar>
        <toolbar title="快手极速版看视频(yml)" />
    </appbar>
    <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="20sp" />
    <Switch id="overlayService" text="悬浮窗权限" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="20sp" />
    <text text="👇设置获取次数运行完停止" size="15"bg="#d3d7d4"color="#ff0000" />
    <horizontal >
    <text  textSize="20sp"textColor="black" text="请输入观看视频次数"/>
    <input id="cs11" textSize="20sp"inputType="number" text="40"/>                  
    </horizontal>
    <text text="设置每个视频停留时间" size="15"gravity="center"bg="#d3d7d4"color="#ff0000" />
   
    <input id="yanchi" inputType="number" text="5000"/>      
    <text  textSize="20sp"textColor="black" text="科技玩家(yml)"/>           
    


    <frame height="60" gravity="center">
        <text text="请👇点击下方开始" size="11"gravity="center"bg="#d3d7d4"color="#ff0000" />
    </frame>
    <button id="start" text="开始刷视频-bingo"textSize="40sp" />
</vertical>
);

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
        var yanchi = ui.yanchi.getText();
        var cs11 = ui.cs11.getText();
        sleep(1000);
        toast("【设置获取】：" + cs11 + "次")

        // toast(cs11)
        console.show()      //显示悬浮窗显示日志（需要先打开悬浮窗权限）
        app.launch("com.kuaishou.nebula")       //打开快手极速版
        sleep(10000)        //等待应用打开
        console.log("准备就绪！")
        toast("ready!")
        //console.log(device.width/2)

        /*核心部分开始*/
        for (var i = 0; i < cs11; ++i) {
            nextVideo(device.width / 2, device.height * (8 / 9), device.width / 2, device.height * (1 / 4), 150)
            u = i + 1
            console.log("总任务量：" + cs11 + ";已完成：" + u)
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

        function nextVideo(x1, y1, x2, y2, duration) {
            swipe(x1, y1, x2, y2, duration)
            delayTime = random(8000, 12000)
            sleep(delayTime)        //在视频停留8-12秒
        }

        /*随机往回滑动 */
        function lookBack() {
            let back = random(1, 20)
            if (back == 1) {
                console.log("开始往回看一个视频")
                swipe(device.width / 2, device.height * (1 / 4), device.width / 2, device.height * (8 / 9), 150)
                sleep(random(10000, 15000))

            }
        }

        /*向下滑动两个 在向回滑动之后执行 */
        function nextTwo() {
            swipe(device.width / 2, device.height * (8 / 9), device.width / 2, device.height * (1 / 4), 150)
            swipe(device.width / 2, device.height * (8 / 9), device.width / 2, device.height * (1 / 4), 150)
            sleep(random(10000, 15000))
        }

    })

}