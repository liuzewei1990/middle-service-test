import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class ProductsService {
    constructor(@InjectModel("GoodsModel") private readonly GoodsModel) { }


}