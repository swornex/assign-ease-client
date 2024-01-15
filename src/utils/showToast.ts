export function showToast(toast: HTMLElement, message: string) {
  console.log({ toast, message });
  // Set the toast message
  toast.innerText = message;

  // Show the toast
  toast.style.display = "block";

  // Hide the toast after 3 seconds (adjust as needed)
  setTimeout(function () {
    toast.style.display = "none";
  }, 3000);
}
