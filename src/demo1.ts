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

export default class Demo1{
    //private options:defaults;
    constructor(opt?:object){

    }
     init():void{
        Demo1.bindEvent();
        Demo1.initStyle();
    }
    static bindEvent(){
        console.log("demo1 bindEvent")
    }
    static initStyle():void{
        console.log('demo1 initStyle!')
    }
}


