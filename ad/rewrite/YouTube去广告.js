/*
* 名称: YouTube去广告
* 更新: 2025-01-04 23:15:33
*/


let body = $response.body;
try {
    #!name=YouTube去广告(>=iOS15)
#!desc=去首页瀑布流广告/播放页推荐列表广告(非贴片广告)
# 仓库地址 https://github.com/app2smile/rules

[MITM]
hostname = %APPEND% youtubei.googleapis.com

[Script]
youtube-proto = type=http-response,pattern=^https:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/(browse|next),requires-body=1,binary-body-mode=1,max-size=2097152,script-path=https://raw.githubusercontent.com/app2smile/rules/master/js/youtube.js

} catch (err) {
    console.log('Error: ' + err);
}
$done({body});
