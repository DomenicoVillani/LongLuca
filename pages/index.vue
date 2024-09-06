<template>
    <div>
      <h1 class="text-center text-viola"><strong>Benvenuti nelle recensioni di Long Island di Luca</strong></h1>
      <p class="text-center text-viola">Qui troverete tutte le recensioni con voto dei Long Island bevuta da Luca.</p>
      <p class="text-center text-viola">Qua sotto avete info generali mentre nel tab "Recensioni" troverete tutte le recensioni</p>
      <p class="text-center text-viola">con qualche info in più e anche la possibilità di inserirne di nuove o eliminarle</p>
    </div>
    <div>
      <div v-if="!recensioni || recensioni.length === 0" class="mt-5">
        <p>Nessuna recensione inserita</p>
      </div>
  
      <div v-else class="my-5">
        <div class="md:flex justify-content-evenly">
          <div class="fake-card">
            <div class="flex align-items-center">
                <strong class="mr-1">Numero totale di recensioni:</strong>
                <Avatar v-badge.danger="recensioni.length" class="p-overlay-badge" :image="avatarImage" size="large" shape="circle"/>
            </div>
            <div class="card flex align-items-center mt-3">
                <strong class="mr-1">Media voti:</strong>
              <Knob v-model="knobPercentuale" :valueTemplate="mediaVoti" />
            </div>
          </div>
    
          <div v-if="recensioniPiuAlte.length > 0" class="fake-card">
          <h3>Recensioni con il voto più alto ({{ votoPiuAlto }})</h3>
          <div v-for="recensione in recensioniPiuAlte" :key="recensione.id">
              <p><strong>Nome:</strong> {{ recensione.nome }}</p>
              <p><strong>Tipologia:</strong> {{ recensione.tipo.name }}</p>
              <p><strong>Voto:</strong> {{ recensione.voto }}</p>
              <hr v-if="recensioniPiuAlte.length > 1"/>
            </div>
          </div>

          <div v-if="ultimaRecensione" class="fake-card mb-5">
            <h3>Ultima recensione inserita</h3>
            <p><strong>Nome:</strong> {{ ultimaRecensione.nome }}</p>
            <p><strong>Tipologia:</strong> {{ ultimaRecensione.tipo.name }}</p>
            <p><strong>Voto:</strong> {{ ultimaRecensione.voto }}</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <p class="text-center text-viola mt-5">Per qualsiasi informazioni scrivete a: <strong><a href="mailto:domenico.villani.99@gmail.com">domenico.villani.99@gmail.com</a></strong></p>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useFetch } from '#imports';
  import avatarImage from '@/assets/images/imgAvatar.webp';
  
  const { data: recensioni = ref([]) } = useFetch('/api/recensioni');
  
  const mediaVoti = computed(() => {
    if (recensioni.value.length === 0) return 'Nessuna recensione inserita';
  
    const totaleVoti = recensioni.value.reduce((acc, recensione) => acc + recensione.voto, 0);
    return (totaleVoti / recensioni.value.length).toFixed(2); 
  });
  
  const knobPercentuale = computed(() => {
    return (mediaVoti.value / 10) * 100;
  });
  
  const ultimaRecensione = computed(() => {
    if (recensioni.value.length === 0) return null;
    return recensioni.value[recensioni.value.length - 1];
  });
  
  const votoPiuAlto = computed(() => {
    if (recensioni.value.length === 0) return null;
  
    return Math.max(...recensioni.value.map(recensione => recensione.voto));
  });
  
  const recensioniPiuAlte = computed(() => {
    if (recensioni.value.length === 0) return [];
  
    const maxVoto = votoPiuAlto.value;
    return recensioni.value.filter(recensione => recensione.voto === maxVoto);
  });
  </script>
  
<style scoped>
.text-viola{
  color: #C996FA;
}

h1{
  font-size: 3em;
}

a{
  text-decoration: none;
  color: #C996FA;
}

a:hover{
  cursor: pointer;
  text-decoration: underline;
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

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>