/*
* 名称: surge去广告
* 更新: 2025-01-04 23:15:33
*/

#!name=1.去除常用软件广告
#!desc=仅做整理整合，作者：RuCu6，ZenmoFeiShi，可莉等
#!category=去广告

[General]
#>哔哩哔哩
force-http-engine-hosts = %APPEND% :8000

[Rule]
#>微博
DOMAIN,wbapp.uve.weibo.com,DIRECT,extended-matching,pre-matching
DOMAIN-SUFFIX,biz.weibo.com,REJECT,extended-matching,pre-matching
DOMAIN,dns.weibo.cn,REJECT,extended-matching,pre-matching
IP-CIDR,39.97.130.51/32,REJECT,no-resolve
IP-CIDR,39.97.128.148/32,REJECT,no-resolve
URL-REGEX,^http:\/\/api\.weibo\.cn\/2\/httpdns\/config,REJECT,extended-matching
URL-REGEX,^http:\/\/api\.weibo\.cn\/httpdns\/config,REJECT,extended-matching

#>菜鸟
AND,((URL-REGEX,^http:\/\/.+\/amdc\/mobileDispatch), (USER-AGENT,Cainiao4iPhone*)),REJECT
DOMAIN,adsmind.ugdtimg.com,REJECT,extended-matching,pre-matching
DOMAIN,amdc.m.youku.com,REJECT,extended-matching,pre-matching
DOMAIN,apiv4-iyes.youku.com,REJECT,extended-matching,pre-matching
DOMAIN,httpdns.alicdn.com,REJECT,extended-matching,pre-matching
DOMAIN,huichuan-mc.sm.cn,REJECT,extended-matching,pre-matching
DOMAIN,huichuan.sm.cn,REJECT,extended-matching,pre-matching
DOMAIN,iyes.youku.com,REJECT,extended-matching,pre-matching
DOMAIN,mc.atm.youku.com,REJECT,extended-matching,pre-matching
DOMAIN,vali-g1.cp31.ott.cibntv.net,REJECT,extended-matching,pre-matching
DOMAIN,vali-ugc.cp31.ott.cibntv.net,REJECT,extended-matching,pre-matching
DOMAIN,yk-ssp.ad.youku.com,REJECT,extended-matching,pre-matching
DOMAIN,ykad-data.youku.com,REJECT,extended-matching,pre-matching

#>12306
DOMAIN,ad.12306.cn,DIRECT

#>淘宝
DOMAIN,adashx.m.taobao.com,REJECT,extended-matching,pre-matching
DOMAIN,ossgw.alicdn.com,REJECT,extended-matching,pre-matching
DOMAIN,ems.youku.com,REJECT,extended-matching,pre-matching
DOMAIN,hudong.alicdn.com,REJECT,extended-matching,pre-matching
DOMAIN,h-adashx.ut.taobao.com,REJECT,extended-matching,pre-matching
DOMAIN,ut.taobao.com,REJECT,extended-matching,pre-matching

#>阿里云盘
IP-CIDR,203.107.1.1/24,REJECT,no-resolve

#>拼多多
AND,((URL-REGEX,^http:\/\/.+\/(d|d4)\?), (USER-AGENT,*com.xunmeng.pinduoduo*)),REJECT
DOMAIN,titan.pinduoduo.com,REJECT,extended-matching
DOMAIN,ta-a.pinduoduo.com,REJECT,extended-matching
DOMAIN,ta.pinduoduo.com,REJECT,extended-matching
DOMAIN,th-a.pinduoduo.com,REJECT,extended-matching
DOMAIN,th-b.pinduoduo.com,REJECT,extended-matching
DOMAIN,th.pinduoduo.com,REJECT,extended-matching

#>航旅纵横
URL-REGEX,^http?:\/\/(discardrp|startup)\.umetrip\.com\/gateway\/api\/umetrip\/native,REJECT,extended-matching

#>小红书
AND,((PROTOCOL,QUIC), (OR,((IP-CIDR,101.227.133.99/32,no-resolve), (IP-CIDR,140.207.56.254/32,no-resolve), (IP-CIDR,119.45.2.92/32,no-resolve), (IP-CIDR,47.97.66.48/32,no-resolve), (IP-CIDR,47.97.64.97/32,no-resolve), (IP-CIDR,81.69.116.0/24,no-resolve), (IP-CIDR,114.55.236.88/32,no-resolve), (IP-CIDR,1.13.12.27/32,no-resolve), (IP-CIDR,119.45.249.52/32,no-resolve)))),REJECT
AND,((PROTOCOL,QUIC), (DOMAIN-SUFFIX,xiaohongshu.com,extended-matching)),REJECT

#>高德地图
AND,((URL-REGEX,^http:\/\/.+\/amdc\/mobileDispatch), (USER-AGENT,AMapiPhone*)),REJECT
DOMAIN,amap-aos-info-nogw.amap.com,REJECT,extended-matching,pre-matching
DOMAIN,free-aos-cdn-image.amap.com,REJECT,extended-matching,pre-matching
DOMAIN-SUFFIX,v.smtcdns.com,REJECT,extended-matching,pre-matching

#>滴滴出行
DOMAIN,hd.xiaojukeji.com,REJECT,extended-matching,pre-matching
DOMAIN,gwp.xiaojukeji.com,REJECT,extended-matching,pre-matching
AND,((IP-ASN,45090,no-resolve), (DEST-PORT,25641), (PROTOCOL,TCP)),REJECT
AND,((IP-ASN,63646,no-resolve), (DEST-PORT,25641), (PROTOCOL,TCP)),REJECT

#>彩云天气
DOMAIN,abyss.cyapi.cn,REJECT,extended-matching,pre-matching
DOMAIN,ad.cyapi.cn,REJECT,extended-matching,pre-matching

#>闲鱼
AND,((URL-REGEX,^http:\/\/.+\/amdc\/mobileDispatch), (USER-AGENT,%E9%97%B2%E9%B1%BC*)),REJECT

#>Keep
DOMAIN,hc-ssp.sm.cn,REJECT,extended-matching,pre-matching
DOMAIN,httpdns.n.netease.com,REJECT,extended-matching,pre-matching
DOMAIN,httpdns.calorietech.com,REJECT,extended-matching,pre-matching

