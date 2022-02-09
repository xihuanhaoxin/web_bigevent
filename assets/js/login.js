
$(function () {
    $('#link_reg').on('click',function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    //凑够layui中获取form对象，layer对象
    const form = layui.form
    const layer = layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致的规则
        repwd: function(value) {
            //通过形参拿到确认密码框中的内容，还需要拿到密码框中的内容，然后进行判断两者是否相等，如果不等，则返回一个提示
            var pwd = $('.reg-box .pp').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    //坚听注册表单提交事件
    $('#form_reg').on('submit',function(e) {
        //1.阻止表单的默认提交行为
        e.preventDefault()
        //2.发起ajax的post请求
        $.post('http://www.liulongbin.top:3007/api/reguser',{ username: $('#form_reg [name=username]').val(),password: $('#form_reg [name=password]').val()}, function(res) {
            if (res.status !== 0) {
                console.log(res.message);
                // return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录');
            //模拟人的点击行为
            $('#link_login').click()
        })
    })
    //监听登录表单的提交事件
    $('#form_login').on('submit',function(e) {
        //1.阻止表单的默认提交行为
        e.preventDefault()
        //2.发起ajax请求
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success : function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                //将登录成功的token保存到localStorage中
                localStorage.setItem('token',res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})