/*
* 名称: 微博去广告
* 更新: 2025-01-04 23:15:34
*/

#!name=微博去广告
#!desc=过滤微博广告及去除各部分推广模块
#!author=RuCu6[https://github.com/RuCu6],zmqcherish[https://github.com/zmqcherish]
#!icon=https://raw.githubusercontent.com/luestr/IconResource/main/App_icon/120px/Weibo.png
#!category=iKeLee
#!openUrl=https://apps.apple.com/app/id350962117
#!tag=去广告
#!loon_version=3.2.4(787)
#!homepage=https://github.com/luestr/ProxyResource/blob/main/README.md
#!date=2024-12-17 21:27:52

[Rule]
DOMAIN-SUFFIX,uve.weibo.com,DIRECT,extended-matching
DOMAIN,huodong.weibo.cn,REJECT,extended-matching,pre-matching
DOMAIN-SUFFIX,biz.weibo.com,REJECT,extended-matching,pre-matching

[Map Local]
^https:\/\/api\.weibo\.cn\/2\/(?:ug\/checkin\/list|push\/daily) data-type=text data="{}" status-code=200

^https:\/\/api\.weibo\.cn\/2\/!\/live\/media_homelist\? data-type=text data="{}" status-code=200

^https:\/\/api\.weibo\.cn\/2\/comments\/bullet_screens\? data-type=text data="{}" status-code=200

^https:\/\/api\.weibo\.cn\/2\/photo\/info\? data-type=text data="{}" status-code=200

^https:\/\/api\.weibo\.cn\/2\/statuses\/(?:container_positive|push_info) data-type=text data="{}" status-code=200

^https:\/\/api\.weibo\.cn\/2\/vote\/get_vote_detail\? data-type=text data="{}" status-code=200

^https:\/\/api\.weibo\.cn\/2\/!\/chaohua\/discovery\/home_bottom\/switch\? data-type=text data="{}" status-code=200

^https:\/\/api\.weibo\.cn\/2\/!\/huati\/(?:discovery_home_bottom_getdotinfo|mobile_discovery_searchchange) data-type=text data="{}" status-code=200

^https:\/\/api\.weibo\.cn\/2\/!\/wbox\/\w+\/(?:home_bottom_modal|interest_category) data-type=text data="{}" status-code=200

^https:\/\/api\.weibo\.cn\/2\/search\/container_discover\? data-type=text data="{}" status-code=200

^https:\/\/api\.weibo\.cn\/2\/hot\/hours_spotlight\? data-type=text data="{}" status-code=200

^https:\/\/api\.weibo\.cn\/2\/video\/redpacket\? data-type=text data="{}" status-code=200

^https:\/\/api\.weibo\.cn\/!\/(sug\/list\/finderchange|was\/finder\/searchbarchange)\? data-type=text data="{}" status-code=200

^https:\/\/api\.weibo\.cn\/2\/video\/tiny_video_info_show\? data-type=text data="{}" status-code=200

^https:\/\/bootrealtime\.uve\.weibo\.com\/v[23]\/ad\/realtime data-type=text data="{}" status-code=200

^https:\/\/sdkapp\.uve\.weibo\.com\/interface\/sdk\/(?:get-lbs-cell-info\.php|sdkconfig\.php) data-type=text data="{}" status-code=200

^https:\/\/card\.weibo\.com\/article\/m\/aj\/(?:reward|uvead) data-type=text data="{}" status-code=200

^https:\/\/weibo\.com\/ttarticle\/x\/m\/aj\/(?:reward|uvead) data-type=text data="{}" status-code=200

[Script]
移除首页推广 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/(?:checkin\/show|client\/publisher_list|push\/active), script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除首页顶部标签 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/groups\/allgroups\/v2\?, script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除信息流广告 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/(?:cardlist|page), script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除评论区广告 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/comments\/build_comments\?, script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除个人微博详情页广告 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/(?:container\/asyn|flowlist|flowpage), script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除关注、取消关注弹窗 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/friendships\/(?:create|destroy), script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除个人主页广告 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/profile\/(?:container_timeline|dealatt|me|statuses\/tab|userinfo), script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除超话搜索页广告 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/shproxy\/chaohua\/discovery\/searchactive\?, script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除信息流广告 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/statuses\/(?:container_timeline(?:_hot|_topic|_topicpage|_unread)?|repost_timeline|unread_hot_timeline), script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除微博详情页广告 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/statuses\/(?:extend|show), script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除视频流广告 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/video\/(?:full_screen_stream|tiny_stream_video_list)\?, script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除超话顶部标签 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/!\/huati\/discovery_home_bottom_channels\?, script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除消息页列表广告 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/direct_messages\/user_list\?, script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除消息页提醒 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/messageflow\/notice\?, script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除热门微博信息流广告 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/search\/(?:container_timeline|finder), script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除发现页搜索结果广告 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/searchall\?, script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除开屏广告 preload = type=http-response, pattern=^https:\/\/bootpreload\.uve\.weibo\.com\/v[12]\/ad\/preload, script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除开屏广告 sdkad = type=http-response, pattern=^https:\/\/sdkapp\.uve\.weibo\.com\/interface\/sdk\/sdkad\.php, script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

移除开屏广告 wbapplua = type=http-response, pattern=^https:\/\/wbapp\.uve\.weibo\.com\/(?:preload\/get_ad|wbapplua\/wbpullad\.lua), script-path=https://kelee.one/Resource/Script/Weibo/Weibo_remove_ads.js, requires-body=true

[MITM]
hostname = %APPEND% *.weibo.cn, *.weibo.com, weibo.com