#>哔哩哔哩
URL-REGEX,^http:\/\/upos-sz-static\.bilivideo\.com\/ssaxcode\/\w{2}\/\w{2}\/\w{32}-1-SPLASH,REJECT-TINYGIF,extended-matching
URL-REGEX,^http:\/\/[\d\.]+:8000\/v1\/resource\/\w{32}-1-SPLASH,REJECT-TINYGIF,extended-matching

[URL Rewrite]
#>云闪付 //wallet.95516.com
^https:\/\/wallet\.95516\.com(:10533)?\/s\/wl\/icon\/large\/1 - reject

#>闲鱼
^https:\/\/dinamicx\.alibabausercontent\.com\/pub\/fish_home_top_kingkong_new\/ - reject

#>哔哩哔哩
(^https:\/\/(?:www|m)\.bilibili\.com\/video\/(?:BV\w{10}|av\d{9}))(\/?\?.*) $1 302
(^https:\/\/live\.bilibili\.com\/\d+)(\/?\?.*) $1 302

[Body Rewrite]
#>高德地图
http-response-jq ^https:\/\/m5\.amap\.com\/ws\/shield\/search_business\/process\/marketingOperationStructured\? 'delpaths([["data","tipsOperationLocation"]])'
http-response-jq ^https:\/\/m5\.amap\.com\/ws\/shield\/search_business\/process\/marketingOperationStructured\? 'delpaths([["obj","data","resourcePlacement"]])'
http-response-jq ^https:\/\/m5\.amap\.com\/ws\/shield\/search_poi\/homepage\? 'delpaths([["history_tags"]])'
http-response-jq ^https:\/\/m5-zb\.amap\.com\/ws\/sharedtrip\/taxi\/order_detail_car_tips\? 'delpaths([["data","carTips","data","popupInfo"]])'

#>拼多多
http-response-jq ^https:\/\/api\.pinduoduo\.com\/api\/oak\/integration\/render 'delpaths([["bottom_section_list"]])'
http-response-jq ^https:\/\/api\.pinduoduo\.com\/api\/oak\/integration\/render 'delpaths([["ui","bottom_section"]])'
http-response-jq ^https:\/\/api\.pinduoduo\.com\/api\/oak\/integration\/render 'delpaths([["ui","live_section","float_info"]])'
http-response-jq ^https:\/\/api\.pinduoduo\.com\/api\/philo\/personal\/hub\? 'delpaths([["monthly_card_entrance"]])'
http-response-jq ^https:\/\/api\.pinduoduo\.com\/api\/philo\/personal\/hub\? 'delpaths([["personal_center_style_v2_vo"]])'
http-response-jq ^https:\/\/api\.pinduoduo\.com\/api\/philo\/personal\/hub\? 'delpaths([["icon_set","icons"]])'
http-response-jq ^https:\/\/api\.pinduoduo\.com\/api\/philo\/personal\/hub\? 'delpaths([["icon_set","top_personal_icons"]])'
http-response-jq ^https:\/\/api\.pinduoduo\.com\/api\/philo\/personal\/hub\? 'delpaths([["title_bar_items"]])'
http-response-jq ^https:\/\/api\.pinduoduo\.com\/search 'delpaths([["expansion"]])'

#>小红书
http-response-jq ^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v1\/search\/banner_list$ 'if (getpath([]) | has("data")) then (setpath(["data"]; "{}")) else . end'
http-response-jq ^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v1\/search\/hot_list$ 'if (getpath(["data"]) | has("items")) then (setpath(["data","items"]; "[]")) else . end'
http-response-jq ^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v4\/search\/hint 'if (getpath(["data"]) | has("hint_words")) then (setpath(["data","hint_words"]; "[]")) else . end'
http-response-jq ^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v4\/search\/trending\? 'if (getpath(["data"]) | has("queries")) then (setpath(["data","queries"]; "[]")) else . end'
http-response-jq ^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v4\/search\/trending\? 'if (getpath(["data"]) | has("hint_word")) then (setpath(["data","hint_word"]; "{}")) else . end'

#>Keep
http-response-jq ^https:\/\/api\.gotokeep\.com\/twins\/v4\/feed\/followPage 'if (getpath([]) | has("data")) then (setpath(["data"]; "{}")) else . end'
http-response-jq ^https:\/\/api\.gotokeep\.com\/twins\/v4\/feed\/entryDetail 'if (getpath([]) | has("data")) then (setpath(["data"]; "{}")) else . end'

#>哔哩哔哩
http-response-jq ^https:\/\/app\.bilibili\.com\/x\/resource\/show\/skin\? 'delpaths([["data","common_equip"]])'

[Map Local]
#>微博
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
^https:\/\/api\.weibo\.cn\/!\/sug\/list\/finderchange\? data-type=text data="{}" status-code=200
^https:\/\/bootrealtime\.uve\.weibo\.com\/v[23]\/ad\/realtime data-type=text data="{}" status-code=200
^https:\/\/sdkapp\.uve\.weibo\.com\/interface\/sdk\/(?:get-lbs-cell-info\.php|sdkconfig\.php) data-type=text data="{}" status-code=200
^https:\/\/card\.weibo\.com\/article\/m\/aj\/(?:reward|uvead) data-type=text data="{}" status-code=200
^https:\/\/weibo\.com\/ttarticle\/x\/m\/aj\/(?:reward|uvead) data-type=text data="{}" status-code=200

