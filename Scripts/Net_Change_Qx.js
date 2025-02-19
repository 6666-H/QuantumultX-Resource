const $ = new Env('Network Monitor')
const NAME = 'network-monitor'

// 网络制式的映射关系
const RADIO_TYPES = {
    'CTRadioAccessTechnologyLTE': '4G',
    'CTRadioAccessTechnologyNR': '5G',
    'CTRadioAccessTechnologyWCDMA': '3G',
    'CTRadioAccessTechnologyeHRPD': '3G',
    'CTRadioAccessTechnologyCDMA1x': '2G',
    'CTRadioAccessTechnologyEdge': '2G',
    'CTRadioAccessTechnologyGPRS': '2G'
}

// 信号强度等级
const SIGNAL_LEVELS = {
    EXCELLENT: '很好',
    GOOD: '良好',
    FAIR: '一般',
    POOR: '较差',
    BAD: '很差'
}

// 获取友好的网络制式名称
function getRadioType(radio) {
    if (!radio) return '未知'
    return RADIO_TYPES[radio] || radio
}

// 评估信号强度
function evaluateSignalStrength(strength) {
    if (typeof strength !== 'number') return SIGNAL_LEVELS.FAIR;
    if (strength >= -50) return SIGNAL_LEVELS.EXCELLENT;
    if (strength >= -65) return SIGNAL_LEVELS.GOOD;
    if (strength >= -75) return SIGNAL_LEVELS.FAIR;
    if (strength >= -85) return SIGNAL_LEVELS.POOR;
    return SIGNAL_LEVELS.BAD;
}

// 安全的对象打印函数
function safeStringify(obj, indent = 2) {
    let cache = [];
    const retVal = JSON.stringify(
        obj,
        (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (cache.includes(value)) return '[Circular]';
                cache.push(value);
            } else if (typeof value === 'function') {
                return '[Function]';
            }
            return value;
        },
        indent
    );
    cache = null;
    return retVal;
}

let arg
if (typeof $argument != 'undefined') {
    arg = Object.fromEntries($argument.split('&').map(item => item.split('=')))
} else {
    arg = {}
}

