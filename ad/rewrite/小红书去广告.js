/*
* 名称: 小红书去广告
* 更新: 2025-01-04 23:15:33
*/


let body = $response.body;
try {
    #!name=小红书去广告
#!desc=过滤信息流推广，移除图片及视频水印，如有异常，请先清除缓存再尝试。
#!author=RuCu6[https://github.com/RuCu6],fmz200[https://github.com/fmz200]
#!icon=https://raw.githubusercontent.com/luestr/IconResource/main/App_icon/120px/RedPaper.png
#!category=iKeLee
#!openUrl=https://apps.apple.com/app/id741292507
#!tag=去广告
#!loon_version=3.2.4(787)
#!homepage=https://github.com/luestr/ProxyResource/blob/main/README.md
#!date=2024-11-28 00:00:00

[Rule]
AND,((PROTOCOL,QUIC),(DOMAIN-SUFFIX,xiaohongshu.com,extended-matching)),REJECT

[Map Local]
^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v1\/surprisebox\/(?:get_style|open|submit_action) data-type=text data="{}" status-code=200

^https:\/\/www\.xiaohongshu\.com\/api\/marketing\/box\/trigger\? data-type=text data="{}" status-code=200

^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/(?:v2\/guide\/user_banner|v3\/note\/guide) data-type=text data="{}" status-code=200

^https:\/\/www\.xiaohongshu\.com\/api\/sns\/(?:v1\/ads\/resource|v2\/hey\/\w+\/hey_gallery) data-type=text data="{}" status-code=200

[Script]
body_rewrite_18 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v1\/search\/banner_list$, script-path=https://raw.githubusercontent.com/Script-Hub-Org/Script-Hub/main/scripts/body-rewrite.js, requires-body=true, max-size=-1, timeout=30, argument=%5B%5B%22json-replace%22%2C%5B%5B%22data%22%2C%7B%7D%5D%5D%5D%5D

body_rewrite_19 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v1\/search\/hot_list$, script-path=https://raw.githubusercontent.com/Script-Hub-Org/Script-Hub/main/scripts/body-rewrite.js, requires-body=true, max-size=-1, timeout=30, argument=%5B%5B%22json-replace%22%2C%5B%5B%22data.items%22%2C%5B%5D%5D%5D%5D%5D

body_rewrite_20 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v4\/search\/hint, script-path=https://raw.githubusercontent.com/Script-Hub-Org/Script-Hub/main/scripts/body-rewrite.js, requires-body=true, max-size=-1, timeout=30, argument=%5B%5B%22json-replace%22%2C%5B%5B%22data.hint_words%22%2C%5B%5D%5D%5D%5D%5D

body_rewrite_21 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v4\/search\/trending\?, script-path=https://raw.githubusercontent.com/Script-Hub-Org/Script-Hub/main/scripts/body-rewrite.js, requires-body=true, max-size=-1, timeout=30, argument=%5B%5B%22json-replace%22%2C%5B%5B%22data.queries%22%2C%5B%5D%5D%2C%5B%22data.hint_word%22%2C%7B%7D%5D%5D%5D%5D

移除图片和实况照片水印 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v1\/note\/(?:imagefeed|live_photo\/save), script-path=https://kelee.one/Resource/Script/RedPaper/RedPaper_remove_ads.js, requires-body=true

移除开屏广告 config = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v1\/system_service\/config\?, script-path=https://kelee.one/Resource/Script/RedPaper/RedPaper_remove_ads.js, requires-body=true

移除开屏广告 splash_config = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v2\/system_service\/splash_config, script-path=https://kelee.one/Resource/Script/RedPaper/RedPaper_remove_ads.js, requires-body=true

移除详情页小部件、关注页感兴趣的人 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v2\/(?:note\/widgets|user\/followings\/followfeed), script-path=https://kelee.one/Resource/Script/RedPaper/RedPaper_remove_ads.js, requires-body=true

移除信息流广告 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v4\/followfeed\?, script-path=https://kelee.one/Resource/Script/RedPaper/RedPaper_remove_ads.js, requires-body=true

移除详情页感兴趣的人 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v5\/recommend\/user\/follow_recommend\?, script-path=https://kelee.one/Resource/Script/RedPaper/RedPaper_remove_ads.js, requires-body=true

移除信息流广告 = type=http-response, pattern=^https:\/\/(?:edith|rec)\.xiaohongshu\.com\/api\/sns\/v6\/homefeed\?, script-path=https://kelee.one/Resource/Script/RedPaper/RedPaper_remove_ads.js, requires-body=true

移除搜索页广告 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v10\/search\/notes\?, script-path=https://kelee.one/Resource/Script/RedPaper/RedPaper_remove_ads.js, requires-body=true

移除图片和视频水印 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/(?:v2\/note\/feed|v3\/note\/videofeed), script-path=https://kelee.one/Resource/Script/RedPaper/RedPaper_remove_ads.js, requires-body=true

移除视频水印 = type=http-response, pattern=^https:\/\/(?:edith|rec|www)\.xiaohongshu\.com\/api\/sns\/(?:v4\/note\/videofeed|v10\/note\/video\/save), script-path=https://kelee.one/Resource/Script/RedPaper/RedPaper_remove_ads.js, requires-body=true

[MITM]
hostname = %APPEND% edith.xiaohongshu.com, rec.xiaohongshu.com, www.xiaohongshu.com


} catch (err) {
    console.log('Error: ' + err);
}
$done({body});
