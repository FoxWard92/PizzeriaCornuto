import fs from 'fs';
import path from 'path';

// ================= CONFIGURAZIONE PERCORSI =================
const BASE_DIR = process.cwd();
const INPUT_PATH = path.join(BASE_DIR, 'menu_extracted.json');
const OUTPUT_JSON_PATH = path.join(BASE_DIR, 'src/lib/menu_strutturato.json');
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
  const catLower = categoria.toLowerCase();
  
  if (catLower.includes('birre') || catLower.includes('birra')) return "🍺";
  if (catLower.includes('bevande') || catLower.includes('bibite')) return "🥤";
  if (catLower.includes('dolci')) return "🍰";
  if (catLower.includes('fritti')) return "🍟";
  
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
const prodottiRaggruppati = {};

Object.keys(dbProdotti).forEach(idProdotto => {
  const p = dbProdotti[idProdotto];
  
  const isAvailable = p.available ?? p.disponibile ?? true;
  if (!isAvailable) {
    return; 
  }

  // Prende la categoria originale pura dal database
  let nomeCategoria = mappaCategorie[p.idCategoria] || "Altro";
  let nomeProdotto = p.nome || p.name || "";
  let nomeProdottoLower = nomeProdotto.toLowerCase().replace(/\s+/g, ' ').trim();

  // ================= 1. FILTRI DI ESCLUSIONE MINIMI (Rimangono solo i residui storici del DB) =================
  const rimasugliDaEliminare = [
    "tropea", "bufala", "radicchio", "23 febbraio", "boscaiola", 
    "valtellina", "piemontese", "patatine fritte e wurstel", "patatine fritte e würstel"
  ];
  if (rimasugliDaEliminare.includes(nomeProdottoLower)) {
    return; 
  }
  if (nomeProdottoLower.includes('estathe')) {
    return;
  }

  // ================= 2. ESTRAZIONE DINAMICA DEL FORMATO (33cl, 66cl, 1.5l, ecc.) =================
  let formatoRilevato = null;
  const regexFormato = /(33\s*cl|66\s*cl|1\s*[,.]\s*5\s*l|1\s*5\s*l|33\s*l|66\s*l)/i;
  const matchFormato = nomeProdotto.match(regexFormato);
  
  if (matchFormato) {
    formatoRilevato = matchFormato[0].toLowerCase().replace(/\s+/g, '').replace(',', '.');
    nomeProdotto = nomeProdotto.replace(regexFormato, '').replace(/\s+/g, ' ').trim();
    nomeProdottoLower = nomeProdotto.toLowerCase();
  }

  // Chiave basata su Categoria Originale + Nome Pulito per evitare duplicati e raggruppare i formati
  const chiaveRaggruppamento = `${nomeCategoria.toUpperCase()}__${nomeProdottoLower.replace(/[\s-]/g, '')}`;

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

  if (!prodottiRaggruppati[chiaveRaggruppamento]) {
    prodottiRaggruppati[chiaveRaggruppamento] = {
      id: idProdotto,
      nomeBase: nomeProdotto,
      nomeCategoria: nomeCategoria,
      prezzoBase: Number(p.prezzo),
      descrizione: p.description || "...",
      vegetariano: p.vegetariano || false,
      piccante: p.piccante > 0,
      surgelato: p.surgelato || false,
      ingredienti_extra: extraDisponibili,
      formatiRilevati: formatoRilevato ? [formatoRilevato] : []
    };
  } else {
    if (formatoRilevato && !prodottiRaggruppati[chiaveRaggruppamento].formatiRilevati.includes(formatoRilevato)) {
      prodottiRaggruppati[chiaveRaggruppamento].formatiRilevati.push(formatoRilevato);
    }
  }
});

// =================================================================================
// ================= GENERAZIONE DELLE STRUTTURE FINALI IN JSON E JS ===============
// =================================================================================

Object.keys(prodottiRaggruppati).forEach(chiave => {
  const item = prodottiRaggruppati[chiave];

  let nomeFinale = item.nomeBase;
  if (item.formatiRilevati.length > 0) {
    const formatiString = item.formatiRilevati.sort().join('/');
    nomeFinale = `${item.nomeBase} ${formatiString}`;
  }

  // ---------------- STRUTTURA JSON ----------------
  if (!menuStrutturatoJSON[item.nomeCategoria]) {
    menuStrutturatoJSON[item.nomeCategoria] = [];
  }

  menuStrutturatoJSON[item.nomeCategoria].push({
    id: item.id,
    nome: nomeFinale,
    prezzo: item.prezzoBase,
    descrizione: item.descrizione,
    disponibile: true,
    caratteristiche: { vegetariano: item.vegetariano, piccante: item.piccante, surgelato: item.surgelato },
    ingredienti_extra: item.ingredienti_extra
  });

  // ---------------- STRUTTURA JAVASCRIPT (SVELTEKIT) ----------------
  const chiaveVariabile = trasformaInSlug(item.nomeCategoria).replace(/-/g, '_');

  if (!categorieFinaliJS[chiaveVariabile]) {
    categorieFinaliJS[chiaveVariabile] = { nomeReale: item.nomeCategoria, products: [] };
  }

  const prezzoFormattato = item.prezzoBase.toFixed(2).replace('.', ',');
  const slugImmagine = trasformaInSlug(item.nomeBase); 
  const descrizionePulita = item.descrizione.replace(/"/g, '\\"');

  categorieFinaliJS[chiaveVariabile].products.push({
    icon: selezionaIcona(nomeFinale, item.descrizione, item.nomeCategoria),
    name: nomeFinale,
    description: descrizionePulita,
    price: prezzoFormattato,
    thumbSlug: slugImmagine
  });
});

fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(menuStrutturatoJSON, null, 2), 'utf8');

let outputContenutoJS = `import { base } from '$app/paths';\n\n// File generato - Struttura speculare al DB con formati unificati\n`;
Object.keys(categorieFinaliJS).forEach(chiave => {
  const cat = categorieFinaliJS[chiave];
  outputContenutoJS += `\n// --- Categoria: ${cat.nomeReale.toUpperCase()} ---\nexport const ${chiave} = [\n`;
  cat.products.forEach((prod, index) => {
    outputContenutoJS += `  {\n    "icon": "${prod.icon}",\n    "name": "${prod.name}",\n    "description": "${prod.description}",\n    "price": "${prod.price}",\n    "thumb": \`\${base}/asset/pizze/${prod.thumbSlug}.jpeg\`\n  }${index < cat.products.length - 1 ? ',' : ''}\n`;
  });
  outputContenutoJS += `];\n`;
});

fs.writeFileSync(OUTPUT_JS_PATH, outputContenutoJS, 'utf8');

console.log(`\n✨ Elaborazione completata! Menu generato rispettando le categorie del DB.`);