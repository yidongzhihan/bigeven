// $(function() {
//     const form = layui.form;
//     form.verify({
//         nickname: (val) => {
//             if (val.length > 6) return "昵称长度必须在1~6个字符之间！";
//         },
//     });

//     const initUserInfo = () => {
//         $.ajax({
//             type: "GET",
//             url: "/my/userinfo",
//             success: (res) => {
//                 if (res.status !== 0) return layer.msg("获取用户信息失败！");

//                 // console.log(res);
//                 form.val("formUserInfo", res.data);
//             }
//         })
//     }

//     //重置功能
//     $("#btnReset").click((e) => {
//         e.preventDefault();
//         initUserInfo()
//     });

//     // 更新用户信息
//     $(".layui-form").submit(function (e) {
//         e.preventDefault();
//         $.ajax({
//             type: "POST",
//             url: "/my/userinfo",
//             data: $(this).serialize(),
//             success: (res) => {
//                 if (res.status !== 0) return layer.msg("修改用户信息失败！");
//                 layer.msg("修改用户信息成功！");
//                 window.parent.getUserInfo();
//             }
//         })
//     })

//     initUserInfo();
// })

$(function () {
    const form = layui.form;
    // 自定义校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        },
    });


    const initUserInfo = () => {
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                // console.log(res);
                form.val("formUserInfo", res.data);
            }
        })
    }

    //重置功能
    $('#btnReset').click(e => {
        e.preventDefault()
        initUserInfo()
    })

    //更新用户信息
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) layer.msg('修改用户信息失败');
                layer.msg('修改用户信息成功')
                //调用父页面的函数 渲染欢迎语
                window.parent.getUserInfo();
            }
        })
    })



    initUserInfo();
})