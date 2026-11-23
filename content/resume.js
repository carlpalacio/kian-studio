/*
  RESUME (the "Experience" part of the About page)
  ──────
  The About page lists the work from content/projects.js under the role below.
    startYear  the year Onsite started, e.g. "2024". Shown as "<year> – Present" once set.
    past       earlier roles, newest first: { title, org, period, line }. Leave [] to show none.
    education  { title, org, period }. Leave [] to hide "Education".
    pdf        the downloadable resume. The "Download resume (PDF)" button shows only when pdfReady is true,
               so set it once the PDF has been rebuilt with real details.
*/
window.RESUME = {
  role: "Founder",
  org: "Onsite",
  startYear: "",
  line: "Designed and built every product below.",
  past: [],
  education: [],
  pdf: "assets/files/Carl-Palacio-Resume.pdf",
  pdfReady: false,
};
