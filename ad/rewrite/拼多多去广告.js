/*
* 名称: 拼多多去广告
* 更新: 2025-01-04 23:15:34
*/


let body = $response.body;
try {
    #!name=拼多多去广告
#!desc=移除开屏广告、底栏多多视频、会场入口、聊天页面精选推荐及推广，精简首页和个人中心。
#!author=RuCu6[https://github.com/RuCu6],ZenmoFeiShi[https://github.com/ZenmoFeiShi],可莉🅥[https://github.com/luestr/ProxyResource/blob/main/README.md]
#!icon=https://raw.githubusercontent.com/luestr/IconResource/main/App_icon/120px/PinDuoDuo.png
#!category=iKeLee
#!openUrl=https://apps.apple.com/app/id1044283059
#!tag=去广告
#!loon_version=3.2.4(787)
#!homepage=https://github.com/luestr/ProxyResource/blob/main/README.md
#!date=2024-11-28 00:00:00

[Rule]
AND,((URL-REGEX,"^http:\/\/((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/d",extended-matching),(USER-AGENT,"*com.xunmeng.pinduoduo*")),REJECT
AND,((URL-REGEX,"^http:\/\/\[((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))\]\/d4\?",extended-matching),(USER-AGENT,"*com.xunmeng.pinduoduo*")),REJECT
DOMAIN,titan.pinduoduo.com,REJECT-NO-DROP,extended-matching,pre-matching
DOMAIN,ta-a.pinduoduo.com,REJECT,extended-matching,pre-matching
DOMAIN,ta.pinduoduo.com,REJECT,extended-matching,pre-matching
DOMAIN,th-a.pinduoduo.com,REJECT,extended-matching,pre-matching
DOMAIN,th-b.pinduoduo.com,REJECT,extended-matching,pre-matching
DOMAIN,th.pinduoduo.com,REJECT,extended-matching,pre-matching

[Map Local]
^https:\/\/api\.(?:pinduoduo|yangkeduo)\.com\/api\/cappuccino\/splash\? data-type=text data="{}" status-code=200

^https:\/\/api\.pinduoduo\.com\/api\/alexa\/goods\/back_up\? data-type=text data="{}" status-code=200

^https:\/\/api\.pinduoduo\.com\/api\/aquarius\/hungary\/global\/homepage\? data-type=text data="{}" status-code=200

^https:\/\/api\.pinduoduo\.com\/api\/brand-olay\/goods_detail\/bybt_guide data-type=text data="{}" status-code=200

^https:\/\/api\.pinduoduo\.com\/api\/caterham\/v3\/query\/(?:likes|my_order_group|new_chat_group|order_express_group|personal) data-type=text data="{}" status-code=200

^https:\/\/api\.pinduoduo\.com\/api\/engels\/reviews\/require\/append data-type=text data="{}" status-code=200

^https:\/\/api\.pinduoduo\.com\/api\/flow\/hungary\/window\/global\/v2\? data-type=text data="{}" status-code=200

^https:\/\/api\.pinduoduo\.com\/api\/zaire_biz\/chat\/resource\/get_list_data data-type=text data="{}" status-code=200

^https:\/\/api\.pinduoduo\.com\/search_hotquery\? data-type=text data="{}" status-code=200

[Script]
body_rewrite_28 = type=http-response, pattern=^https:\/\/api\.pinduoduo\.com\/api\/oak\/integration\/render, script-path=https://raw.githubusercontent.com/Script-Hub-Org/Script-Hub/main/scripts/body-rewrite.js, requires-body=true, max-size=-1, timeout=30, argument=%5B%5B%22json-del%22%2C%5B%22bottom_section_list%22%2C%22ui.bottom_section%22%2C%22ui.live_section.float_info%22%5D%5D%5D

body_rewrite_29 = type=http-response, pattern=^https:\/\/api\.pinduoduo\.com\/api\/philo\/personal\/hub\?, script-path=https://raw.githubusercontent.com/Script-Hub-Org/Script-Hub/main/scripts/body-rewrite.js, requires-body=true, max-size=-1, timeout=30, argument=%5B%5B%22json-del%22%2C%5B%22monthly_card_entrance%22%2C%22personal_center_style_v2_vo%22%2C%22icon_set.icons%22%2C%22icon_set.top_personal_icons%22%2C%22title_bar_items%22%5D%5D%5D

body_rewrite_31 = type=http-response, pattern=^https:\/\/api\.pinduoduo\.com\/search, script-path=https://raw.githubusercontent.com/Script-Hub-Org/Script-Hub/main/scripts/body-rewrite.js, requires-body=true, max-size=-1, timeout=30, argument=%5B%5B%22json-del%22%2C%5B%22expansion%22%5D%5D%5D

精简首页 = type=http-response, pattern=^https:\/\/api\.pinduoduo\.com\/api\/alexa\/homepage\/hub\?, script-path=https://kelee.one/Resource/Script/PinDuoDuo/PinDuoDuo_remove_ads.js, requires-body=true

[MITM]
hostname = %APPEND% api.pinduoduo.com, api.yangkeduo.com


} catch (err) {
    console.log('Error: ' + err);
}
$done({body});
