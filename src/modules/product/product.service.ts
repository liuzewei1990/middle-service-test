import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class ProductService {
    constructor(@InjectModel("ProductModel") private readonly ProductModel) { }


}