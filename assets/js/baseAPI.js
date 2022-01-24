//注意：每次调用$.get() 或 $.post() 或 $.ajax()的时候，会先调用这个ajaxPrefilter函数,在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    
    //统一未有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂载complete函数
    options.complete = function(res) {
        
            //在complete函数中，可以通过res.responseJSON拿到服务器响应回来的数据
            if (res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！') {
                //1.清空token
                localStorage.removeItem('token')
                //2.强制跳转到登录界面
                location.href = '/login.html'
            }
        
    }
})