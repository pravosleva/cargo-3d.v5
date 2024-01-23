export const showNotif = ({ title, description, type }: {
  title: string;
  description: string;
  type: 'success' | 'error' | 'info';
}): void => {
  // @ts-ignore
  new Notify ({
    status: type,
    title,
    text: description,
    effect: 'fade',
    speed: 300,
    customClass: '',
    customIcon: '',
    showIcon: true,
    showCloseButton: true,
    autoclose: false,
    autotimeout: 3000,
    // gap: 20,
    // distance: 20,
    type: 3,
    position: 'left bottom'
  })
}
