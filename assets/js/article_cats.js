$(function() {
    const layer = layui.layer
    const form = layui.form
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
            
              const htmlStr = template('tpl-table',res)
              $('tbody').html(htmlStr)
            }
        })
    }

    //为添加类别按钮绑定点击点击事件
    var indexAdd = null
    $('#btnAddCate').on('click',function() {
        indexAdd = layer.open({
            type: '1',
            title: '添加文章分类',
            area: ['500px','250px'],
            //因为在js中写标签非常麻烦，所以用$('选择器').html()方法获得标签里的结构，渲染到弹出层
            content: $('#dialog-add').html()
        })
    })

    //因为form-add表单是通过点击事件渲染出来的，无法直接绑定事件，所以通过代理的方式，为form-add表单绑定submit事件
    $('body').on('submit','#form-add',function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                layer.close(indexAdd)
            }
        })
    })

    //因为form-add表单是通过点击事件渲染出来的，无法直接绑定事件，所以通过代理的方式，为form-add表单绑定click事件
    var indexEdit = null
    $('tbody').on('click','.btn-edit',function() {
        indexEdit = layer.open({
            type: 1,
            title: '编辑文章类别',
            area: ['500px','250px'],
            content: $('#dialog-edit').html()
        })
        

        //获取自定义的id
        const id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit',res.data)
            }
        })
    })

    //通过代理的方式，为修改分类的表单绑定点击事件
    $('body').on('submit','#form-edit',function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    
                    return layer.msg('更新分类数据失败')
                    
                }
               
                layer.msg('更新分类数据成功')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    //通过代理的方式，为删除按钮绑定点击事件
    $('tbody').on('click','.btn-delete',function() {
        const id = $(this).attr('data-id')
        layer.confirm('确认删除', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章类别失败！')
                    }
                    initArtCateList()
                    layer.msg('删除文章类别成功！')
                    layer.close(index)
                }
            })
            
          });
    })
})