import List from '@/views/wc/list'
import Active from '@/views/wc/list/active'
import Tjlist from '@/views/wc/list/tjlist'
import GoodList from '@/views/wc/list/goodlist'
export default{
    path: '/wc/list',
    name: 'WcList',
    component: List,
    children: [{
        path: '/wc/list/active/:actid',
        name: 'WcActive',
        component: Active
    },{
        path: '/wc/list/tjlist/:tagname',
        name: 'WCTjlist',
        component: Tjlist
    },{
        path: '/wc/list/goodlist/:parentid/:menuid',
        name: 'WCGoodlist',
        component: GoodList
    }]
}