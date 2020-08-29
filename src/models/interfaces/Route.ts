export default interface IRouter {
  path: string;
  name: string;
  component: any;
  hidden?: boolean;
  protected?: boolean;
}
