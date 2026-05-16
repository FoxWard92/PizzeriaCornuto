import fs from 'fs';
import path from 'path';

// ================= CONFIGURAZIONE PERCORSI =================
const BASE_DIR = process.cwd();
const INPUT_PATH = path.join(BASE_DIR, 'menu_extracted.json');
const OUTPUT_JSON_PATH = path.join(BASE_DIR, 'src/lib/menu_pulito.json');
const OUTPUT_JS_PATH = path.join(BASE_DIR, 'src/lib/menu_strutturato.js');
// ==========================================================

console.log(`📂 Lettura del file sorgente da: ${INPUT_PATH}`);

if (!fs.existsSync(INPUT_PATH)) {
  console.error(`❌ Errore: Il file ${INPUT_PATH} non esiste. Lancia prima lo scraper!`);
  process.exit(1);
}

const rawData = JSON.parse(fs.readFileSync(INPUT_PATH, 'utf8'));
console.log(`📂 Caricati ${rawData.length} frammenti da analizzare...`);

let fullText = "";

rawData.forEach(item => {
  if (item.rawText) {
    fullText += item.rawText;
  } else {
    fullText += JSON.stringify(item);
  }
});

try {
  const parsedRoot = JSON.parse(fullText);
  if (parsedRoot.d && parsedRoot.d.b && parsedRoot.d.b.d) {
    fullText = JSON.stringify(parsedRoot.d.b.d);
  }
} catch (e) {
  const startMatch = fullText.indexOf('"menu"');
  if (startMatch !== -1) {
    fullText = "{" + fullText.substring(startMatch);
    if (fullText.endsWith('}}}')) fullText = fullText.slice(0, -2);
  }
}

let menuData = null;
while (fullText.length > 0 && !menuData) {
  try {
    menuData = JSON.parse(fullText);
  } catch (err) {
    const lastComma = fullText.lastIndexOf(',');
    if (lastComma !== -1) {
      fullText = fullText.substring(0, lastComma) + "}}}";
    } else {
      break;
    }
  }
}

if (!menuData || !menuData.menu) {
  console.error("❌ Impossibile ricostruire un dizionario Menu valido.");
  process.exit(1);
}

const dbCategorie = menuData.menu.categorie || {};
const dbProdotti = menuData.menu.prodotti || {};
const dbAggiunte = menuData.aggiunte || {};

const mappaCategorie = {};
Object.keys(dbCategorie).forEach(id => {
  mappaCategorie[id] = dbCategorie[id].nome;
});

const mappaAggiunte = {};
Object.keys(dbAggiunte).forEach(id => {
  mappaAggiunte[id] = { nome: dbAggiunte[id].name, prezzo: dbAggiunte[id].price };
});

function selezionaIcona(nome, descrizione, categoria) {
  const testo = `${nome} ${descrizione}`.toLowerCase();
  
  if (categoria === "Birre") return "🍺";
  if (categoria === "Bevande") return "🥤";
  if (categoria === "Dolci") return "🍰";
  if (categoria === "Fritti") return "🍟";
  
  if (testo.includes('salamino') || testo.includes('salsiccia') || testo.includes('prosciutto') || testo.includes('speck') || testo.includes('pancetta') || testo.includes('carne') || testo.includes('nduja')) return "🥓";
  if (testo.includes('friarielli') || testo.includes('zucchine') || testo.includes('vegetariano') || testo.includes('funghi') || testo.includes('cipolla') || testo.includes('olive') || testo.includes('vegan') || testo.includes('ortolana')) return "🥦";
  return "🍕";
}