#>菜鸟
^https:\/\/cn-acs\.m\.cainiao\.com\/gw\/mtop\.cainiao\.app\.home\.tabbar\.marketing\.get\.cn data-type=text data="{}" status-code=200
^https:\/\/cn-acs\.m\.cainiao\.com\/gw\/mtop\.cainiao\.adkeyword\.get\.cn data-type=text data="{}" status-code=200
^https:\/\/cn-acs\.m\.cainiao\.com\/gw\/mtop\.cainiao\.cncommunity\.my\.station\.query\.cn data-type=text data="{}" status-code=200
^https:\/\/cn-acs\.m\.cainiao\.com\/gw\/mtop\.cainiao\.guoguo\.nbnetflow\.ads\.(?:batch\.show\.v2|expose\.mreply|index)\.cn data-type=text data="{}" status-code=200
^https:\/\/cn-acs\.m\.cainiao\.com\/gw\/mtop\.cainiao\.nbopen\.miniapp\.recommend\.cpc\.cn data-type=text data="{}" status-code=200
^https:\/\/cn-acs\.m\.cainiao\.com\/gw\/mtop\.cainiao\.nbmensa\.research\.researchservice\.(?:acquire|event|close)\.cn data-type=text data="{}" status-code=200
^https:\/\/cn-acs\.m\.cainiao\.com\/gw\/mtop\.cainiao\.nbpresentation\.(?:homepage\.merge|tabbar\.marketing)\.get\.cn data-type=text data="{}" status-code=200
^https:\/\/cn-acs\.m\.cainiao\.com\/gw\/mtop\.com\.cainiao\.cnactivitycenter data-type=text data="{}" status-code=200
^https:\/\/cn-acs\.m\.cainiao\.com\/gw\/mtop\.com\.cainiao\.cncreditmarket\.hit\.getactivityhit\.cn data-type=text data="{}" status-code=200
^https:\/\/cn-acs\.m\.cainiao\.com\/gw\/mtop\.com\.cainiao\.longquan\.place\.getpageresourcecontent\.cn data-type=text data="{}" status-code=200
^https:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.cainiao\.adx\.flyad\.getad data-type=text data="{}" status-code=200

#>淘宝
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.fliggy\.crm\.screen\.(allresource|predict) data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.alibaba\.advertisementservice\.getadv data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.alimama\.etao\.config\.query\/.+?etao_advertise data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.alimusic\.common\.mobileservice\.startinit data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.etao\.noah\.query\/.+tao_splash data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.film\.mtopadvertiseapi\.queryadvertise data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.o2o\.ad\.gateway\.get data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.taobao\.idle\.home\.welcome data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.trip\.activity\.querytmsresources data-type=text data="{}" status-code=200
^https:\/\/heic\.alicdn\.com\/imgextra\/i\d\/\d*\/?[\w!]+-\d-(octopus|tps-1125-1602|tps-1080-1920)\.(jp|pn)g_(1\d{3}|9\d{2})x(1\d{3}|9\d{2})q[59]0 data-type=text data="{}" status-code=200
^https:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.taobao\.(volvo\.secondfloor\.getconfig|wireless\.home\.newface\.awesome\.get) data-type=text data="{}" status-code=200

#>阿里云盘 //*api.alipan.com, member.alipan.com
^https:\/\/api\.alipan\.com\/adrive\/v1\/file\/getTopFolders data-type=text data="{}" status-code=200
^https:\/\/member\.alipan\.com\/v2\/activity\/sign_in_luckyBottle data-type=text data="{}" status-code=200

#>百度云 //pan.baidu.com
^https:\/\/pan\.baidu\.com\/(?:act\/|aipic\/|aisearch\/|api\/getsyscfg\?|rest\/) data-type=text data="{}" status-code=200

#>交管12123 //gab.122.gov.cn
^https:\/\/gab\.122\.gov\.cn\/eapp\/m\/sysquery\/adver data-type=text data="{}" status-code=200

#>美团 & 美团外卖 //flowplus.meituan.net, img.meituan.net, s3plus.meituan.net
^http:\/\/wmapi\.meituan\.com\/api\/v7\/(?:loadInfo|openscreen|startpicture) data-type=text data="{}" status-code=200
^https:\/\/flowplus\.meituan\.net\/v1\/mss_\w+\/linglong\/\d+\.jpg data-type=text data="{}" status-code=200
^https:\/\/img\.meituan\.net\/bizad\/bizad_brandCpt_\d+\.jpg data-type=text data="{}" status-code=200
^https:\/\/s3plus\.meituan\.net\/ocean-blk-index\/index\/blk_conf_\d+\.json data-type=text data="{}" status-code=200
^https:\/\/s3plus\.meituan\.net\/v1\/mss_\w+\/(?:brandcpt-vedio|waimai-alita)\/\w+\.zip$ data-type=text data="{}" status-code=200

#>网上国网 //osg-service.sgcc.com.cn
^https:\/\/osg-service\.sgcc\.com\.cn:18600\/emss-pfa-appset-front\/bootpageoutter\/ data-type=text data="{}" status-code=200

#>微信 //mp.weixin.qq.com
^https:\/\/mp\.weixin\.qq\.com\/mp\/(?:cps_product_info|getappmsgad|jsmonitor|masonryfeed|relatedarticle) data-type=text data="{}" status-code=200

#>米家 //home.mi.com
^https:\/\/home\.mi\.com\/cgi-op\/api\/v1\/recommendation\/(?:banner|carousel\/banners|myTab|openingBanner) data-type=text data="{}" status-code=200

#>虎扑
^https:\/\/fairy\.mobileapi\.hupu\.com\/gallery\/getmod2 data-type=text data=" " status-code=200
^https:\/\/games\.mobileapi\.hupu\.com\/\d\/\d\.\d\.\d+\/bplapi\/reddot\/v1\/app\/getReddot data-type=text data="{}" status-code=200
^https:\/\/bbs\.mobileapi\.hupu\.com\/\d\/\d\.\d\.\d+\/(bbsallapi\/tag\/v1\/heatTag|bbsrankapi\/v1\/rating\/list) data-type=text data="{}" status-code=200
^https:\/\/games\.mobileapi\.hupu\.com\/\d\/\d\.\d\.\d+\/search\/v2\/(hintkeylist|hotkeylist) data-type=text data="{}" status-code=200
^https:\/\/goblin\.hupu\.com\/\d\/\d\.\d\.\d+\/interfaceAd\/getOther\/v\d data-type=text data="{}" status-code=200
^https:\/\/goblin\.hupu\.com\/\d\/\d\.\d\.\d+\/interfaceAd\/getOther\/batch data-type=text data="{}" status-code=200
^https:\/\/games\.mobileapi\.hupu\.com\/3\/8\.0\.86\/bplcommentapi\/bpl\/score_tab\/groups data-type=text data="{}" status-code=200
^https:\/\/games\.mobileapi\.hupu\.com\/3\/8\.0\.86\/bplapi\/banner\/getLocationBanners data-type=text data="{}" status-code=200

