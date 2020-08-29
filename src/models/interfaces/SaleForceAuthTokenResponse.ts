export interface SaleForceResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  soap_instance_url: string;
  rest_instance_url: string;
}
