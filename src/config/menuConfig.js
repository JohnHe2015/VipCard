const menuConfig = [
    {
        "title" : "首页",
        "key" : "/admin",
        "Icon" : "home"
    },
    {
        "title" : "会员注册",
        "key" : "/admin/register",
        "Icon" : "smile"

    },
    {
        "title" : "会员审批",
        "key" : "/admin/approval",
        "Icon" : "setting"

    },
    {
        "title" : "会员管理",
        "key" : "/admin/manager",
        "Icon" : "setting"

    },
    {
        "title" : "优惠券管理",
        "key" : "/admin/coupon",
        "Icon" : "heart"

    },
    {
        "title" : "用户管理",
        "key" : "/admin/user",
        "Icon" : "user"
    },
    {
        "title" : "antd测试",
        "key" : "/admin/test",
        "Icon" : "line-chart",
        "children" : [
            {
                "title" : "按钮测试",
                "key" : "/admin/test/button"
            },
            {
                "title" : "表单测试",
                "key" : "/admin/test/form"
            },
            {
                "title" : "model测试",
                "key" : "/admin/test/model"
            }
        ]
    }
];

export default menuConfig;