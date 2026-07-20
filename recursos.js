/* Capa curada de videos · Ad Fontes
   Los videos aparecen SOLOS en el sitio (videos.js se actualiza cada día desde YouTube).
   Aquí solo añades lo que YouTube no sabe: tu texto explicativo propio y los pasajes que trata.

   Para enriquecer un video: copia el ID de su enlace de YouTube
   (https://www.youtube.com/watch?v=ESTE_ES_EL_ID) y añade una entrada:

   'ESTE_ES_EL_ID': {
     serie: 'Los pactos',
     texto: 'Un párrafo o varios explicando de qué trata el video, qué preguntas responde…',
     pasajes: ['Génesis 15','Jeremías 31:31-34','Hebreos 8:6-13']
   },

   · serie   → agrupa el video en la página de Videos (opcional)
   · texto   → se muestra al tocar la tarjeta, antes de ir a YouTube (opcional)
   · pasajes → hace que el video aparezca en esos pasajes dentro de la Biblia (opcional) */
const CURADOS = {
  /* Ejemplo (borra estas líneas cuando publiques el primero):
  'dQw4w9WgXcQ': {
    serie: 'Los pactos',
    texto: 'Los pactos son la columna vertebral de la Escritura. En este video recorremos a Adán, Noé, Abraham, Moisés, David y el Nuevo Pacto para ver una sola historia de redención.',
    pasajes: ['Génesis 15','Jeremías 31:31-34','Hebreos 8:6-13']
  },
  */
};

/* Series del canal — dan orden a la página de Videos */
const SERIES = [
  { t: 'Los pactos', d: 'Adán, Noé, Abraham, Moisés, David y el Nuevo Pacto: una sola historia de redención.' },
  { t: 'Cómo leer la Biblia', d: 'Género, contexto, gramática e historia: herramientas para leer bien cada libro.' },
  { t: 'Tipología', d: 'Sombras y sustancia: cómo el Antiguo Testamento anuncia a Cristo sin alegorizar.' },
  { t: 'La ley y el evangelio', d: 'Distinguir sin separar: el uso de la ley para el cristiano.' },
  { t: 'Las confesiones', d: 'Por qué la Iglesia escribió confesiones y cómo usarlas hoy.' }
];

/* Compatibilidad con la Biblia: lista de videos con pasajes asignados */
const RECURSOS = Object.keys(CURADOS).filter(k => (CURADOS[k].pasajes || []).length).map(k => ({
  yt: k,
  titulo: (typeof VIDEOS !== 'undefined' && (VIDEOS.find(v => v.yt === k) || {}).titulo) || CURADOS[k].serie || 'Video',
  desc: (CURADOS[k].texto || '').slice(0, 140),
  pasajes: CURADOS[k].pasajes
}));
