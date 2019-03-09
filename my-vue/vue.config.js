//node导出
module.exports ={
    //搭建服务器
    devServer: {
        open: true, //自动开启浏览器
        host: 'localhost', //本地服务地址
        port: 8080, //端口号
        https: false, //是否是https协议
        hotOnly: false, //热加载
        //代理
        // http://m.kugou.com/?json=true
        proxy: {
            '/api': {
                target: 'http://m.kugou.com/',//要替换的目标
                secure:false, //是否是https
                changeOrigin:true, //是否允许跨域
                pathRewrite:{//替换的字符
                    "^/api":''
                }
            },
            '/search': {
                target: 'https://mobiles.kugou.com/api/v3/search/song?',//要替换的目标
                secure:false, //是否是https
                changeOrigin:true, //是否允许跨域
                pathRewrite:{//替换的字符
                    "^/search":''
                }
            }
        }
    }
}