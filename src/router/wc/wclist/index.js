export default {
    path: '/wc/list',
    name: 'WcList',
    component: ()=>import("@/views/wc/list"),
    children: [{
        path: '/wc/list/active/:actid',
        name: 'WcActive',
        component: ()=>import("@/views/wc/list/active"),
    },{
        path: '/wc/list/tjlist/:tagname',
        name: 'WCTjlist',
        component: ()=>import("@/views/wc/list/tjlist"),
    },{
        path: '/wc/list/goodlist/:parentid/:menuid',
        name: 'WCGoodlist',
        component: ()=>import("@/views/wc/list/goodlist"),
    }]
}