#>拼多多
^https:\/\/api\.(?:pinduoduo|yangkeduo)\.com\/api\/cappuccino\/splash\? data-type=text data="{}" status-code=200
^https:\/\/api\.pinduoduo\.com\/api\/alexa\/goods\/back_up\? data-type=text data="{}" status-code=200
^https:\/\/api\.pinduoduo\.com\/api\/aquarius\/hungary\/global\/homepage\? data-type=text data="{}" status-code=200
^https:\/\/api\.pinduoduo\.com\/api\/brand-olay\/goods_detail\/bybt_guide data-type=text data="{}" status-code=200
^https:\/\/api\.pinduoduo\.com\/api\/caterham\/v3\/query\/(?:likes|my_order_group|new_chat_group|order_express_group|personal) data-type=text data="{}" status-code=200
^https:\/\/api\.pinduoduo\.com\/api\/engels\/reviews\/require\/append data-type=text data="{}" status-code=200
^https:\/\/api\.pinduoduo\.com\/api\/flow\/hungary\/window\/global\/v2\? data-type=text data="{}" status-code=200
^https:\/\/api\.pinduoduo\.com\/api\/zaire_biz\/chat\/resource\/get_list_data data-type=text data="{}" status-code=200
^https:\/\/api\.pinduoduo\.com\/search_hotquery\? data-type=text data="{}" status-code=200

#>小红书
^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v1\/surprisebox\/(?:get_style|open|submit_action) data-type=text data="{}" status-code=200
^https:\/\/www\.xiaohongshu\.com\/api\/marketing\/box\/trigger\? data-type=text data="{}" status-code=200
^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/(?:v2\/guide\/user_banner|v3\/note\/guide) data-type=text data="{}" status-code=200
^https:\/\/www\.xiaohongshu\.com\/api\/sns\/(?:v1\/ads\/resource|v2\/hey\/\w+\/hey_gallery) data-type=text data="{}" status-code=200

#>高德地图
^https:\/\/m5\.amap\.com\/ws\/aos\/main\/page\/product\/list\? data-type=text data="{}" status-code=200
^https:\/\/m5\.amap\.com\/ws\/shield\/search\/new_hotword\? data-type=text data="{}" status-code=200
^https:\/\/m5\.amap\.com\/ws\/faas\/amap-navigation\/card-service-(car-end|route-plan) data-type=text data="{}" status-code=200
^https:\/\/m5\.amap\.com\/ws\/shield\/search_poi\/tips_adv\? data-type=text data="{}" status-code=200
^https:\/\/oss\.amap\.com\/ws\/banner\/lists\/\? data-type=text data="{}" status-code=200
^https:\/\/m5\.amap\.com\/ws\/faas\/amap-navigation\/(main-page-assets|main-page-location|ridewalk-end-fc) data-type=text data="{}" status-code=200
^https:\/\/m5\.amap\.com\/ws\/(mapapi\/hint_text\/offline_data|message\/notice\/list|shield\/search\/new_hotword) data-type=text data="{}" status-code=200
^https:\/\/m5\.amap\.com\/ws\/shield\/scene\/recommend\? data-type=text data="{}" status-code=200
^https:\/\/m5\.amap\.com\/ws\/valueadded\/weather\/v2\? data-type=text data="{}" status-code=200
^https:\/\/sns\.amap\.com\/ws\/msgbox\/pull_mp\? data-type=text data="{}" status-code=200
^https:\/\/m5-zb\.amap\.com\/ws\/boss\/(order\/car\/king_toolbox_car_bubble|tips\/onscene_visual_optimization) data-type=text data="{}" status-code=200

#>滴滴出行
^https:\/\/res\.xiaojukeji\.com\/resapi\/activity\/xpget data-type=text data="{}" status-code=200
^https:\/\/ct\.xiaojukeji\.com\/agent\/v3\/feeds data-type=text data="{}" status-code=200
# ^https:\/\/daijia\.kuaidadi\.com\/gateway data-type=text data="{}" status-code=200 
^https:\/\/freight\.xiaojukeji\.com\/gateway data-type=text data="{}" status-code=200
^https:\/\/res\.xiaojukeji\.com\/resapi\/activity\/mget data-type=text data="{}" status-code=200
^https:\/\/conf\.diditaxi\.com\.cn\/homepage\/v\d\/other\/fast data-type=text data="{}" status-code=200
^https:\/\/conf\.diditaxi\.com\.cn\/dynamic\/conf data-type=text data="{}" status-code=200

#>彩云天气
^https:\/\/biz\.cyapi\.cn\/(p\/v1\/entries|p\/v1\/trial_card\/info|v2\/product) data-type=text data="{}" status-code=200
^https:\/\/starplucker\.cyapi\.cn\/v3\/(config\/cypage\/\w+\/conditions|notification\/message_center|operation\/homefeatures) data-type=text data="{}" status-code=200

#>闲鱼
^https:\/\/acs\.m\.goofish\.com\/gw\/mtop\.taobao\.idle\.home\.whale\.modulet\/ data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.goofish\.com\/gw\/mtop\.taobao\.idle\.item\.recommend\.list\/ data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.goofish\.com\/gw\/mtop\.taobao\.idle\.item\.resell\.recommendorhotcate\/ data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.goofish\.com\/gw\/mtop\.taobao\.idle\.playboy\.recommend\/ data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.goofish\.com\/gw\/mtop\.taobao\.idle\.topic\.banner\/ data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.goofish\.com\/gw\/mtop\.taobao\.idle\.user\.strategy\.list\/ data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.goofish\.com\/gw\/mtop\.taobao\.idlehome\.idle\.coin\.nextfresh\/ data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.goofish\.com\/gw\/mtop\.taobao\.idlemtopsearch\.search\.discover\/ data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.goofish\.com\/gw\/mtop\.taobao\.idlemtopsearch\.search\.shade\/ data-type=text data="{}" status-code=200
^https:\/\/acs\.m\.goofish\.com\/gw\/mtop\.taobao\.idlemtopsearch\.item\.search\.activate\/ data-type=text data="{}" status-code=200
^https:\/\/h5\.m\.goofish\.com\/wow\/moyu\/moyu-project\/[\w-]*search[\w-]*\/pages\/ data-type=text data=" " status-code=200

