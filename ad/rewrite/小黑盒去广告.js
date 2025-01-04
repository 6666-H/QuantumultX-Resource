/*
* 名称: 小黑盒去广告
* 更新: 2025-01-04 23:15:34
*/


let body = $response.body;
try {
    #!name=小黑盒去广告
#!desc=移除开屏广告和热点板块信息流广告
#!author=可莉🅥[https://github.com/luestr/ProxyResource/blob/main/README.md]
#!icon=https://raw.githubusercontent.com/luestr/IconResource/main/App_icon/120px/XiaoHeiHe.png
#!category=iKeLee
#!openUrl=https://apps.apple.com/app/id1244505010
#!tag=去广告
#!loon_version=3.2.4(787)
#!homepage=https://github.com/luestr/ProxyResource/blob/main/README.md
#!date=2024-12-23 11:27:16

[Map Local]
^https:\/\/api\.xiaoheihe\.cn\/account\/get_ads_info_v2 data-type=text data="{}" status-code=200

[Script]
移除热点板块信息流广告 = type=http-response, pattern=^https:\/\/api\.xiaoheihe\.cn\/bbs\/app\/feeds\/news, script-path=https://kelee.one/Resource/Script/XiaoHeiHe/XiaoHeiHe_remove_ads.js, requires-body=true

[MITM]
hostname = %APPEND% api.xiaoheihe.cn


} catch (err) {
    console.log('Error: ' + err);
}
$done({body});
