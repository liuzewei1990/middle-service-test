import { Controller, Get, ForbiddenException, Body, Query, Post } from "@nestjs/common";
import { AlipayUserService } from "./alipayUser.service";

@Controller("alipayUser")
export class AlipayUserController {
        constructor(private readonly AlipayUserService: AlipayUserService) {

        }

        @Get()
        public alipayUserFind(@Query() { keyword }) {
                try {
                        return this.AlipayUserService.alipayUserFind();
                } catch (err) {
                        return new ForbiddenException(err);
                }
        }

        @Post()
        public alipayUserAdd(@Body() user) {
                try {
                        console.log(user)

                        return this.AlipayUserService.alipayUserAdd(user);
                } catch (error) {
                        return new ForbiddenException(error);
                }
        }
}