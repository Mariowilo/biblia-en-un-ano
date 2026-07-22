/* ============================================================
   Ad Fontes Project — Planes de lectura
   El plan cronológico (365 días) vive en plan.js como PLAN.
   Aquí se generan los planes adicionales y el registro común.
   ============================================================ */

const CAPS = {
  'Génesis':50,'Éxodo':40,'Levítico':27,'Números':36,'Deuteronomio':34,'Josué':24,'Jueces':21,'Rut':4,
  '1 Samuel':31,'2 Samuel':24,'1 Reyes':22,'2 Reyes':25,'1 Crónicas':29,'2 Crónicas':36,'Esdras':10,
  'Nehemías':13,'Ester':10,'Job':42,'Salmos':150,'Proverbios':31,'Eclesiastés':12,'Cantares':8,
  'Isaías':66,'Jeremías':52,'Lamentaciones':5,'Ezequiel':48,'Daniel':12,'Oseas':14,'Joel':3,'Amós':9,
  'Abdías':1,'Jonás':4,'Miqueas':7,'Nahúm':3,'Habacuc':3,'Sofonías':3,'Hageo':2,'Zacarías':14,'Malaquías':4,
  'Mateo':28,'Marcos':16,'Lucas':24,'Juan':21,'Hechos':28,'Romanos':16,'1 Corintios':16,'2 Corintios':13,
  'Gálatas':6,'Efesios':6,'Filipenses':4,'Colosenses':4,'1 Tesalonicenses':5,'2 Tesalonicenses':3,
  '1 Timoteo':6,'2 Timoteo':4,'Tito':3,'Filemón':1,'Hebreos':13,'Santiago':5,'1 Pedro':5,'2 Pedro':3,
  '1 Juan':5,'2 Juan':1,'3 Juan':1,'Judas':1,'Apocalipsis':22
};

/* Etapas por libro — dan sentido narrativo a cada día */
const ETAPA_LIBRO = {
  'Génesis':'Los orígenes y los patriarcas','Éxodo':'Redención y pacto en el Sinaí',
  'Levítico':'La santidad y el sacrificio','Números':'El desierto y la prueba',
  'Deuteronomio':'La renovación del pacto','Josué':'La conquista de la tierra','Jueces':'Cuando no había rey',
  'Rut':'Cuando no había rey','1 Samuel':'El reino se levanta','2 Samuel':'El pacto con David',
  '1 Reyes':'Gloria y división del reino','2 Reyes':'El juicio y el exilio',
  '1 Crónicas':'La historia vista desde el templo','2 Crónicas':'La historia vista desde el templo',
  'Esdras':'El regreso del exilio','Nehemías':'El regreso del exilio','Ester':'La providencia escondida',
  'Job':'Sabiduría en el sufrimiento','Salmos':'El corazón orando la Escritura','Proverbios':'La sabiduría que teme a Dios',
  'Eclesiastés':'La vanidad bajo el sol','Cantares':'El amor del pacto',
  'Isaías':'El Siervo y el consuelo','Jeremías':'El nuevo pacto anunciado','Lamentaciones':'El llanto sobre Sion',
  'Ezequiel':'La gloria que vuelve','Daniel':'El reino que no será destruido',
  'Oseas':'Los profetas menores','Joel':'Los profetas menores','Amós':'Los profetas menores',
  'Abdías':'Los profetas menores','Jonás':'Los profetas menores','Miqueas':'Los profetas menores',
  'Nahúm':'Los profetas menores','Habacuc':'Los profetas menores','Sofonías':'Los profetas menores',
  'Hageo':'Los profetas menores','Zacarías':'Los profetas menores','Malaquías':'Los profetas menores',
  'Mateo':'El Rey prometido','Marcos':'El Siervo que sirve','Lucas':'El Hijo del Hombre',
  'Juan':'El Verbo hecho carne','Hechos':'La iglesia y el Espíritu',
  'Romanos':'El evangelio explicado','1 Corintios':'Cartas a las iglesias','2 Corintios':'Cartas a las iglesias',
  'Gálatas':'Cartas a las iglesias','Efesios':'Cartas de la prisión','Filipenses':'Cartas de la prisión',
  'Colosenses':'Cartas de la prisión','1 Tesalonicenses':'Cartas a las iglesias','2 Tesalonicenses':'Cartas a las iglesias',
  '1 Timoteo':'Cartas pastorales','2 Timoteo':'Cartas pastorales','Tito':'Cartas pastorales','Filemón':'Cartas de la prisión',
  'Hebreos':'El mejor pacto','Santiago':'Cartas generales','1 Pedro':'Cartas generales','2 Pedro':'Cartas generales',
  '1 Juan':'Cartas generales','2 Juan':'Cartas generales','3 Juan':'Cartas generales','Judas':'Cartas generales',
  'Apocalipsis':'La consumación'
};

