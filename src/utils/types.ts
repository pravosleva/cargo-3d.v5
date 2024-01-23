export enum EContainerType {
  TRUCK_V1 = 'truck_v1',
}

export type TProductItem = {
  width: number;
  length: number;
  addSize: number;
  weight: number;
  height: number;
  id: string;
  name: string;
  comment: string;
}

export type TSearchParamsNormalized = {
  wagonLength: number;
  wagonWidth: number;
  wagonHeight: number;
  wagonCarryingCapacity: number;
  maxInWagon: number;
  maxRowsInWagon_byWagonWidth: number;
  maxRowsInWagon_byWagonLength: number;
  maxFloorsInWagon: number;
  cargoType: string;
  modelName: string;
  containerType: EContainerType;
  productList: TProductItem[];
}

export type TResult = {
  ok: boolean;
  reason: string;
  output?: TSearchParamsNormalized;
}

export type TCfgItem = {
  name: keyof TSearchParamsNormalized;
  isRequired: boolean;
  validator: (val: any) => TResult;
  getNormalized?: (val: any) => {
    ok: boolean;
    reason?: string;
    value: any;
  };
}
