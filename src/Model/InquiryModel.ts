import { UserModel } from "./UserModel";
import { VehicleModel } from "./VehicleModel";

export interface InquiryModel {
  id: number;
  invoice_term: string;
  car_price: string;
  local_transport: number;
  inspection_charges: number;
  freight_charges: number;
  insurance_charges: number;
  late_payment_charges: number;
  demurrage_charges: number;
  repairing_fee: number;
  other_charges: number;
  discount: number;
  total_invoice: number;
  advance_title: string;
  advance_currency: string;
  advance_percentage: string;
  advance_yen: string | null;
  advance_usd: string | null;
  usd_to_yen_rate: string;
  company_id: number | null;
  inquiry_from: number;
  biding_amount: string | null;
  car_serial_code: string;
  user_name: string;
  user_email: string;
  user_contact: string;
  country: string;
  port: string;
  shipping: ShippingModel;
  pre_ship_inspection: string;
  insurance: string;
  insurance_included: boolean;
  insurance_price: number | null;
  message: string;
  comment: string | null;
  rating: string | null;
  type: string | null;
  date_created: string;
  expiry_date: string;
  status: string | null;
  user_id: number;
  chats: ChatModel[]; // replace `any` with a proper ChatModel if you have one
  is_read: boolean;
  assigned: number;
  consignee_details: ConsigneeDetails;
  unread_chat_count: number;
  payments: PaymentReceipt[]; // replace `any` with PaymentModel if defined
  receives: BankTransaction[]; // replace `any` with ReceiveModel if defined
  request_invoice: boolean;
  car : VehicleModel
}
export interface ShippingModel {
  manager_documents_approval : number,
  document_received : boolean,
  car_received : boolean,
  inspection_certificate : string,
  bl_copy : string,
  fob_invoice : string,
  export_certificate : string,
  cnf_invoice : string,
  shipping_emails : ShippingMailModel[]
}
export interface ShippingMailModel {
  id: number;
  shipping_id: number;
  sender_id: number;
  mail_to: string;
  type: 'transport' | string; // can extend with more types if needed
  bl_mail: string | null;
  c_and_f_mail: string | null;
  document_reviewed: '0' | '1'; // stored as string flag
  date_created: string;  // ISO datetime
  date_modified: string; // ISO datetime
  status: number;        // likely 0/1 flag
  created_at: string;    // ISO datetime
  updated_at: string;    // ISO datetime

}

export interface ConsigneeDetails {
  name: string;
  email: string;
  contact_no: string;
  passport: string;
  pobox: string;
  address: string;
}
export interface ChatModel {
  id: number;
  customer_id: number;
  inquiry_id: number;
  comment: string;
  module_tag: string;
  sales_person_id: number | null;
  date_created: string;
  chat_type: string;
  is_viewed: boolean;
  status: number;
  extension_type: string | null;
  user: UserModel;
}
export interface InquiryModelApi {
  inquiries? : InquiryModel[]
}
export interface InquiryModelDetailApi {
  inquiry? : InquiryModel
}
export interface PaymentReceipt {
  id: number;
  authorized_by: string | null;
  receiver_id: number;
  bank_receipt_image: string;
  source_id: number;
  customer_id: number;
  type:  string; // can be narrowed if more types exist
  verified_by: string | null;
  status:  string; // can extend as needed
  date_created: string;  // ISO datetime
  date_modified: string; // ISO datetime
  created_at: string;    // ISO datetime
  updated_at: string;    // ISO datetime
}
export interface BankTransaction {
  id: number;
  company_id: number;
  bank_receipt_id: number;
  car_id: number;
  user_id: number;
  customer_id: number;
  receiver_name: string;
  amount: number;
  type:  string; // can extend with other payment types
  bank_transfer_image: string; // likely a file path or "0" if not uploaded
  check_image: string;         // same as above
  date_created: string;        // ISO datetime
  date_modified: string;       // ISO datetime
  status: number;              // could be 0/1 flag or enum
  created_at: string;   // null if not yet created
  updated_at: string;          // ISO datetime
}
