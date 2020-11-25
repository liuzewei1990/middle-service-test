import { Document } from "mongoose";



export interface FundInterface extends Document {
    readonly code: string;
    readonly zcCode: string;
    readonly zcName: string;
    readonly zcType: string;
    readonly enddate: string;
    readonly hold: string;
    readonly totalPrice: string;
    readonly ccRate: string;
    readonly price: string;
    readonly rate: string;
    readonly oldzcCode: string;
}