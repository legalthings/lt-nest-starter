export interface ActionEventsReturnType {
  ActionForgotPassword: { email: string };
}

export const ActionEvents: { [P in keyof ActionEventsReturnType]: P } = {
  ActionForgotPassword: 'ActionForgotPassword',
};
