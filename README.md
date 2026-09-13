# Transformasi di Balik Demam Nikel Sulawesi Tengah

Webstory data-scrollytelling 16 chapter (00–15), dibangun dengan Next.js App
Router + TypeScript + Tailwind CSS v4 + GSAP ScrollTrigger + Chart.js.
Semua data dan style di-hardcode sesuai `dashboard_content_guide.md` dan
`dashboard_style_visual_guideline.md`, dan seluruh angka diambil dari gambar
referensi (`/referensi`) agar hasilnya presisi.

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Buka http://localhost:3000 — scroll untuk menjelajahi 16 chapter cerita.

Untuk build produksi:

```bash
npm run build
npm run start
```

Build sudah diverifikasi berjalan tanpa error (TypeScript + Next.js build
sukses).

## Arsitektur

```
app/
  layout.tsx        - root layout (font stack aman tanpa fetch eksternal)
  page.tsx           - merangkai StoryContainer + 16 chapter
  globals.css         - design tokens (@theme), scroll-snap, glass-card, grain

components/
  StoryContainer.tsx  - scroll-snap wrapper + IntersectionObserver pelacak
                        chapter aktif + context provider
  ChapterSection.tsx  - shell 100vh per-chapter (WAJIB pakai class `isolate`
                        agar background image tidak "bocor" ke stacking
                        context root — lihat catatan CSS di bawah)
  BackgroundLayer.tsx - foto latar + gradient overlay + grain
  MapVisualization.tsx- render peta.webp asli + glow animasi di Morowali
  GlassCard.tsx        - kartu kaca (glassmorphism) dipakai di semua chapter
  ChapterChrome.tsx    - Kicker/Headline/Body/SectionLabel (tipografi standar)
  MetricCounter.tsx    - angka dengan animasi count-up (format ID: koma desimal)
  TopBar.tsx / PaginationDots.tsx / FooterBar.tsx
                        - chrome tetap (fixed) di seluruh cerita

chapters/
  Chapter00.tsx ... Chapter15.tsx
                        - satu file per chapter, data di-hardcode langsung
                        di dalam komponen (sesuai instruksi awal — tidak ada
                        data.json)

context/ActiveChapterContext.tsx - context React untuk index chapter aktif
hooks/useChapterReveal.ts         - animasi GSAP fade+translate+blur saat
                                    chapter pertama kali aktif
hooks/useCountUp.ts                - animasi angka 0 -> nilai akhir
lib/chartSetup.ts                  - registrasi Chart.js + tema warna +
                                    plugin custom `valueLabelPlugin` untuk
                                    label data langsung di bar/line (tanpa
                                    perlu chartjs-plugin-datalabels)
lib/format.ts                       - formatter angka gaya Indonesia (koma)
```

## Catatan Teknis Penting

1. **Font**: next/font/google TIDAK dipakai karena environment build ini
   tidak punya akses ke Google Fonts. Font memakai fallback stack aman
   (`Georgia`/serif untuk headline, `Inter`/system-ui untuk body). Untuk
   mendekatkan lagi ke desain asli, tinggal ganti `--font-serif` /
   `--font-sans` di `app/globals.css` dengan `next/font/google` (Playfair
   Display + Inter) ketika sudah online.
2. **`isolate` di ChapterSection**: setiap `<section>` memakai class
   Tailwind `isolate` (CSS `isolation: isolate`). Ini WAJIB ada — tanpa ini,
   background image dengan `-z-10` akan "lepas" ke stacking context root
   dan tertutup background solid section lain. Jika menambah chapter baru
   secara manual (bukan lewat `ChapterSection`), pastikan pola ini diikuti.
3. **Chart.js**: dipakai untuk semua chart data (bar/line/combo). Label
   nilai langsung digambar di atas bar/titik lewat plugin custom
   (`valueLabelPlugin`) di `lib/chartSetup.ts`, sesuai guideline "no
   gridline clutter, direct labeling".
4. **Peta (Chapter 06)**: menggunakan asset asli `public/assets/map/peta.webp`
   apa adanya (tidak digambar ulang). Efek glow di Morowali dihitung dari
   centroid area terang asli di gambar (~54.4%, 51.2%).

## Mengganti Asset

- Background foto: ganti file di `public/assets/backgrounds/bg-1.webp` s/d
  `bg-4.webp` (format WEBP, disarankan rasio 16:9).
- Peta: ganti `public/assets/map/peta.webp` (harus transparan, label sudah
  built-in di gambar).

## Menambah Chapter Baru

1. Duplikasi salah satu file di `chapters/ChapterXX.tsx` sebagai referensi.
2. Import komponen dari `@/components/ChapterChrome`, `@/components/GlassCard`,
   dll., lalu isi data langsung sebagai konstanta di file tersebut.
3. Bungkus dengan `<ChapterSection index={N} background="...">`.
4. Tambahkan `<ChapterXX />` ke `app/page.tsx` dan update
   `totalChapters` di `<StoryContainer totalChapters={...}>`.

## Tech Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger
· Chart.js + react-chartjs-2 · lucide-react
