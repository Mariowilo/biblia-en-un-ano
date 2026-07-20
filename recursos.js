/* Recursos de Ad Fontes ligados a pasajes.
   Para añadir un video: copia una línea, pon el ID de YouTube y los pasajes que trata.
   tipo: 'video' | 'articulo' | 'serie'
   pasajes: referencias sueltas ('Romanos 8:29') o capítulos enteros ('Romanos 8') */
const RECURSOS = [
  /* Ejemplo de cómo se ve una entrada (descomenta y edita cuando publiques el primero):
  { tipo:'video', yt:'AbCdEfGhIjK', titulo:'¿Qué es un pacto?', dur:'6 min',
    desc:'Los pactos como columna vertebral de la Escritura: Adán, Noé, Abraham, Moisés, David y el Nuevo Pacto.',
    pasajes:['Génesis 15','Jeremías 31:31-34','Hebreos 8:6-13','Lucas 22:20'] },
  */
];

/* Series planeadas — se muestran en la Biblioteca como "en preparación" */
const SERIES = [
  { t: 'Los pactos', d: 'Adán, Noé, Abraham, Moisés, David y el Nuevo Pacto: una sola historia de redención.' },
  { t: 'Cómo leer la Biblia', d: 'Género, contexto, gramática e historia: herramientas para leer bien cada libro.' },
  { t: 'Tipología', d: 'Sombras y sustancia: cómo el Antiguo Testamento anuncia a Cristo sin alegorizar.' },
  { t: 'La ley y el evangelio', d: 'Distinguir sin separar: el uso de la ley para el cristiano.' },
  { t: 'Las confesiones', d: 'Por qué la Iglesia escribió confesiones y cómo usarlas hoy.' }
];
