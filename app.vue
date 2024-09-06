<script setup>
useHead({
  title: 'Voti LongIsland',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: 'console.log(\'Hello world\')' } ],
})

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Stato reattivo per l'autenticazione
const isAuthenticated = ref(false);
const router = useRouter();

// Funzione per verificare se l'utente è autenticato
const checkAuth = () => {
  const token = localStorage.getItem('sessionToken');
  isAuthenticated.value = !!token;  // Imposta true se il token è presente
};

// Funzione per gestire il logout
const logout = () => {
  // Rimuovi il token di sessione
  localStorage.removeItem('sessionToken');
  
  // Aggiorna lo stato reattivo
  isAuthenticated.value = false;

  // Reindirizza alla home
  router.push('/login');
};

// Verifica lo stato di autenticazione quando il componente è montato
onMounted(() => {
  checkAuth();
});

const goToRecensioni = () => {
  router.push('/recensioni');
};

const items = ref([
  { label: 'Ricetta', icon: 'pi pi-book', command: () => router.push('/ricetta') },
  { label: 'Curiosità', icon: 'pi pi-question', command: () => router.push('/info') },
]);

</script>

<template>
  <div class="min-h-screen">
    <Toast position="center"/>
    <ConfirmDialog />
    <NuxtLayout>
      <!-- Contenitore principale con PrimeFlex -->
      <div class="flex flex-column md:flex-row justify-content-between align-items-center border-round border-2 p-4 bg-purple-300 border-purple-400 gap-4">
        <!-- Sezione di sinistra (Home e SplitButton) -->
        <div class="flex flex-column md:flex-row align-items-center gap-3">
          <NuxtLink to="/" class="no-underline text-white font-bold">
            <Button raised class="flex align-items-center"><i class="pi pi-home mr-2 text-white font-bold"></i><strong class="text-white">Home</strong>
            </Button>
          </NuxtLink>
          <SplitButton class="no-underline text-white font-bold" :model="items" @click="goToRecensioni" raised >
            <span class="no-underline text-white font-bold"><i class="pi pi-receipt text-white font-bold mr-2"></i>Recensioni</span>
          </SplitButton>
        </div>

        <!-- Sezione di destra (Login/Logout) -->
        <div>
          <div v-if="isAuthenticated">
            <Button @click="logout" class="no-underline text-white font-bold" raised>
              <i class="pi pi-sign-out mr-2 text-white font-bold"></i>Logout
            </Button>
          </div>
          <div v-else>
            <NuxtLink to="/login" class="no-underline text-white font-bold">
              <Button raised>
                <i class="pi pi-user mr-2 text-white font-bold"></i><strong class="text-white">Login</strong>
              </Button>
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- NuxtPage per i contenuti dinamici -->
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

.aa:hover {
  cursor: pointer;
  transform: scale(1.2);
  transition: 1.2s;
}

#__nuxt > div > div.flex.flex-column.md\:flex-row.justify-content-between.align-items-center.border-round.border-2.p-4.bg-purple-300.border-purple-400.gap-4 > div.flex.flex-column.md\:flex-row.align-items-center.gap-3 > div > button.p-button.p-component.p-button-icon-only.p-splitbutton-menubutton > svg{
  color: white !important;
  font-weight: bold !important;
}

@media (max-width: 600px) {
  .flex-column {
    flex-direction: column !important;
  }
}
</style>
