/**
 * Sets the message of the given toast element and displays it for a specified duration.
 *
 * @param {HTMLElement} toast - The toast element to display the message in.
 * @param {string} message - The message to be displayed in the toast.
 */
export function showToast(toast: HTMLElement, message: string) {
  // Set the toast message
  toast.innerText = message;

  // Show the toast
  toast.style.display = "block";

  // Hide the toast after 3 seconds (adjust as needed)
  setTimeout(function () {
    toast.style.display = "none";
  }, 3000);
}