/* Reparte una lista de libros en N días, agrupando capítulos consecutivos */
function repartir(libros, dias){
  const uni = [];
  libros.forEach(b => { for(let c = 1; c <= CAPS[b]; c++) uni.push([b, c]); });
  const total = uni.length, out = [];
  let i = 0;
  for(let d = 1; d <= dias; d++){
    const fin = Math.round(total * d / dias);
    const bloque = uni.slice(i, fin);
    i = fin;
    /* agrupar por libro y comprimir rangos */
    const lect = [];
    bloque.forEach(([b, c]) => {
      const u = lect[lect.length - 1];
      if(u && u.b === b && u.f === c - 1) u.f = c;
      else lect.push({ b: b, i: c, f: c });
    });
    out.push({
      d: d,
      etapa: ETAPA_LIBRO[bloque.length ? bloque[0][0] : 'Génesis'] || '',
      lecturas: lect.map(x => x.b + ' ' + (x.i === x.f ? x.i : x.i + '-' + x.f))
    });
  }
  return out;
}

const AT = ['Génesis','Éxodo','Levítico','Números','Deuteronomio','Josué','Jueces','Rut','1 Samuel','2 Samuel','1 Reyes','2 Reyes','1 Crónicas','2 Crónicas','Esdras','Nehemías','Ester','Job','Salmos','Proverbios','Eclesiastés','Cantares','Isaías','Jeremías','Lamentaciones','Ezequiel','Daniel','Oseas','Joel','Amós','Abdías','Jonás','Miqueas','Nahúm','Habacuc','Sofonías','Hageo','Zacarías','Malaquías'];
const NT = ['Mateo','Marcos','Lucas','Juan','Hechos','Romanos','1 Corintios','2 Corintios','Gálatas','Efesios','Filipenses','Colosenses','1 Tesalonicenses','2 Tesalonicenses','1 Timoteo','2 Timoteo','Tito','Filemón','Hebreos','Santiago','1 Pedro','2 Pedro','1 Juan','2 Juan','3 Juan','Judas','Apocalipsis'];

/* Salmos y Proverbios — un salmo al día, un proverbio que rota cada mes */
function planSalPro(){
  const out = [];
  for(let d = 1; d <= 150; d++){
    out.push({
      d: d,
      etapa: 'Oración y sabiduría',
      lecturas: ['Salmos ' + d, 'Proverbios ' + (((d - 1) % 31) + 1)]
    });
  }
  return out;
}

/* Registro de planes. El cronológico usa PLAN (plan.js) y las claves
   originales de almacenamiento, para no perder el progreso de nadie. */
const PLANES = [
  {
    id: 'cronologico',
    nombre: 'Cronológico',
    sub: 'Toda la Biblia en 365 días',
    desc: 'La Escritura en el orden en que ocurrieron los hechos: Job entre los patriarcas, los salmos junto a la vida de David, los profetas dentro de la historia de los reyes. Incluye el estudio diario completo.',
    dias: 365,
    estudio: true,
    principal: true,
    dias_arr: null   /* se llena con PLAN al arrancar */
  },
  {
    id: 'canonico',
    nombre: 'Canónico',
    sub: 'Génesis a Apocalipsis en 365 días',
    desc: 'El orden tradicional de los libros, de principio a fin, sin saltar entre ellos. Unos tres capítulos y medio al día.',
    dias: 365,
    estudio: false,
    gen: () => repartir(AT.concat(NT), 365)
  },
  {
    id: 'nt90',
    nombre: 'Nuevo Testamento',
    sub: 'Mateo a Apocalipsis en 90 días',
    desc: 'Todo el Nuevo Testamento en tres meses, cerca de tres capítulos diarios. Un buen primer plan, y un buen plan para volver a empezar.',
    dias: 90,
    estudio: false,
    gen: () => repartir(NT, 90)
  },
  {
    id: 'salpro',
    nombre: 'Salmos y Proverbios',
    sub: 'Un salmo y un proverbio · 150 días',
    desc: 'Un salmo cada día en orden, y un capítulo de Proverbios que rota cada mes. Pensado para acompañar otro plan, no para reemplazarlo.',
    dias: 150,
    estudio: false,
    gen: planSalPro
  }
];

const PLANES_IDX = {};
PLANES.forEach(p => PLANES_IDX[p.id] = p);

/* Devuelve el arreglo de días de un plan, generándolo la primera vez */
function diasDe(id){
  const p = PLANES_IDX[id] || PLANES_IDX['cronologico'];
  if(!p.dias_arr) p.dias_arr = p.gen ? p.gen() : (typeof PLAN !== 'undefined' ? PLAN : []);
  return p.dias_arr;
}

/* Claves de almacenamiento — el cronológico conserva las originales */
function claveP(id, k){
  return id === 'cronologico' ? 'biblia365_' + k : 'af_' + id + '_' + k;
}
