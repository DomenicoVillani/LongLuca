<script setup>
// Array di curiosità e origini
const curiosita = [
  "Le prime testimonianze di cocktails risalgono al 1800.",
  "Nonostante il nome, non contiene tè: Il sapore che ricorda il tè freddo è dato dalla combinazione della cola e del succo di limone, non da un vero infuso di tè.",
  "Il cocktail più costoso mai venduto è stato battuto all'asta per 10.000 dollari.",
  "Esistono numerose varianti, come il Long Beach Iced Tea, che sostituisce la cola con il succo di mirtillo, e il Tokyo Iced Tea, che utilizza Midori, un liquore al melone, al posto del Triple Sec e aggiunge soda limonata.",
  "Si racconta che un gruppo di persone, durante una serata, bevve così tanti Long Island Iced Tea da dover essere accompagnati a casa dal personale del bar, poiché l'effetto del cocktail fu molto più forte di quanto si aspettassero. Da allora, alcuni bar hanno iniziato a limitare il numero di Long Island che una persona può ordinare in una singola serata.",
  "Negli anni '90, il Long Island Iced Tea divenne un simbolo di nottate fuori controllo. In particolare, durante gli spring break americani, il cocktail era il protagonista di feste esagerate.",
  "In alcune località turistiche famose per i party, come Cancun o Miami Beach, molti locali offrivano giganti Long Island serviti in bicchieri da mezzo litro, esagerando volutamente con le dosi alcoliche per attirare i turisti.",
  "Negli anni '80, una famosa battuta venne fatta da un politico statunitense che, durante una raccolta fondi, scherzò sul fatto che solo con un paio di Long Island Iced Tea si può pensare di cambiare il mondo. La frase divenne virale tra i giovani attivisti dell'epoca, rendendo il cocktail simbolo di un momento di leggerezza anche nel contesto politico.",
  "Alcuni bar nei pressi di campus universitari americani hanno vietato la vendita del Long Island Iced Tea per il suo elevato contenuto alcolico.",
  "Nel 2016, in un bar di Las Vegas, è stato lanciato un evento speciale chiamato Long Island Iced Tea Challenge. I clienti dovevano bere una versione da 2 litri del cocktail in meno di un'ora. Il vincitore riceveva una serie di premi e la gloria di aver superato una delle sfide alcoliche più famose della città.",
  "Nel 2011, a Panama City Beach, in Florida, è stato battuto il record per la preparazione del Long Island Iced Tea più grande del mondo. Utilizzando 166 bottiglie di liquori, la bevanda fu servita in un bicchiere gigantesco da oltre 8.000 litri. L'evento attirò una grande folla e fu riconosciuto ufficialmente dal Guinness World Records.",
  "Il Long Island Iced Tea ha influenzato la creazione di altri cocktail forti come l'Adios Motherf*er (AMF)**, una versione che sostituisce la cola con una miscela di energy drink e curaçao blu, dando al cocktail un colore brillante. Questo drink è altrettanto potente e ha guadagnato popolarità nelle discoteche per il suo colore appariscente e il suo impatto immediato.",
  "Esiste un concorso annuale a Long Island, New York, in cui i migliori barman della zona competono per preparare il miglior Long Island Iced Tea. Il concorso, che attira partecipanti da tutto il mondo, valuta non solo il sapore e l'equilibrio del cocktail, ma anche l'abilità nel prepararlo in modo creativo."
];

const origini = [
  "Origine incerta: Esistono diverse teorie sull'origine del Long Island Iced Tea. Una delle più comuni racconta che il cocktail fu creato negli anni '70 da un barman di Long Island, New York, chiamato Robert Rosebud Butt, durante una gara di mixology per inventare un nuovo cocktail con Triple Sec.",
  "Alcuni credono che il cocktail sia nato durante il Proibizionismo.",
  "Un'altra versione attribuisce l'invenzione al Proibizionismo negli Stati Uniti (1920-1933), periodo in cui si cercava di mascherare l'alcol per evitare che fosse scoperto dalle autorità. In questa versione, il cocktail sarebbe nato nella cittadina di Long Island, nel Tennessee.",
  "Secondo la leggenda, Old Man Bishop creò una versione primitiva del Long Island negli anni '20, che fu poi perfezionata da suo figlio.",
  "Il Long Island Iced Tea divenne popolare negli anni '70 per il suo gusto piacevole e l'elevata gradazione alcolica.",
  "Alcuni bar della East Coast americana affermano che la versione originale del Long Island Iced Tea fosse meno dolce e più forte, per attrarre i marinai e lavoratori della zona portuale.",
  "Alcuni raccontano che il Long Island Iced Tea fosse una ricetta segreta tramandata in una famiglia di Long Island, New York, e solo negli anni '70 venne resa pubblica da un barman.",
  "Si narra che durante il Proibizionismo, il Long Island fosse popolare tra i gangster.",
  "Una leggenda dice che il Long Island nacque per caso, quando un cuoco in un ristorante mescolò vari alcolici avanzati in un bicchiere e aggiunse cola per migliorarne il sapore.",
  "Alcuni sostengono che il Long Island Iced Tea sia stato ispirato da una versione texana chiamata Texas Tea, che conteneva tequila e altre bevande simili.",
  "Una storia dice che il cocktail fu inventato come uno scherzo tra barman, sfidandosi a creare un drink con il maggior numero possibile di alcolici diversi e sorprendentemente buon sapore."
];

const randomCuriosita = () => curiosita[Math.floor(Math.random() * curiosita.length)];
const randomOrigini = () => origini[Math.floor(Math.random() * origini.length)];

// Frasi reattive
const curiositaFrase = ref(randomCuriosita());
const originiFrase = ref(randomOrigini());

// Funzione per aggiornare le frasi
const aggiornaFrasi = () => {
  curiositaFrase.value = randomCuriosita();
  originiFrase.value = randomOrigini();
};
</script>

<template>
  <div class="md:flex justify-content-evenly mt-5">
      <div class="fake-card">
        <h2 class="text-viola">Origine</h2>
        <div class="card-content">
            <p>{{ originiFrase }}</p>
        </div>
      </div>
    
      <div class="fake-card">
        <h2 class="text-viola">Curiosità dal mondo</h2>
        <div class="card-content">
          <p>{{ curiositaFrase }}</p>
        </div>
      </div>
  </div>

  <div class="mb-5">
    <div class="text-center flex-column md:flex justify-content-center">
      <p class="text-viola font-bold">Vui altre curiosità?</p>
      <div class="mx-5">
        <Button @click="aggiornaFrasi" class="text-white font-bold">Clicca qui</Button>
      </div>
    </div>
    <p class="text-center text-viola font-bold">Oppure ricarica la pagina</p>
  </div>
</template>

<style scoped>
.text-viola {
  color: #C996FA;
}

.fake-card {
  background: rgba(201, 150, 250, 0.2); /* Colore violetto opaco */
  border: 2px solid #C996FA; /* Stesso colore ma senza opacità */
  border-radius: 15px; /* Bordo arrotondato per un effetto più morbido */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Aggiunge un po' di ombra */
  backdrop-filter: blur(10px); /* Effetto blur sullo sfondo */
  -webkit-backdrop-filter: blur(10px); /* Supporto per Safari */
  max-width: 400px; /* Limita la larghezza massima della card */
  margin: 20px auto; /* Centra la card */
}

.fake-card .card-content {
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.1); /* Aggiunge una leggera separazione per il contenuto interno */
  border-radius: 10px;
}
</style>
