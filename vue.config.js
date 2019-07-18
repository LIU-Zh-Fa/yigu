module.exports = {
    devServer: {
        proxy: {
            "/api": {
                "target": "http://api.egu365.cn/",
                "changeOrigin": true,
                "pathRewrite": {
                    "^/api": ""
                }
            }
        }
    }
}