#>Keep
^https:\/\/api\.gotokeep\.com\/search\/v6\/default\/keyword\/list data-type=text data="{}" status-code=200
^https:\/\/kad\.gotokeep\.com\/op-engine-webapp\/v1\/ad data-type=text data="{}" status-code=200
^https:\/\/api\.gotokeep\.com\/guide-webapp\/v1\/popup\/getPopUp data-type=text data="{}" status-code=200

#>哔哩哔哩
^https:\/\/(?:api\.bilibili\.com\/x\/mengqi\/v1\/resource|app\.bilibili\.com\/x\/resource\/peak\/download) data-type=text data="{}" status-code=200
^https:\/\/api\.bilibili\.com\/x\/v2\/dm\/qoe\/show\? data-type=text data="{}" status-code=200
^https:\/\/api\.bilibili\.com\/x\/vip\/ads\/materials\? data-type=text data="{}" status-code=200
^https:\/\/api\.live\.bilibili\.com\/xlive\/e-commerce-interface\/v1\/ecommerce-user\/get_shopping_info\? data-type=text data="{}" status-code=200
^https:\/\/(?:app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.interface\.v1\.Search\/DefaultWords data-type=text data="{}" status-code=200
^https:\/\/(?:app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.view\.v1\.View\/TFInfo data-type=text data="{}" status-code=200
^https:\/\/app\.bilibili\.com\/x\/resource\/ip data-type=text data="{}" status-code=200
^https:\/\/api\.bilibili\.com\/x\/web-interface\/zone\?jsonp data-type=text data="{}" status-code=200
^https:\/\/app\.bilibili\.com\/x\/resource\/top\/activity\? data-type=json data="{ "code": -404, "message": "啥都木有", "ttl": 1, "data": null }" status-code=200

[Script]
#>微博 //*.weibo.cn, *.weibo.com, weibo.com
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/(?:checkin\/show|client\/publisher_list|push\/active), script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/groups\/allgroups\/v2\?, script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/(?:cardlist|page), script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/comments\/build_comments\?, script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/(?:container\/asyn|flowlist|flowpage), script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/friendships\/(?:create|destroy), script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/profile\/(?:container_timeline|dealatt|me|statuses\/tab|userinfo), script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/shproxy\/chaohua\/discovery\/searchactive\?, script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/statuses\/(?:container_timeline(?:_hot|_topic|_topicpage|_unread)?|repost_timeline|unread_hot_timeline), script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/statuses\/(?:extend|show), script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/video\/tiny_stream_video_list\?, script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/!\/huati\/discovery_home_bottom_channels\?, script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/direct_messages\/user_list\?, script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/messageflow\/notice\?, script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/search\/(?:container_timeline|finder), script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/api\.weibo\.cn\/2\/searchall\?, script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/bootpreload\.uve\.weibo\.com\/v[12]\/ad\/preload, script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/sdkapp\.uve\.weibo\.com\/interface\/sdk\/sdkad\.php, script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true
微博 = type=http-response, pattern=^https:\/\/wbapp\.uve\.weibo\.com\/(?:preload\/get_ad|wbapplua\/wbpullad\.lua), script-path=https://raw.ananaskop.com/Scripts/Weibo.js, requires-body=true

#>菜鸟
菜鸟 = type=http-response, pattern=^https:\/\/cn-acs\.m\.cainiao\.com\/gw\/mtop\.cainiao\.app\.mine\.main\.cn, script-path=https://raw.ananaskop.com/Scripts/Cainiao.js, requires-body=true
菜鸟 = type=http-response, pattern=^https:\/\/cn-acs\.m\.cainiao\.com\/gw\/mtop\.cainiao\.guoguo\.nbnetflow\.ads\.m?show\.cn, script-path=https://raw.ananaskop.com/Scripts/Cainiao.js, requires-body=true
菜鸟 = type=http-response, pattern=^https:\/\/cn-acs\.m\.cainiao\.com\/gw\/mtop\.cainiao\.nbpresentation\.(?:pickup\.empty\.page|protocol\.homepage)\.get\.cn, script-path=https://raw.ananaskop.com/Scripts/Cainiao.js, requires-body=true
菜鸟 = type=http-response, pattern=^https:\/\/cn-acs\.m\.cainiao\.com\/gw\/mtop\.nbfriend\.message\.conversation\.list\.cn, script-path=https://raw.ananaskop.com/Scripts/Cainiao.js, requires-body=true
菜鸟 = type=http-response, pattern=^https:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.cainiao\.guoguo\.nbnetflow\.ads\.mshow, script-path=https://raw.ananaskop.com/Scripts/Cainiao.js, requires-body=true

#>淘宝 //acs.m.taobao.com,heic.alicdn.com,guide-acs.m.taobao.com,poplayer.template.alibaba.com
淘宝 = type=http-response, pattern=^https:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.taobao\.(cloudvideo\.video\.query|wireless\.home\.splash\.awesome\.get), script-path=https://raw.ananaskop.com/Scripts/Taobao.js, requires-body=true
淘宝 = type=http-response, pattern=^https:\/\/poplayer\.template\.alibaba\.com\/\w+\.json, script-path=https://raw.ananaskop.com/Scripts/Taobao.js, requires-body=true

#>12306 //ad.12306.cn, mobile.12306.cn
12306 = type=http-request, pattern=^https:\/\/ad\.12306\.cn\/ad\/ser\/getAdList$, script-path=https://raw.ananaskop.com/Scripts/12306_splashscreen.js, requires-body=true
12306 = type=http-response, pattern=^https:\/\/mobile\.12306\.cn\/otsmobile\/app\/mgs\/mgw\.htm$, script-path=https://raw.ananaskop.com/Scripts/12306.js

#>阿里云盘 //*api.alipan.com, member.alipan.com
阿里云盘 = type=http-response, pattern=^https:\/\/(biz)?api\.alipan\.com\/apps\/v\d\/users?\/home\/(?:news|widgets), script-path=https://raw.ananaskop.com/Scripts/Adrive.js, requires-body=true
阿里云盘 = type=http-response, pattern=^https:\/\/member\.alipan\.com\/v1\/users\/onboard_list, script-path=https://raw.ananaskop.com/Scripts/Adrive.js, requires-body=true

#>虎扑 //*.hupu.com
虎扑 = type=http-response, pattern=^https:\/\/fairy\.mobileapi\.hupu\.com\/mang\/preview\/banners, script-path=https://raw.ananaskop.com/Scripts/Hupu.js, requires-body=true
虎扑 = type=http-response, pattern=^https:\/\/bbs\.mobileapi\.hupu\.com\/\d\/\d\.\d\.\d+\/bbsallapi\/lego\/data, script-path=https://raw.ananaskop.com/Scripts/Hupu.js, requires-body=true
虎扑 = type=http-response, pattern=^https:\/\/games\.mobileapi\.hupu\.com\/\d\/\d\.\d\.\d+\/buffer\/hotList, script-path=https://raw.ananaskop.com/Scripts/Hupu.js, requires-body=true
虎扑 = type=http-response, pattern=^https:\/\/games\.mobileapi\.hupu\.com\/\d\/\d\.\d\.\d+\/bplapi\/user\/v1\/more, script-path=https://raw.ananaskop.com/Scripts/Hupu.js, requires-body=true

#>拼多多 //api.pinduoduo.com, api.yangkeduo.com
拼多多 = type=http-response, pattern=^https:\/\/api\.pinduoduo\.com\/api\/alexa\/homepage\/hub\?, script-path=https://raw.ananaskop.com/Scripts/Pinduoduo.js, requires-body=true

#>航旅纵横 //114.115.217.129, home.umetrip.com
航旅纵横 = type=http-response, pattern=^http?:\/\/(114\.115\.217\.129)|(home\.umetrip\.com)\/gateway\/api\/umetrip\/native$, script-path=https://raw.ananaskop.com/Scripts/Umetrip.js, requires-body=true

#>小红书 //edith.xiaohongshu.com, www.xiaohongshu.com, rec.xiaohongshu.com
小红书 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v1\/note\/(?:imagefeed|live_photo\/save), script-path=https://raw.ananaskop.com/Scripts/Xiaohongshu.js, requires-body=true
小红书 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v1\/system_service\/config\?, script-path=https://raw.ananaskop.com/Scripts/Xiaohongshu.js, requires-body=true
小红书 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v2\/system_service\/splash_config, script-path=https://raw.ananaskop.com/Scripts/Xiaohongshu.js, requires-body=true
小红书 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v2\/(?:note\/widgets|user\/followings\/followfeed), script-path=https://raw.ananaskop.com/Scripts/Xiaohongshu.js, requires-body=true
小红书 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v4\/followfeed\?, script-path=https://raw.ananaskop.com/Scripts/Xiaohongshu.js, requires-body=true
小红书 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v5\/recommend\/user\/follow_recommend\?, script-path=https://raw.ananaskop.com/Scripts/Xiaohongshu.js, requires-body=true
小红书 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v6\/homefeed\?, script-path=https://raw.ananaskop.com/Scripts/Xiaohongshu.js, requires-body=true
小红书 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v10\/search\/notes\?, script-path=https://raw.ananaskop.com/Scripts/Xiaohongshu.js, requires-body=true
小红书 = type=http-response, pattern=^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/(?:v2\/note\/feed|v3\/note\/videofeed), script-path=https://raw.ananaskop.com/Scripts/Xiaohongshu.js, requires-body=true
小红书 = type=http-response, pattern=^https:\/\/(?:edith|rec|www)\.xiaohongshu\.com\/api\/sns\/(?:v4\/note\/videofeed|v10\/note\/video\/save), script-path=https://raw.ananaskop.com/Scripts/Xiaohongshu.js, requires-body=true

#>高德地图 //m5.amap.com, m5-zb.amap.com, oss.amap.com, sns.amap.com
高德地图 = type=http-response, pattern=^https:\/\/m5\.amap\.com\/ws\/aos\/perception\/publicTravel\/beforeNavi\?, script-path=https://raw.ananaskop.com/Scripts/Amap.js, requires-body=true
高德地图 = type=http-response, pattern=^https:\/\/m5\.amap\.com\/ws\/bus\/plan\/integrate\?, script-path=https://raw.ananaskop.com/Scripts/Amap.js, requires-body=true
高德地图 = type=http-response, pattern=^https:\/\/m5\.amap\.com\/ws\/c3frontend\/af-(hotel|launch)\/page\/main\?, script-path=https://raw.ananaskop.com/Scripts/Amap.js, requires-body=true
高德地图 = type=http-response, pattern=^https:\/\/m5\.amap\.com\/ws\/perception\/drive\/(routeInfo|routePlan), script-path=https://raw.ananaskop.com/Scripts/Amap.js, requires-body=true
高德地图 = type=http-response, pattern=^https:\/\/m5\.amap\.com\/ws\/shield\/search\/(common\/coupon\/info|poi\/detail), script-path=https://raw.ananaskop.com/Scripts/Amap.js, requires-body=true
高德地图 = type=http-response, pattern=^https:\/\/m5\.amap\.com\/ws\/shield\/search_bff\/hotword\?, script-path=https://raw.ananaskop.com/Scripts/Amap.js, requires-body=true
高德地图 = type=http-response, pattern=^https:\/\/m5\.amap\.com\/ws\/shield\/search_poi\/(?:mps|search\/sp|sug|tips_operation_location), script-path=https://raw.ananaskop.com/Scripts/Amap.js, requires-body=true
高德地图 = type=http-response, pattern=^https:\/\/m5\.amap\.com\/ws\/faas\/amap-navigation\/(card-service-plan-home|main-page), script-path=https://raw.ananaskop.com/Scripts/Amap.js, requires-body=true
高德地图 = type=http-response, pattern=^https:\/\/m5\.amap\.com\/ws\/shield\/frogserver\/aocs\/updatable\/1\?, script-path=https://raw.ananaskop.com/Scripts/Amap.js, requires-body=true
高德地图 = type=http-response, pattern=^https:\/\/m5\.amap\.com\/ws\/shield\/dsp\/profile\/index\/nodefaasv3\?, script-path=https://raw.ananaskop.com/Scripts/Amap.js, requires-body=true
高德地图 = type=http-response, pattern=^https:\/\/m5\.amap\.com\/ws\/shield\/search\/nearbyrec_smart\?, script-path=https://raw.ananaskop.com/Scripts/Amap.js, requires-body=true
高德地图 = type=http-response, pattern=^https:\/\/m5\.amap\.com\/ws\/valueadded\/alimama\/splash_screen\?, script-path=https://raw.ananaskop.com/Scripts/Amap.js, requires-body=true
高德地图 = type=http-response, pattern=^https:\/\/m5-zb\.amap\.com\/ws\/boss\/(car\/order\/content_info|order_web\/friendly_information), script-path=https://raw.ananaskop.com/Scripts/Amap.js, requires-body=true
高德地图 = type=http-response, pattern=^https:\/\/m5-zb\.amap\.com\/ws\/promotion-web\/resource(\/home)?\?, script-path=https://raw.ananaskop.com/Scripts/Amap.js, requires-body=true

#>滴滴出行 //common.diditaxi.com.cn, freight.xiaojukeji.com, daijia.kuaidadi.com, ct.xiaojukeji.com, res.xiaojukeji.com, conf.diditaxi.com.cn, api.udache.com, 123.207.209.*, 112.53.55.225, 120.241.142.*, 120.241.143.*, 116.85.2.*, 116.85.3.*, 139.199.240.84
滴滴出行 = type=http-response, pattern=^https:\/\/common\.diditaxi\.com\.cn\/common\/v\d\/usercenter\/me, script-path=https://raw.ananaskop.com/Scripts/Didi.js, requires-body=true
滴滴出行 = type=http-response, pattern=^https:\/\/conf\.diditaxi\.com\.cn\/homepage\/v\d\/core, script-path=https://raw.ananaskop.com/Scripts/Didi.js, requires-body=true
滴滴出行 = type=http-response, pattern=^https:\/\/api\.udache\.com\/gulfstream\/pre-sale\/v1\/other\/pGetSceneList, script-path=https://raw.ananaskop.com/Scripts/Didi.js, requires-body=true
滴滴出行 = type=http-response, pattern=^https:\/\/conf\.diditaxi\.com\.cn\/ota\/na\/yuantu\/infoList, script-path=https://raw.ananaskop.com/Scripts/Didi.js, requires-body=true
滴滴出行 = type=http-response, pattern=^https:\/\/api\.udache\.com\/gulfstream\/passenger-center\/v2\/other\/pInTripLayout, script-path=https://raw.ananaskop.com/Scripts/Didi.js, requires-body=true

#>彩云天气 //api.caiyunapp.com, *.cyapi.cn
彩云天气 = type=http-response, pattern=^https:\/\/api\.caiyunapp\.com\/v1\/activity\?, script-path=https://raw.ananaskop.com/Scripts/Caiyun.js, requires-body=true
彩云天气 = type=http-response, pattern=^https:\/\/biz\.cyapi\.cn\/(api\/v1\/user_detail|p\/v1\/vip_info|v2\/user), script-path=https://raw.ananaskop.com/Scripts/Caiyun.js, requires-body=true
彩云天气 = type=http-response, pattern=^https:\/\/wrapper\.cyapi\.cn\/v1\/activity\?, script-path=https://raw.ananaskop.com/Scripts/Caiyun.js, requires-body=true
彩云天气 = type=http-request, pattern=^https:\/\/wrapper\.cyapi\.cn\/v1\/(nafp\/origin_images|satellite)\?, script-path=https://raw.ananaskop.com/Scripts/Caiyun.js, timeout=60

#>闲鱼 //*.m.goofish.com
闲鱼 = type=http-response, pattern=^https:\/\/acs\.m\.goofish\.com\/gw\/mtop\.idle\.user\.page\.my\.adapter\/, script-path=https://raw.ananaskop.com/Scripts/Xianyu.js, requires-body=true
闲鱼 = type=http-response, pattern=^https:\/\/acs\.m\.goofish\.com\/gw\/mtop\.taobao\.idlehome\.home\.nextfresh\/, script-path=https://raw.ananaskop.com/Scripts/Xianyu.js, requires-body=true
闲鱼 = type=http-response, pattern=^https:\/\/acs\.m\.goofish\.com\/gw\/mtop\.taobao\.idlehome\.home\.circle\.list\/, script-path=https://raw.ananaskop.com/Scripts/Xianyu.js, requires-body=true
闲鱼 = type=http-response, pattern=^https:\/\/g-acs\.m\.goofish\.com\/gw\/mtop\.taobao\.idlemtopsearch\.search\/, script-path=https://raw.ananaskop.com/Scripts/Xianyu.js, requires-body=true

#>百度跳转 //m.baidu.com, www.baidu.com, zhidao.baidu.com
百度跳转 = type=http-response, pattern=^https:\/\/(?:www|m)\.baidu\.com(\/|\/\?(tn=&)?from=\d+\w)?$, script-path=https://raw.ananaskop.com/Scripts/Baidu_index.js, requires-body=true

#>微信链接限制解除  //weixin110.qq.com, security.wechat.com
微信链接限制解除 = type=http-response,pattern=^https\:\/\/(weixin110\.qq|security.wechat)\.com\/cgi-bin\/mmspamsupport-bin\/newredirectconfirmcgi\?, script-path=https://raw.ananaskop.com/Scripts/UnblockURLinWeChat.js, requires-body=true

#>Keep //kad.gotokeep.com, 42.187.199.248, api.gotokeep.com
Keep = type=http-response, pattern=^https:\/\/api\.gotokeep\.com\/config\/v3\/basic, script-path=https://raw.ananaskop.com/Scripts/Keep.js, requires-body=true

#>哔哩哔哩 //app.bilibili.com, api.bilibili.com, api.live.bilibili.com, grpc.biliapi.net, www.bilibili.com, m.bilibili.com, live.bilibili.com
哔哩哔哩 = type=http-response, pattern=^https:\/\/(grpc\.biliapi\.net|app\.bilibili\.com)\/bilibili\.app\.(view|viewunite)\.v1\.View\/(View|ViewProgress)$, script-path=https://raw.ananaskop.com/Scripts/Bilibili_helper_beta.js, requires-body=true, binary-body-mode=true
哔哩哔哩 = type=http-response, pattern=^https:\/\/(grpc\.biliapi\.net|app\.bilibili\.com)\/bilibili\.polymer\.app\.search\.v1\.Search\/SearchAll$, script-path=https://raw.ananaskop.com/Scripts/Bilibili_helper_beta.js, requires-body=true, binary-body-mode=true
哔哩哔哩 = type=http-response, pattern=^https:\/\/grpc\.biliapi\.net\/bilibili\.main\.community\.reply\.v1\.Reply\/MainList, script-path=https://raw.ananaskop.com/Scripts/Bilibili_helper_beta.js, requires-body=true, binary-body-mode=true
哔哩哔哩 = type=http-response, pattern=^https:\/\/(grpc\.biliapi\.net|app\.bilibili\.com)\/bilibili\.app\.dynamic\.v2\.Dynamic\/DynAll$, script-path=https://raw.ananaskop.com/Scripts/Bilibili_helper_beta.js, requires-body=true, binary-body-mode=true
哔哩哔哩 = type=http-response, pattern=^https:\/\/grpc\.biliapi\.net\/bilibili\.community\.service\.dm\.v1\.DM\/DmSegMobile, script-path=https://raw.ananaskop.com/Scripts/Bilibili_helper_beta.js, requires-body=true, binary-body-mode=true
哔哩哔哩 = type=http-response, pattern=^https:\/\/grpc\.biliapi\.net\/bilibili\.community\.service\.dm\.v1\.DM\/DmView, script-path=https://raw.ananaskop.com/Scripts/Bilibili_helper_beta.js, requires-body=true, binary-body-mode=true
哔哩哔哩 = type=http-response, pattern=^https:\/\/grpc\.biliapi\.net\/bilibili\.app\.interface\.v1\.Teenagers\/ModeStatus, script-path=https://raw.ananaskop.com/Scripts/Bilibili_helper_beta.js, requires-body=true, binary-body-mode=true
哔哩哔哩 = type=http-response, pattern=^https:\/\/app\.bilibili\.com\/x\/v2\/splash\/(brand\/list|event\/list2|list|show)\?, script-path=https://raw.ananaskop.com/Scripts/Bilibili.js, requires-body=true
哔哩哔哩 = type=http-response, pattern=^https:\/\/app\.bilibili\.com\/x\/v2\/feed\/index(\/story)?\?, script-path=https://raw.ananaskop.com/Scripts/Bilibili.js, requires-body=true
哔哩哔哩 = type=http-response, pattern=^https:\/\/app\.bilibili\.com\/x\/resource\/show\/tab\/v2\?, script-path=https://raw.ananaskop.com/Scripts/Bilibili.js, requires-body=true
哔哩哔哩 = type=http-response, pattern=^https:\/\/app\.bilibili\.com\/x\/v2\/search\/square\?, script-path=https://raw.ananaskop.com/Scripts/Bilibili.js, requires-body=true
哔哩哔哩 = type=http-response, pattern=^https:\/\/api\.bilibili\.com\/pgc\/page\/(bangumi|cinema\/tab\?), script-path=https://raw.ananaskop.com/Scripts/Bilibili.js, requires-body=true
哔哩哔哩 = type=http-response, pattern=^https:\/\/api\.live\.bilibili\.com\/xlive\/app-room\/v1\/index\/getInfoByRoom\?, script-path=https://raw.ananaskop.com/Scripts/Bilibili.js, requires-body=true
哔哩哔哩 = type=http-response, pattern=^https:\/\/app\.bilibili\.com\/x\/v2\/account\/(mine\?|mine\/ipad\?), script-path=https://raw.ananaskop.com/Scripts/Bilibili.js, requires-body=true

[MITM]
hostname = %APPEND% *.weibo.cn, *.weibo.com, weibo.com, cn-acs.m.cainiao.com, acs.m.taobao.com, heic.alicdn.com, guide-acs.m.taobao.com, poplayer.template.alibaba.com, ad.12306.cn, mobile.12306.cn, *api.alipan.com, member.alipan.com, pan.baidu.com, image.mybank.icbc.com.cn, gab.122.gov.cn, flowplus.meituan.net, img.meituan.net, s3plus.meituan.net, osg-service.sgcc.com.cn, mp.weixin.qq.com, home.mi.com, wallet.95516.com, *.hupu.com, api.pinduoduo.com, video-dsp.pddpic.com, t-dsp.pinduoduo.com, images.pinduoduo.com, api.yangkeduo.com, 114.115.217.129, home.umetrip.com, edith.xiaohongshu.com, www.xiaohongshu.com, rec.xiaohongshu.com, m5.amap.com, m5-zb.amap.com, oss.amap.com, sns.amap.com, common.diditaxi.com.cn, freight.xiaojukeji.com, daijia.kuaidadi.com, ct.xiaojukeji.com, res.xiaojukeji.com, conf.diditaxi.com.cn, api.udache.com, 123.207.209.*, 112.53.55.225, 120.241.142.*, 120.241.143.*, 116.85.2.*, 116.85.3.*, 139.199.240.84, api.caiyunapp.com, *.cyapi.cn, weixin110.qq.com, security.wechat.com, m.baidu.com, www.baidu.com, zhidao.baidu.com, *.m.goofish.com, kad.gotokeep.com, 42.187.199.248, api.gotokeep.com, app.bilibili.com, api.bilibili.com, api.live.bilibili.com, grpc.biliapi.net, www.bilibili.com, m.bilibili.com, live.bilibili.com