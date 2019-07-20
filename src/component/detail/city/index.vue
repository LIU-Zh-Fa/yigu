<template>
    <div class="city" v-if="showFlag">
        <v-touch tag="div" class="mask_top" @tap="closeCity"></v-touch>
        <div class="city_info">
            <div class="city_top">
                <v-touch tag="span" @tap="closeCity">取消</v-touch>
                <v-touch tag="b" @tap="saveCity">确认</v-touch>
                <p>选择地区</p>
            </div>
            <div class="city_body">
                <CityList type="prov" />
                <CityList type="city" />
                <CityList type="county"/>
            </div>
        </div>
    </div>
</template>
<script>
import Vuex from 'vuex';
import BScroll from 'better-scroll';
import CityList from './citylist'
export default {
    data(){
        return {
            showFlag: false
        }
    },
    created(){
        this.getArea();
    },
    components:{
        CityList
    },
    methods:{
        ...Vuex.mapActions({
            getArea: "City/getArea",
        }),
        saveCity(){
            this.$store.dispatch("City/saveCity");
            this.closeCity();
        },
        closeCity(){
            this.showFlag = false;
            this.$store.dispatch("City/initCitykey");
        },
        openCity(){
            this.showFlag = true;
        }
    },
    computed:{
        ...Vuex.mapState({
            provinceList: state=>state.City.provinceList,
        }),
        ...Vuex.mapGetters({
            cityList: "City/cityList",
            countyList: "City/countyList"
        })
    }
}
</script>
<style lang="scss" scoped>
    .city{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: rgba(0,0,0,0.2);
        z-index: 999;
        display: flex;
        flex-direction: column;
        .mask_top{
            flex: 1;
        }
        .city_info{
            width: 100%;
            height: 5.1rem;
            background: #fff;
            display: flex;
            flex-direction: column;
            .city_top{
                height: .7rem;
                line-height: .7rem;
                text-align: center;
                position: relative;
                span{
                    position: absolute;
                    left: 0;
                    padding: 0 .26rem;
                }
                b{
                    position: absolute;
                    right: 0;
                    padding: 0 .26rem;
                    color: #abcd05
                }
                p{
                    font-size: 14px;
                }
            }
            .city_body{
                flex: 1;
                display: flex;
                overflow: hidden;
            }
        }
    }
</style>