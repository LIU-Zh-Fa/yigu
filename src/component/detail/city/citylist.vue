<template>
    <v-touch tag="div" :class="'div_'+type">
        <ul ref="cityul">
            <li v-for="(city,index) in List" :key="index">
                <p v-for="(item,key) in city"
                    :ref="key" 
                    :key="key"
                    :data-id="key"
                    :class="{'active':getcitykey === key}"
                    @tap="changeCity(key)">{{item}}</p>
            </li>
        </ul>
    </v-touch>
</template>
<script>
import Vuex from 'vuex';
import BScroll from 'better-scroll';
export default {
    props:['type'],
    data(){
        return {
            scroll: ''
        }
    },
    mounted(){
        this.initScroll();
    },
    watch: {
        List(newVal){
            this.initScroll();
        },
        provkey(newV,oldV){
            if(this.type !== 'prov' && this.scroll){
                this.scroll.scrollTo(0,0);
            }
        },
        citykey(newV,oldV){
            if(this.type === 'county' && this.scroll){
                this.scroll.scrollTo(0,0);
            }
        }
    },
    methods:{
        initScroll(){
            this.$nextTick(()=>{
                if(!this.scroll){
                    this.scroll = new BScroll(".div_"+this.type,{
                        tap: true,
                        momentumLimitTime: 0,
                        scrollY: true
                    });
                    if(this.getcitykey){
                        var top = this.$refs[this.getcitykey][0].offsetTop - this.$refs[this.getcitykey][0].offsetHeight * 2;
                        this.scroll.scrollTo(0,-top);
                    }
                    this.scroll.on('touchEnd',this.ScrollEnd.bind(this));
                }else{
                    if(this.getcitykey){
                        this.scroll.refresh();
                        var top = this.$refs[this.getcitykey][0].offsetTop - this.$refs[this.getcitykey][0].offsetHeight * 2;
                        this.scroll.scrollTo(0,-top);
                    }
                }
            })
        },
        ...Vuex.mapActions({
            changekey: "City/changekey"
        }),
        ScrollEnd(e){
            var arr = this.$refs.cityul.children;
            var index = Math.round(-e.y/arr[0].offsetHeight)
            index = index < 0 ? 0 : index > arr.length-1 ? arr.length-1 : index;
            this.changekey({key:arr[index].children[0].getAttribute("data-id"),type:this.type});
            this.scroll.scrollTo(0,- index * arr[0].offsetHeight);
        },
        changeCity(key){
            var top = this.$refs[key][0].offsetTop - this.$refs[key][0].offsetHeight * 2;
            this.scroll.scrollTo(0,-top);
            this.changekey({key:key,type:this.type});
        }
    },
    computed:{
        ...Vuex.mapState({
            provinceList: state=>state.City.provinceList,
            provkey: state=>state.City.provkey,
            citykey: state=>state.City.citykey,
            countykey: state=>state.City.countykey,
        }),
        ...Vuex.mapGetters({
            cityList: "City/getcityList",
            countyList: "City/getcountyList"
        }),
        List(){
            if(this.type === "prov"){
                return this.provinceList;
            }else if(this.type === "city"){
                return this.cityList;
            }else if(this.type === "county"){
                return this.countyList;
            }
        },
        getcitykey(){
            if(this.type === "prov"){
                return this.provkey;
            }else if(this.type === "city"){
                return this.citykey;
            }else if(this.type === "county"){
                return this.countykey;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    div{
        flex: 1;
        height: 100%;
        overflow: hidden;
        position: relative;
        ul{
            padding: 1.76rem 0;
            li{
                height: .88rem;
                line-height: .88rem;
                text-align: center;
                color: #999;
                p.active{
                    color: #f00;
                }
            }
        }
                }
</style>