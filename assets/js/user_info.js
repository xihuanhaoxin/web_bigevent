$(function() {
    const form = layui.form
    const layer = layui.layer
    
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1-6 个字符之间'
            }
        }
    })

   
    

    initUserInfo()

function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            console.log(res.data);
            //调用form.val()为表单赋值
            form.val('formInfo',res.data)
        }
        
    })
}

$('#btnReset').on('click',function(e) {
    e.preventDefault()
    initUserInfo()
})

//坚挺表单的提交行为
$('.layui-form').on('submit',function(e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function(res) {
            
            if (res.status !== 0) {
                return layer.msg('提交用户信息失败！')
            }
            window.parent.getUserInfo()
        }
    })
})
})


