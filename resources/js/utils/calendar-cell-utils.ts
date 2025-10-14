// utils/calendar-cell-utils.ts

export function setupCalendarCellHover(info: any) {
  const date = info.dateStr;
  const cellEl = info.el;

  // buat tombol plus
  const plusBtn = document.createElement("button");
  plusBtn.innerHTML = "+";
  plusBtn.className =
    "absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-sm rounded-full border border-gray-300 bg-white hover:bg-blue-50 hover:text-blue-600 transition-colors z-10";
  plusBtn.style.display = "none";

  // klik tombol → aksi tambah task
  plusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("➕ Tambah task untuk tanggal:", date);
    // TODO: openNewTaskModal(date) → nanti implementasi modal di sini
  });

  // tampilkan tombol saat hover
  cellEl.addEventListener("mouseenter", () => {
    plusBtn.style.display = "block";
  });
  cellEl.addEventListener("mouseleave", () => {
    plusBtn.style.display = "none";
  });

  // pastikan cell bisa menampung posisi absolute
  cellEl.style.position = "relative";
  cellEl.appendChild(plusBtn);
}
