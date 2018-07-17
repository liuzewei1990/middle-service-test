
import { MongooseModule } from "@nestjs/mongoose";

const MongooseForRootModule = MongooseModule.forRoot("mongodb://47.94.3.28:8060/store");

export { MongooseForRootModule }