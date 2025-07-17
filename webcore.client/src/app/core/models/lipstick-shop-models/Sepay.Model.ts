export interface SepayViewModel {
    id: number; // ID giao dịch trên SePay
    gateway: string; // Brand name của ngân hàng
    transactionDate: string; // Thời gian xảy ra giao dịch phía ngân hàng
    accountNumber: string; // Số tài khoản ngân hàng
    code?: string; // Mã code thanh toán (optional)
    content: string; // Nội dung chuyển khoản
    transferType: string; // Loại giao dịch. in là tiền vào, out là tiền ra
    transferAmount: number; // Số tiền giao dịch
    accumulated: number; // Số dư tài khoản (lũy kế)
    subAccount?: string; // Tài khoản ngân hàng phụ (optional)
    referenceCode: string; // Mã tham chiếu của tin nhắn sms
    description?: string; // Toàn bộ nội dung tin nhắn sms (optional)
}
