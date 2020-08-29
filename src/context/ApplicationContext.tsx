import React from 'react';

export interface IAppState {
  user: any;
  lang: string;
}
export const ApplicationContext = React.createContext<any[]>([]);
