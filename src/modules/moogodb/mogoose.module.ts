
import { MongooseModule } from "@nestjs/mongoose";

const MongooseForRootModule = MongooseModule.forRoot("mongodb://59.110.152.162:8098/db");

export { MongooseForRootModule }