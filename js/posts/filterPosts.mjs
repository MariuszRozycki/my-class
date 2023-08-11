export function filterPost() {
  console.log("dziala filter");
  document.getElementById('filterOption').addEventListener('change', function () {
    const authorInput = document.getElementById('authorInput');
    if (this.value === "3") {
      authorInput.classList.remove("d-none");
    } else {
      authorInput.classList.add("d-none");
    }
  });

}