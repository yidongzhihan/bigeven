$(function () {
    const layer = layui.layer;
    const form = layui.form;
    const initArtCateList = () => {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: (res) => {
                const htmlStr = template("tpl-table", res);
                $("tbody").empty().html(htmlStr);
            }
        })
    }
    initArtCateList()

    // 新增分类
    let indexAdd = null;
    $("#btnAddCate").click(() => {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $("#dialog-add").html(),
        })
    })

    // 通过事件委托的方式监听提交事件
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("新增文章分类失败！");
                layer.msg("新增文章分类成功！");
                initArtCateList();
                layer.close(indexAdd);
            }
        })
    })

    //通过代理方式，为btn-edit 按钮绑定点击事件
    let indexEdit = null;
    $("tbody").on("click", ".btn-edit", function () {
        // 弹出修改文章分类的弹窗
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        })
        const id = $(this).attr("data-id");
        // 发起请求获取对应分类的数据
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: (res) => {
                console.log(res);
                layui.form.val("form-edit", res.data);
            }
        });
    })

    // 更新文章分类
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("更新分类失败！");
                layer.msg("更新分类成功！");
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    })

    // 通过代理的形式，为删除按钮绑定点击事件

    $('tbody').on('click','.btn-delete', function() {
        // console.log('ok')
        const id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除？', {icon: 3, title: '提示'}, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })
})
