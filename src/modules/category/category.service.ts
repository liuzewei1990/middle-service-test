import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FailResponseJson, SuccessResponseJson } from "../../config/responseStatusJson.config";
import { CounterGlobalService } from "../../modules-global/counters/counters.service";
import { Document, Model } from "mongoose";

interface CategoryInterface extends Document {
   readonly categoryCode:number;
   readonly categoryName:string;
}

@Injectable()
export class CategoryService {

    constructor(
        @InjectModel("CategoryModel") private readonly CategoryModel:Model<CategoryInterface>,
        private readonly CounterGlobalService: CounterGlobalService,
    ) { }

    /**
     * 查询所有类目
     * 默认查询所有 传入分页参数则支持分页查询
     */
    public async findAllCategorys() {
        try {
            let list = await this.CategoryModel.find({}, { _id: 0, categoryCode: 1, categoryName: 1 });
            return new SuccessResponseJson("查询成功", list);
        } catch (err) {
            return new FailResponseJson(err.message);
        }
    }

    /**
     * 添加一个类目
     * @param categoryName 类目名称
     */
    public async addCategorys(categoryName: string) {
        if (!categoryName) return new FailResponseJson("类别名称不能为空！");
        try { 
            let categoryCode = await this.CounterGlobalService.getNextSequenceValue("categoryCode");
            const CategoryModel = await new this.CategoryModel({categoryCode,categoryName});
            CategoryModel.save();
            return new SuccessResponseJson("添加成功", CategoryModel);
        } catch (err) {
            return new FailResponseJson(err.message);
        }
    }

    /**
     * 删除指定的类目或全部类目
     * @param categoryCode 要删除的类目code 可选参数
     */
    public async deleteCategorys(categoryCode:number){
        if(!categoryCode) return new FailResponseJson("类目编号不能为空！");
        try{
            let res = await this.CategoryModel.remove({categoryCode});
            return new SuccessResponseJson(`成功删除${res.n}个类目`);
        }catch(err){
            return new FailResponseJson(err.message);
        }
    }
}