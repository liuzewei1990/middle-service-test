
import { MongooseModule } from "@nestjs/mongoose";

const MongooseForRootModule = MongooseModule.forRoot("mongodb://127.0.0.1:8098/db");

export { MongooseForRootModule }