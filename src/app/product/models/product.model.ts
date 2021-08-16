export interface ProductListModel {
    data: ListModel[];
}

export interface ListModel {
    camera: number
    id: number
    imageUrl: string;
    memory: number
    name: string;
    price: number;
    ram: number;
    cameraLabel: string;
    memoryLabel: string;
    ramLabel: string;
}

export interface CameraDetailsModel {
    code: number;
    label: string;
}

export interface MemoryDetails {
    code: number;
    label: string;
}

export interface RamDetails {
    code: number;
    label: string;
}

export interface addMobilePayload {
    data: MobilePayloadModel
}
export interface MobilePayloadModel {
    camera: string;
    id: string; 
    memory: string; 
    name: string;
    price: number; 
    ram: string; 
}

export interface addMobileResponse {
    message: string;
}

export interface GetProductResponse {
    camera: string;
    id: number;
    memory:string;
    name: string;
    price: number;
    ram: string;
}

export interface editMobilePayload {
    data: EditPayload
}

export interface EditPayload {
    camera: string;
    id: number; 
    memory: string; 
    name: string;
    price: number; 
    ram: string; 
}