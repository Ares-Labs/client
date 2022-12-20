import { useToast } from "vue-toastification";

const toast = useToast();

/**
 * @typedef {import("vue-toastification/types")} ToastTypes
 */

/** @type {ToastTypes.ToastConfig} */
const toastConfig = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

/**
 * Popup a success notification.
 *
 * @param {string} message The message to display.
 */
const successNotification = (message) => toast.success(message, toastConfig);

/**
 * Popup a info notification.
 *
 * @param {string} message The message to display.
 */
const infoNotification = (message) => toast.info(message, toastConfig);

/**
 * Popup a warning notification.
 *
 * @param {string} message The message to display.
 */
const warningNotification = (message) => toast.warning(message, toastConfig);

/**
 * Popup a error notification.
 *
 * @param {string} message The message to display.
 */
const errorNotification = (message) => toast.error(message, toastConfig);

export {
  successNotification,
  infoNotification,
  warningNotification,
  errorNotification,
};
