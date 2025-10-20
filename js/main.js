// ===============================================================
// === LOAD HEADER & FOOTER DINAMIS (MODULAR WEBSITE) ============
// ===============================================================
document.addEventListener("DOMContentLoaded", async () => {
  async function loadComponent(selector, filePath) {
    const el = document.querySelector(selector);
    if (!el) return;
    try {
      const res = await fetch(filePath);
      if (!res.ok) throw new Error(`Gagal memuat ${filePath}`);
      const html = await res.text();
      el.innerHTML = html;
    } catch (err) {
      console.error("Error memuat komponen:", filePath, err);
    }
  }

  // Deteksi apakah halaman di root atau subfolder (tentang-kami, blogs, dll)
  const basePath =
      window.location.pathname.includes("/tentang-kami") ||
      window.location.pathname.includes("/blogs") ||
      window.location.pathname.includes("/bimbel-spesialis-kedokteran") ||
      window.location.pathname.includes("/lolos-ptn-favorit")      ||
      window.location.pathname.includes("/kontak-kami")
      ? ".."
      : ".";

  // Muat header dan footer
  await loadComponent("header", `${basePath}/components/header.html`);
  await loadComponent("footer", `${basePath}/components/footer.html`);

  // Setelah header/footer termuat, jalankan seluruh fitur website
  if (typeof EducateWebsite === "function") {
    new EducateWebsite();
  }
});