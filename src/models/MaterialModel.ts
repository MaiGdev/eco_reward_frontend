export interface RecyclingCenter {
    centerID: number;
    name: string;
    addressID: number;
    phone: string;
    operating_hours: string;
    status: string;
    administrator_userID: number;
  }
  
  export interface RecyclableMaterial {
    materialID: number;
    name: string;
    description: string;
    image: string;
    unit_of_measure: string;
    price: number;
    color_representation: string;
  }
  
  export interface CenterMaterial {
    checked: boolean;
    centerID: number;
    materialID: number;
    Recyclable_Material: RecyclableMaterial;
    Recycling_Center: RecyclingCenter;
  }