!(async () => {
    $.log('==================== 开始监控网络状态 ====================')
    
    const lastNetworkState = $.getjson(NAME, {
        type: '',
        ssid: ''
    })
    
    let currentState = {
        type: 'unknown',
        ssid: ''
    }

    if (typeof $network !== 'undefined') {
        const v4 = $network.v4 || {}
        const wifi = $network.wifi || {}
        
        if (wifi.ssid) {
            currentState.type = 'WiFi'
            currentState.ssid = wifi.ssid
            if (typeof wifi.strength === 'number') {
                currentState.signalStrength = wifi.strength
                currentState.signalLevel = evaluateSignalStrength(wifi.strength)
            }
        } else if (v4.primaryAddress) {
            currentState.type = 'Cellular'
            if ($network.cellular) {
                const cellular = $network.cellular
                currentState.carrier = cellular.carrier
                currentState.radio = cellular.radio
                currentState.radioType = getRadioType(cellular.radio)
                if (typeof cellular.strength === 'number') {
                    currentState.signalStrength = cellular.strength
                    currentState.signalLevel = evaluateSignalStrength(cellular.strength)
                }
            }
        } else {
            currentState.type = 'None'
        }
        
    } else if (typeof $environment !== 'undefined') {
        const network = $environment.network
        const ssid = $environment.ssid
        const cellular = $environment.cellular || {}
        
        if (ssid && ssid.length > 0) {
            currentState.type = 'WiFi'
            currentState.ssid = ssid
            if ($environment.wifi && typeof $environment.wifi.strength === 'number') {
                currentState.signalStrength = $environment.wifi.strength
                currentState.signalLevel = evaluateSignalStrength($environment.wifi.strength)
            }
        } else if (cellular && (cellular.carrierName || cellular.currentRadioAccessTechnology)) {
            currentState.type = 'Cellular'
            if (cellular.carrierName && cellular.carrierName !== '--') {
                currentState.carrier = cellular.carrierName
            }
            if (cellular.currentRadioAccessTechnology) {
                currentState.radio = cellular.currentRadioAccessTechnology
                currentState.radioType = getRadioType(cellular.currentRadioAccessTechnology)
            }
            if (typeof cellular.signalStrength === 'number') {
                currentState.signalStrength = cellular.signalStrength
                currentState.signalLevel = evaluateSignalStrength(cellular.signalStrength)
            }
        } else {
            currentState.type = 'None'
        }
    } else {
        throw new Error('当前环境不支持网络监控')
    }

    if (lastNetworkState.type !== currentState.type || 
        (currentState.type === 'WiFi' && lastNetworkState.ssid !== currentState.ssid) ||
        (currentState.type === 'Cellular' && (
            lastNetworkState.carrier !== currentState.carrier ||
            lastNetworkState.radioType !== currentState.radioType
        ))) {
        
        let title = '网络状态变更'
        let subtitle = ''
        let body = ''

        switch (currentState.type) {
            case 'WiFi':
                subtitle = `已切换至 WiFi`
                let wifiDetails = [`当前连接: ${currentState.ssid}`]
                if (currentState.signalLevel) {
                    wifiDetails.push(`信号强度: ${currentState.signalLevel}`)
                }
                body = wifiDetails.join('\n')
                break
            case 'Cellular':
                let details = []
                if (currentState.radioType) {
                    subtitle = `已切换至 ${currentState.radioType} 网络`
                    details.push(`网络制式: ${currentState.radioType}`)
                } else {
                    subtitle = `已切换至蜂窝数据`
                }
                if (currentState.carrier) {
                    details.push(`运营商: ${currentState.carrier}`)
                }
                if (currentState.signalLevel) {
                    details.push(`信号强度: ${currentState.signalLevel}`)
                }
                body = details.join('\n')
                break
            case 'None':
                subtitle = `网络已断开`
                body = `请检查网络连接`
                break
            default:
                subtitle = `网络类型: ${currentState.type}`
                body = `网络状态未知`
        }

        $.msg(title, subtitle, body)
        $.setjson(currentState, NAME)
    } else {
        // 仅当信号强度变化时更新通知
        if (lastNetworkState.signalLevel !== currentState.signalLevel) {
            let title = '信号强度更新'
            let subtitle = currentState.type === 'WiFi' ? 
                `WiFi: ${currentState.ssid}` : 
                `${currentState.radioType || '蜂窝数据'}`;
            let body = `信号强度: ${currentState.signalLevel}`
            
            $.msg(title, subtitle, body)
        }
        
        $.setjson(currentState, NAME)
    }
})()
.catch((e) => {
    $.logErr(e)
    $.msg(NAME, '❌ 发生错误', e.message || e)
})
.finally(() => {
    $.done()
})

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,a)=>{s.call(this,t,(t,s,r)=>{t?a(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const a=this.getdata(t);if(a)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,a)=>e(a))})}runScript(t,e){return new Promise(s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi");a=a?a.replace(/\n/g,"").trim():a;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[i,o]=a.split("@"),n={url:`http://${o}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":i,Accept:"*/*"},timeout:r};this.post(n,(t,e,a)=>s(a))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e);if(!s&&!a)return{};{const a=s?t:e;try{return JSON.parse(this.fs.readFileSync(a))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):a?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const a=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of a)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,a)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[a+1])>>0==+e[a+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,a]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,a,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,a,r]=/^@(.*?)\.(.*?)$/.exec(e),i=this.getval(a),o=a?"null"===i?null:i||"{}":"{}";try{const e=JSON.parse(o);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),a)}catch(e){const i={};this.lodash_set(i,r,t),s=this.setval(JSON.stringify(i),a)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:a,statusCode:r,headers:i,rawBody:o}=t,n=s.decode(o,this.encoding);e(null,{status:a,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:a,response:r}=t;e(a,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(t);const{url:r,...i}=t;this.got[s](r,i).then(t=>{const{statusCode:s,statusCode:r,headers:i,rawBody:o}=t,n=a.decode(o,this.encoding);e(null,{status:s,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:s,response:r}=t;e(s,r,r&&a.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in a)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a[e]:("00"+a[e]).substr((""+a[e]).length)));return t}queryStr(t){let e="";for(const s in t){let a=t[s];null!=a&&""!==a&&("object"==typeof a&&(a=JSON.stringify(a)),e+=`${s}=${a}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",a="",r){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl||t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,a=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":a}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,a,i(r));break;case"Quantumult X":$notify(e,s,a,i(r));break;case"Node.js":}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),a&&t.push(a),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,t.stack)}}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}
