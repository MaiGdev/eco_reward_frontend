import { RecyclingCenterModel } from "./RecyclingCenterModel";
import { RecyclingMaterialModel } from "./RecyclingMaterialModel";

export interface MaterialExchangeModel {
    exchangeID: number;
    client_userID: number;
    centerID: number;
    exchange_date: string;
    Exchange_Material_Details: ExchangeMaterialDetailModel[];
    RecyclingCenterModel: RecyclingCenterModel
  }
  
export interface ExchangeMaterialDetailModel {
    detailID: number;
    exchangeID: number;
    materialID: number;
    quantity: number;
    eco_coins: number;
    Recycling_Material: RecyclingMaterialModel;
  }

  export  interface ExchangeRequest {
    userId: number;
    exchangeDetails: {
      centerID: number;
      Exchange_Material_Details: ExchangeMaterialDetail[];
    };
  }
  
  export  interface ExchangeMaterialDetail {
    materialID: number;
    quantity: number;
    eco_coins: number;
  }
  