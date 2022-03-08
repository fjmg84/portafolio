<script>
  let jobs = [
    {
      entity: "ACUBAMOS",
      post: "Programador",
      homeworks:
        "Diseñar con Material-UI y Materializecss web. Programar aplicaciones dirigidas al comercio electrónico. Creando APIs y Microservicios con     Nodejs. Interfaces de usuarios mediante React y Redux. Como base de datos MySQL, Postgresql y Redis.",
    },
    {
      entity: "EMCOMED",
      post: "Administrador de redes",
      homeworks:
        "Administración de servidores Linux y Windows. Trabajar con virtualización de servicios mediante VMware. Configuración de corta-fuegos. Trabajo en sistema de noticias utilizando scraping con Symfony3 y MYSQL para el análisis de datos. Trabaje en equipo para un sistema de ventas, donde se pueden observar datos y conocer la ubicación y el estado de un producto, todo en tiempo real, utilizando NodeJs como microservicio, React como frontend y MSSQL y MySQL como bd. También en equipo un sistema en Python ,SQLite y MSSQL que para la distribución de medicamentos para las instituciones de salud pública.",
    },
    {
      entity: "PRINCITY",
      post: "Diseñador Gráfico",
      homeworks:
        "Diseñar tarjetas de presentación, de bodas y fiestas. Además de postales y portadas. Diseño y maquetación web con herramientas como Photoshop y CorelDraw.",
    },
    {
      entity: "COPEXTEL",
      post: "Responsable de Seguridad Informática",
      homeworks:
        "Supervisión y mantenimiento de la seguridad en la red. Trabajo con herramientas como WireShar, Nmap, OSSIN y otros sistemas de scanner. Trabajo con servidores Linux y Windons. Configuracion de corta-fuegos. Evitar brechas de seguridad, posibles ataques y caídas de sistemas. Desarrollo de aplicaciones para el mejoramiento de sistemas de seguridad con PHP.",
    },
  ];
</script>

<article class="mb-5">
  <h1>Experiencia Laboral</h1>
  {#each jobs as job}
    <div class="mx-5 mb-5">
      <span class="font-bold uppercase">{job.entity}</span>
      <p>
        <span class="font-bold">Cargo:</span>
        <span class="italic font-light">{job.post}</span>
      </p>
      <p>
        <span class="font-bold">Tareas:</span>
        <span class="italic font-light">{job.homeworks}</span>
      </p>
    </div>
  {/each}
</article>
