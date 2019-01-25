import { Controller, Get, ForbiddenException, Body, Param, Query, Post, Options, Header, HttpCode } from "@nestjs/common";
import { AlipayUserService } from "./alipayUser.service";

@Controller("alipayUser")
export class AlipayUserController {
        constructor(private readonly AlipayUserService: AlipayUserService) {

        }

        @Get()
        @Header('Cache-Control', 'none')
        public alipayUserFind(@Query() query) {
                try {
                        return this.AlipayUserService.alipayUserFind(query);
                } catch (err) {
                        return new ForbiddenException(err);
                }
        }

        @Post()
        @HttpCode(200)
        public alipayUserAdd(@Body() user) {
                try {
                        return this.AlipayUserService.alipayUserAdd(user);
                } catch (error) {
                        return new ForbiddenException(error);
                }
        }
}