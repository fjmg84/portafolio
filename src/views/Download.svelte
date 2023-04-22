<script>
  import PdfViewer from "svelte-pdf";
  import { Link } from "svelte-routing";
</script>

<article class="md-5">
  <div class="rounded shadow-xl px-6 py-8">
    <div class="container mx-auto mb-5 grid grid-cols-2">
      <div class="grid">
        <h1>Descarga de PDF</h1>
      </div>
      <div class="grid text-right justify-end">
        <div>
          <Link
            to="/"
            class="py-2 px-4 italic text-sm font-extralight text-white bg-purple-900 rounded-lg shadow-md hover:shadow-indigo-500/50"
            >Regresar</Link
          >
        </div>
      </div>
    </div>

    <PdfViewer url="./pdf/cv_black.pdf" scale="1.4" showBorder="false" />
  </div>
</article>
