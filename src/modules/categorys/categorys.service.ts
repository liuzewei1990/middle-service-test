import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FailResponseJson, SuccessResponseJson } from "config/responseStatusJson.config";
import { CounterGlobalService } from "modules-global/counters/counters.service";

@Injectable()
export class CategorysService {
    constructor(
        @InjectModel("CategorysModel") private readonly CategorysModel,
        private readonly CounterGlobalService: CounterGlobalService,
    ) { }

    /**
     * 查询所有类目
     * 默认查询所有 传入分页参数则支持分页查询
     * @param page 
     * @param limit 
     */
    public async findAllCategorys(page?: number, limit?: number) {
        try {
            let list = await this.CategorysModel.find({}, { _id: 0, categorysCode: 1, categorysName: 1 });
            return new SuccessResponseJson("查询成功", list);
        } catch (err) {
            return new FailResponseJson(err.message);
        }
    }

    /**
     * 添加一个类目
     * @param categorysName 类目名称
     */
    public async addCategorys(categorysName: string) {
        if (!categorysName) return new FailResponseJson("类别名称不能为空！");
        try {
            let newCategorys = {
                categorysCode: await this.CounterGlobalService.getNextSequenceValue("categorysCode"),
                categorysName: categorysName
            };
            const CategorysModel = await new this.CategorysModel(newCategorys);
            CategorysModel.save();
            return new SuccessResponseJson("添加成功", CategorysModel);
        } catch (err) {
            return new FailResponseJson(err.message);
        }
    }
}