/*
* 名称: 百度网页去广告
* 更新: 2025-01-04 23:15:34
*/


let body = $response.body;
try {
    #!name=百度网页去广告
#!desc=移除百度搜索移动端网页的首页广告信息流
#!author=Keywos[https://github.com/Keywos]
#!icon=https://raw.githubusercontent.com/luestr/IconResource/main/App_icon/120px/Baidu.png
#!category=iKeLee
#!tag=去广告
#!loon_version=3.2.4(787)
#!homepage=https://github.com/luestr/ProxyResource/blob/main/README.md
#!date=2024-11-28 00:00:00

[Script]
移除百度搜索首页信息流广告 = type=http-response, pattern="^https?:\/\/(www|m)\.baidu\.com\/?($|\?from=\w{8,9})", script-path=https://kelee.one/Resource/Script/BaiduSearch/BaiduSearchHomePage_remove_ads.js, requires-body=true

[MITM]
hostname = %APPEND% m.baidu.com, www.baidu.com


} catch (err) {
    console.log('Error: ' + err);
}
$done({body});