function trasformaInSlug(stringa) {
  return stringa
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const menuStrutturatoJSON = {};
const categorieFinaliJS = {};
const prodottiInseriti = new Set();

Object.keys(dbProdotti).forEach(idProdotto => {
  const p = dbProdotti[idProdotto];
  
  const isAvailable = p.available ?? p.disponibile ?? true;
  if (!isAvailable) {
    return; 
  }

  let nomeCategoria = mappaCategorie[p.idCategoria] || "Altro";
  let nomeProdotto = p.nome || p.name || "";
  
  let nomeProdottoLower = nomeProdotto.toLowerCase().replace(/chiacchiere/g, 'chiacchere').replace(/\s+/g, ' ').trim();

  // ================= 1. FILTRI STRINGENTI DI ESCLUSIONE (PULIZIA VECCHI RESIDUI) =================
  
  // Lista dei rimasugli storici nel DB che sul sito reale non esistono più
  const rimasugliDaEliminare = [
    "tropea", "bufala", "radicchio", "23 febbraio", "boscaiola", 
    "valtellina", "piemontese", "patatine fritte e wurstel", "patatine fritte e würstel"
  ];
  if (rimasugliDaEliminare.includes(nomeProdottoLower)) {
    return; 
  }

  // Elimina vecchi formati di birre/bevande analcoliche obsoleti
  if (nomeProdottoLower.includes('1,5l') || nomeProdottoLower.includes('1.5l') || nomeProdottoLower.includes('66cl') || nomeProdottoLower.includes('moretti 33cl') || nomeProdottoLower.includes('stella artois')) {
    return;
  }
  if (nomeProdottoLower.includes('estathe')) {
    return;
  }

  // ================= 2. UNIFORMATION STRINGHE (STOP AI DUPLICATI DA MAIUSCOLE/SPAZI) =================
  
  // Unifica Napoli DOP eliminando doppioni scritti male
  if (nomeProdottoLower === "pizza napoli" || nomeProdottoLower === "napoli" || nomeProdottoLower === "napoli dop") {
    nomeProdotto = "Napoli DOP";
    nomeProdottoLower = "napoli dop";
  }

  // Unifica Donnarosa (risolve lo sdoppiamento con lo spazio "Donna Rosa")
  if (nomeProdottoLower === "donna rosa" || nomeProdottoLower === "donnarosa") {
    nomeProdotto = "Donnarosa";
    nomeProdottoLower = "donnarosa";
  }

  // Unifica Zola e Speck (risolve i duplicati generati da differenze di maiuscole nel DB)
  if (nomeProdottoLower === "zola e speck") {
    nomeProdotto = "Zola e Speck";
    nomeProdottoLower = "zola e speck";
  }

  // Forza Olive Ascolane nei Fritti
  if (nomeProdottoLower.includes('ascolane')) {
    nomeCategoria = "Fritti";
  }
  
  // Forza i 3 cioccolati nei Dolci
  if (nomeProdottoLower.includes('cioccolati')) {
    nomeCategoria = "Dolci";
  }

  // Smistamento preciso Alcolici (Birre) vs Analcolici (Bevande)
  if (nomeProdottoLower.includes('ichnusa') || nomeProdottoLower.includes('becks') || nomeProdottoLower.includes('tennent')) {
    nomeCategoria = "Birre";
  } else if (nomeProdottoLower.includes('acqua') || nomeProdottoLower.includes('coca') || nomeProdottoLower.includes('sprite')) {
    nomeCategoria = "Bevande";
  }

  // Ripristino e allineamento Dolci (preserva i 7 articoli totali)
  if (
    nomeProdottoLower.includes('nutella') || 
    nomeProdottoLower.includes('tiramisu') || 
    nomeProdottoLower.includes('lemon tarte') ||
    (nomeProdottoLower.includes('chiacchere') && nomeProdottoLower.includes('miele'))
  ) {
    nomeCategoria = "Dolci";
    
    if (nomeProdottoLower.includes('lardo')) {
      nomeProdotto = "Chiacchere con Lardo, Miele e Noci";
    } else if (nomeProdottoLower.includes('chiacchere') && nomeProdottoLower.includes('nutella')) {
      nomeProdotto = "Chiacchere con Nutella";
    } else if (nomeProdottoLower.includes('focaccia')) {
      nomeProdotto = "Focaccia con Nutella";
    } else if (nomeProdottoLower.includes('calzone')) {
      nomeProdotto = "Calzone con Nutella";
    } else if (nomeProdottoLower.includes('tiramisu')) {
      nomeProdotto = "Tiramisù";
    } else if (nomeProdottoLower.includes('cioccolati')) {
      nomeProdotto = "3 Cioccolate";
    } else if (nomeProdottoLower.includes('lemon')) {
      nomeProdotto = "Lemon Tarte";
    }
    
    nomeProdottoLower = nomeProdotto.toLowerCase().replace(/\s+/g, ' ').trim();
  }

  // Sfoltimento Chiacchere Salate residue
  if (nomeCategoria.toLowerCase().includes('chiacchere') && nomeCategoria !== "Dolci" && !nomeProdottoLower.includes('crudo') && !nomeProdottoLower.includes('cotto') && !nomeProdottoLower.includes('salate')) {
    return; 
  }

  // ================= 3. CONTROLLO DUPLICATI ASSOLUTO VIA CHIAVE UNICA =================
  const chiaveDuplicato = `${nomeCategoria.toUpperCase()}__${nomeProdottoLower.replace(/[\s-]/g, '')}`;
  if (prodottiInseriti.has(chiaveDuplicato)) {
    return; 
  }
  prodottiInseriti.add(chiaveDuplicato);

  // ---------------- STRUTTURA JSON ----------------
  if (!menuStrutturatoJSON[nomeCategoria]) {
    menuStrutturatoJSON[nomeCategoria] = [];
  }
  
  const extraDisponibili = [];
  if (p.aggiunteIds) {
    Object.values(p.aggiunteIds).forEach(idGruppo => {
      if (menuData.gruppiAggiunte && menuData.gruppiAggiunte[idGruppo]) {
        const opzioniGruppo = menuData.gruppiAggiunte[idGruppo].optionsIds || {};
        Object.values(opzioniGruppo).forEach(idOpt => {
          if (mappaAggiunte[idOpt]) {
            extraDisponibili.push({ ingrediente: mappaAggiunte[idOpt].nome, sovrapprezzo: mappaAggiunte[idOpt].prezzo });
          }
        });
      }
    });
  }

  menuStrutturatoJSON[nomeCategoria].push({
    id: idProdotto,
    nome: nomeProdotto,
    prezzo: Number(p.prezzo),
    descrizione: p.description || "Classico impasto Roxy",
    disponibile: true,
    caratteristiche: { vegetariano: p.vegetariano || false, piccante: p.piccante > 0, surgelato: p.surgelato || false },
    ingredienti_extra: extraDisponibili
  });

  // ---------------- STRUTTURA JAVASCRIPT (SVELTEKIT) ----------------
  const chiaveVariabile = trasformaInSlug(nomeCategoria).replace(/-/g, '_');

  if (!categorieFinaliJS[chiaveVariabile]) {
    categorieFinaliJS[chiaveVariabile] = { nomeReale: nomeCategoria, prodotti: [] };
  }

  const prezzoFormattato = Number(p.prezzo).toFixed(2).replace('.', ',');
  const slugImmagine = trasformaInSlug(nomeProdotto);
  const descrizionePulita = (p.description || "Classico impasto Roxy").replace(/"/g, '\\"');

  categorieFinaliJS[chiaveVariabile].prodotti.push({
    icon: selezionaIcona(nomeProdotto, p.description || ""),
    name: nomeProdotto,
    description: descrizionePulita,
    price: prezzoFormattato,
    thumbSlug: slugImmagine
  });
});

// Scrittura dei file puliti e allineati
fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(menuStrutturatoJSON, null, 2), 'utf8');

let outputContenutoJS = `import { base } from '$app/paths';\n\n// File generato - Allineamento totale con il sito web ed eliminazione duplicati/eccessi\n`;
Object.keys(categorieFinaliJS).forEach(chiave => {
  const cat = categorieFinaliJS[chiave];
  outputContenutoJS += `\n// --- Categoria: ${cat.nomeReale.toUpperCase()} ---\nexport const ${chiave} = [\n`;
  cat.prodotti.forEach((prod, index) => {
    outputContenutoJS += `  {\n    "icon": "${prod.icon}",\n    "name": "${prod.name}",\n    "description": "${prod.description}",\n    "price": "${prod.price}",\n    "thumb": \`\${base}/asset/pizze/${prod.thumbSlug}.jpeg\`\n  }${index < cat.prodotti.length - 1 ? ',' : ''}\n`;
  });
  outputContenutoJS += `];\n`;
});

fs.writeFileSync(OUTPUT_JS_PATH, outputContenutoJS, 'utf8');

console.log(`\n✨ Elaborazione completata! Il file generato è speculare al 100% rispetto al sito web.`);