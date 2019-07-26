module.exports = {
    devServer: {
        proxy: {
            "/api": {
                "target": "http://api.egu365.cn/",
                "changeOrigin": true,
                "pathRewrite": {
                    "^/api": ""
                }
            },
            "/mapi": {
                "target": "http://m.egu365.cn/",
                "changeOrigin": true,
                "pathRewrite": {
                    "^/mapi": ""
                }
            },
            "/wochu":{
                "target":"http://api9.wochu.cn",
                "changeOrigin":true,
                "pathRewrite":{
                    "^/wochu":""
                }
            },
            "/wwochu":{
                "target":"http://wmall.wochu.cn",
                "changeOrigin":true,
                "pathRewrite":{
                    "^/wwochu":""
                }
            },
        }
    }
}