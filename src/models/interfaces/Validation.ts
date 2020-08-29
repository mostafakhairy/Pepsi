export default interface Validation {
  type: 'Regex' | 'Confirm';
  value: any;
  message: string;
  show: boolean;
}
