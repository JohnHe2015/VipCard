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
        "title" : "微信管理",
        "key" : "/admin/wx",
        "Icon" : "wechat",
        "children" : [
            {
                "title" : "分组管理",
                "key" : "/admin/wx/groups"
            },
            {
                "title" : "模板查询",
                "key" : "/admin/wx/template"
            },
            {
                "title" : "model测试",
                "key" : "/admin/wx/model"
            }
        ]
    }
];

export default menuConfig;