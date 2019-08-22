/**
 * Created by zhoulongfei on 2018/6/6.
 */

import ReferenceLine from './reference-line'

interface defaults{
    cache:object;
    [key:string]:any;
}
let defaults:defaults={
    cache:{}
};

export class Main{
    //private options:defaults;
    constructor(opt?:object){

    }
    init():void{
        Main.bindEvent();
        Main.initStyle();
        new ReferenceLine({
            item:'[data-query="item"]',
            range:'.box',
            drag: true,
            zIndex: 1,//参考线层级
            lineColor:'red',
            lineWidth:1,
            offset: 40,//参考线头尾的延伸距离
            move:function(evt:any,ele:any,l:number,t:number):void{
                //
            }


        }).init();

    }
    static bindEvent(){
        console.log("bindEvent")
    }
    static initStyle():void{
        console.log('initStyle!')
    }
}


new Main().init();