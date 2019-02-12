/**
 * Created by zhou.longfei on 2018/6/22.
 */
/**
 * Created by zhoulongfei on 2018/6/6.
 */


interface defaults{
    cache:object;
    [key:string]:any;
}
let defaults:defaults={
    cache:{}
};

export default class Demo2{
    //private options:defaults;
    constructor(opt?:object){

    }
    init():void{
        Demo2.bindEvent();
        Demo2.initStyle();
    }
    static bindEvent(){
        console.log("demo2 bindEvent")
    }
    static initStyle():void{
        console.log('demo2 initStyle!')
    }
}


