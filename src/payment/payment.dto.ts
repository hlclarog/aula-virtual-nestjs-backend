export interface IPayuResponse {
  merchantId: string;
  merchant_name: string;
  merchant_address: string;
  telephone: string;
  merchant_url: string;
  transactionState: string;
  lapTransactionState: string;
  message: string;
  referenceCode: string;
  reference_pol: string;
  transactionId: string;
  description: string;
  trazabilityCode: string;
  cus: string;
  orderLanguage: string;
  extra1: string;
  extra2: string;
  extra3: string;
  polTransactionState: string;
  signature: string;
  polResponseCode: string;
  lapResponseCode: string;
  risk: string;
  polPaymentMethod: string;
  lapPaymentMethod: string;
  polPaymentMethodType: string;
  lapPaymentMethodType: string;
  installmentsNumber: string;
  TX_VALUE: string;
  TX_TAX: string;
  currency: string;
  lng: string;
  pseCycle: string;
  buyerEmail: string;
  pseBank: string;
  pseReference1: string;
  pseReference2: string;
  pseReference3: string;
  authorizationCode: string;
  TX_ADMINISTRATIVE_FEE: string;
  TX_TAX_ADMINISTRATIVE_FEE: string;
  TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE: string;
  processingDate: string;
}
