<template>
    <div>
        <h1 class="text-center text-viola">Benvenuto!</h1>
      <h2 class="text-center text-viola mb-3">Inserisci la password giusta per accedere</h2>
      <form @submit.prevent="handleLogin">
        <div class="md:flex justify-content-center mt-5">
            <FloatLabel>
                <Password v-model="password" :feedback="false" id="password"/>
                <label for="password">Password</label>
            </FloatLabel>
            <Button type="submit" class="ml-3 text-white md:w-auto">Login</Button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useToast } from 'primevue/usetoast'; // Importa il servizio Toast
  
  const password = ref('');
  const errorMessage = ref('');
  const toast = useToast(); // Inizializza il servizio Toast
  
  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: password.value })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Salva il token nel localStorage
        localStorage.setItem('sessionToken', result.token);
  
        // Ricarica la pagina e redirige alle recensioni
        window.location.href = '/recensioni';
      } else {
        errorMessage.value = result.message;
        toast.add({ severity: 'error', summary: 'Errore', detail: 'Password sbagliata', life: 3000 }); // Mostra il toast
      }
    } catch (error) {
      errorMessage.value = 'Errore durante il login';
      toast.add({ severity: 'error', summary: 'Errore', detail: 'Errore durante il login', life: 3000 }); // Mostra il toast
    }
  };
  </script>
  

  <style scoped>
.text-viola{
  color: #C996FA;
}

h1{
  font-size: 3em;
}

</style>