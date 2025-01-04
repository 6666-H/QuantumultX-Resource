/*
* 名称: YouTube双语翻译
* 更新: 2025-01-04 23:15:33
*/


let body = $response.body;
try {
    #!name=YouTube双语翻译
#!desc=字幕增强及双语翻译，支持Youtube Music歌词翻译。此插件需要置于YouTube去广告插件之下，且和YouTube去广告插件的歌词翻译冲突，不支持tvOS设备。
#!author=VirgilClyne[https://github.com/VirgilClyne]
#!icon=https://raw.githubusercontent.com/luestr/IconResource/main/App_icon/120px/YouTube.png
#!category=BetaModule
#!openUrl=https://apps.apple.com/app/id544007664
#!tag=功能增强
#!system_version=15
#!loon_version=3.2.1(749)
#!homepage=https://github.com/luestr/ProxyResource/blob/main/README.md
#!date=2024-09-24 23:06:40

[Script]
# YouTube字幕翻译
JSON·YouTube播放器请求 = type=http-request, pattern=^https?:\/\/(www|m|tv)\.youtube\.com\/youtubei\/v1\/player\?(.*), script-path=https://kelee.one/Resource/Script/YouTube/YouTube_Subtitles_Translate/YouTube_Subtitles_request.js, requires-body=true, argument="[{Type},{AutoCC},{ShowOnly},{Position}]"

JSON·YouTube播放器响应 = type=http-response, pattern=^https?:\/\/(www|m|tv)\.youtube\.com\/youtubei\/v1\/player\?(.*), script-path=https://kelee.one/Resource/Script/YouTube/YouTube_Subtitles_Translate/YouTube_Subtitles_response.js, requires-body=true, argument="[{Type},{AutoCC},{ShowOnly},{Position}]"

Proto·YouTube播放器请求 = type=http-request, pattern=^https?:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/player\?(.*), script-path=https://kelee.one/Resource/Script/YouTube/YouTube_Subtitles_Translate/YouTube_Subtitles_request.js, requires-body=true, binary-body-mode=true, argument="[{Type},{AutoCC},{ShowOnly},{Position}]"

Proto·YouTube播放器响应.proto = type=http-response, pattern=^https?:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/player\?(.*), script-path=https://kelee.one/Resource/Script/YouTube/YouTube_Subtitles_Translate/YouTube_Subtitles_response.js, requires-body=true, binary-body-mode=true, argument="[{Type},{AutoCC},{ShowOnly},{Position}]"

Proto·GetWatch响应 = type=http-response, pattern=^https?:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/get_watch\?(.*), script-path=https://kelee.one/Resource/Script/YouTube/YouTube_Subtitles_Translate/YouTube_Subtitles_response.js, requires-body=true, binary-body-mode=true, argument="[{Type},{AutoCC},{ShowOnly},{Position}]"

YouTube定时文本请求 = type=http-request, pattern=^https?:\/\/(www|m)\.youtube\.com\/api\/timedtext\?(.*), script-path=https://kelee.one/Resource/Script/YouTube/YouTube_Subtitles_Translate/YouTube_Subtitles_request.js, argument="[{Type},{AutoCC},{ShowOnly},{Position}]"

YouTube合成定时文本响应 = type=http-response, pattern=^https?:\/\/(www|m)\.youtube\.com\/api\/timedtext\?(.*)subtype=(Official|External), script-path=https://kelee.one/Resource/Script/YouTube/YouTube_Subtitles_Translate/YouTube_Composite_Subtitles_response.js, requires-body=true

YouTube翻译定时文本响应 = type=http-response, pattern=^https?:\/\/(www|m)\.youtube\.com\/api\/timedtext\?(.*)subtype=Translate, script-path=https://kelee.one/Resource/Script/YouTube/YouTube_Subtitles_Translate/YouTube_Subtitles_Translate_response.js, requires-body=true

# YouTube Music歌词翻译
JSON·YouTube Music浏览请求 = type=http-request, pattern=^https?:\/\/music\.youtube\.com\/youtubei\/v1\/browse\?(.*), script-path=https://kelee.one/Resource/Script/YouTube/YouTube_Subtitles_Translate/YouTube_Subtitles_request.js, requires-body=true, argument="[{Type},{AutoCC},{ShowOnly},{Position}]"

Proto·YouTube Music浏览请求 = type=http-request, pattern=^https?:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/browse\?(.*), script-path=https://kelee.one/Resource/Script/YouTube/YouTube_Subtitles_Translate/YouTube_Subtitles_request.js, requires-body=true, binary-body-mode=true, argument="[{Type},{AutoCC},{ShowOnly},{Position}]"

JSON·YouTube Music翻译歌词响应 = type=http-response, pattern=^https?:\/\/music\.youtube\.com\/youtubei\/v1\/browse\?(.*)subtype=Translate, script-path=https://kelee.one/Resource/Script/YouTube/YouTube_Subtitles_Translate/YouTube_Subtitles_Translate_response.js, requires-body=true

Proto·YouTube Music翻译歌词响应 = type=http-response, pattern=^https?:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/browse\?(.*)subtype=Translate, script-path=https://kelee.one/Resource/Script/YouTube/YouTube_Subtitles_Translate/YouTube_Subtitles_Translate_response.js, requires-body=true, binary-body-mode=true

[MITM]
hostname = %APPEND% www.youtube.com, m.youtube.com, tv.youtube.com, music.youtube.com, youtubei.googleapis.com


} catch (err) {
    console.log('Error: ' + err);
}
$done({body});
