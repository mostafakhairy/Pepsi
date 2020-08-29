export interface VoucherDetail {
    amount: number;
    burnDate: string;
    expiryDate: string;
    voucherNumber: string;
    status: string;
    offerName: string;
    branchName: string;
    discount: number;
    subscriptionDate: string;
    remainingUsage: number;
    lastModifiedAction: Date;
    offerTitle: string;
    offerNumber: string;
    offerDescription: string;
    merchantImage: string;
    merchantCategory: string;
    actor: string;
}

export interface UserHistory {
    totalCount: number;
    voucherDetails: VoucherDetail[];
}