import { Injectable } from "@nestjs/common";

@Injectable()
export class WxService {
    constructor(
    ) { }

    async jscode2session(js_code) {
        const data = await fetch(`https://api.weixin.qq.com/sns/jscode2session?appid=wx530c0685bcffbc62&secret=655ab555be8f3d6ced554ebaa49051c8&js_code=${js_code}`, {
            method: "GET",
        });
        let ret = await data.json()
        console.log(ret)
    }
}