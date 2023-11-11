export enum ReceiveStatus {
    UNRECEIVE = 1,
    ACCEPTED = 2,
}

// plus会员兑换码领取状态
export const ReceiveStatusLabel = {
    [ReceiveStatus.UNRECEIVE]: '未领取',
    [ReceiveStatus.ACCEPTED]: '已领取',
};

// 默认每页条数
export const DefaultPageSize = 10;
