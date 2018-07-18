import { Controller, Get, Post, UseInterceptors, FileInterceptor, UploadedFile } from "@nestjs/common";
import { FailResponseJson } from "config/responseStatusJson.config";


@Controller("banner")
export class BannerController {


    @Get()
    public async getAllBaner() {

    }

    @Post()
    @UseInterceptors(FileInterceptor("bannerImg", {
        dest: 'uploads/',
        limits: {
            fileSize: 0.1 * 1024 * 1024,
            preservePath: true
        },
        fileFilter(req, file, callback) {
            console.log(123, file)
            if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.mimetype)) {
                callback(null, false);
                return;
            }
            callback(null, true);
        }
    }))
    public async addBanner(@UploadedFile() file) {
        try {
            console.log(444, file)
            let info = {
                fieldname: 'bannerImg',
                originalname: 'c_bg - 副本.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: 'uploads/',
                filename: '9ba62e7e4a6e16f368adcd7f5baa3505',
                path: 'uploads\\9ba62e7e4a6e16f368adcd7f5baa3505',
                size: 28646
            }
        } catch (err) {
            return new FailResponseJson(err.message)
        }

    }

    @Post("del")
    public async delBanner() {

    }
}