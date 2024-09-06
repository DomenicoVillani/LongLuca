<template>
    <div>
        <h1 class="text-center text-viola">Recensioni</h1>
        <h2 class="ml-3 text-viola">Aggiungi Recensione</h2>
        <form @submit.prevent="addReview">
            <div class="grid formgrid p-fluid p-3">
                <div class="col-12 md:col-3 mb-5">
                    <FloatLabel>
                        <InputText id="nome" v-model="newReview.nome" autocomplete="off"/>
                        <label for="nome">Nome:</label>
                    </FloatLabel>
                </div>

                <div class="col-12 md:col-3 mb-5">
                    <FloatLabel>
                        <Dropdown id="tipologia" v-model="newReview.tipo" :options="tipologia" optionLabel="name" class="w-full" />
                        <label for="tipologia">Tipologia:</label>
                    </FloatLabel>
                </div>

                <div class="col-12 md:col-3 mb-5">
                    <FloatLabel>
                        <Calendar v-model="newReview.data" showIcon :showOnFocus="false" inputId="buttondisplay" id="data" dateFormat="dd/mm/yy" />
                        <label for="data">Data:</label>
                    </FloatLabel>
                </div>

                <div class="col-12 md:col-3 mb-5">
                    <FloatLabel>
                        <InputNumber id="number-input" v-model="newReview.voto" :minFractionDigits="2" :maxFractionDigits="2" class="w-full" />
                        <label for="number-input">Voto:</label>
                    </FloatLabel>
                </div>

                <div class="col-12 md:col-11">
                    <FloatLabel>
                        <Textarea id="Note" v-model="newReview.note" rows="2" cols="30" autoResize />
                        <label for="Note">Note</label>
                    </FloatLabel>
                </div>
                <div class="col-12 md:col-1">
                    <Button type="submit" class="text-white w-full md:w-auto">Aggiungi</Button>
                </div>
                
            </div>
        </form>
        <h2 class="ml-3 text-viola">Lista recensioni</h2>
        <div class="card mb-5" style="margin-left: 30px; margin-right: 30px;">
            <DataTable :value="recensioni" removableSort tableStyle="min-width: 50rem">
                <Column field="nome" header="Nome" sortable style="width: 20%"></Column>
                <Column field="tipo.name" header="Tipologia" sortable style="width: 20%"></Column>
                <Column field="data" header="Data" :body="formatDate" style="width: 15%"></Column>
                <Column field="voto" header="Voto" sortable style="width: 10%"></Column>
                <Column field="note" header="Note" style="width: 25%"></Column>
                <Column header="Azione" style="width: 10%">
                    <template #body="slotProps">
                        <Button @click="deleteReview(slotProps.data.id)" class="text-white">Elimina</Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFetch } from '#imports';

const toast = useToast();
const { data: recensioni, refresh } = useFetch('/api/recensioni');

const tipologia = ref([
    { name: 'Bar' },
    { name: 'Ristorante' },
    { name: 'Pub' },
    { name: 'Lido' },
    { name: 'Discoteca' }
]);

const newReview = ref({
    nome: '',
    tipo: '',
    data: '',
    voto: null,
    note: ''
});

const formatDate = (rowData) => {
    if (!rowData.data) return 'Data non disponibile';

    const date = new Date(rowData.data);

    if (isNaN(date.getTime())) {
        return 'Formato data non valido';
    }

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
};

// Funzione per ottenere il token salvato
const getToken = () => {
    return localStorage.getItem('sessionToken');
};

const addReview = async () => {
    if (!newReview.value.nome || !newReview.value.tipo || !newReview.value.data || newReview.value.voto === null) {
        toast.add({ severity: 'error', summary: 'Errore', detail: 'Completa tutti i campi (Note escluse)', life: 3000 });
        return;
    }

    const selectedDate = new Date(newReview.value.data);
    const formattedDate = `${String(selectedDate.getDate()).padStart(2, '0')}/${String(selectedDate.getMonth() + 1).padStart(2, '0')}/${selectedDate.getFullYear()}`;
    newReview.value.data = formattedDate;

    if (newReview.value.voto < 0 || newReview.value.voto > 10) {
        toast.add({ severity: 'error', summary: 'Errore', detail: 'Il voto deve essere compreso tra 0 e 10', life: 3000 });
        return;
    }

    try {
        const response = await fetch('/api/recensioni', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': getToken()  // Invio del token negli header
            },
            body: JSON.stringify(newReview.value)
        });

        if (response.ok) {
            toast.add({ severity: 'success', summary: 'Successo', detail: 'Recensione aggiunta con successo', life: 3000 });
            newReview.value = { nome: '', tipo: '', data: '', voto: null, note: '' };
            await refresh();
        } else {
            toast.add({ severity: 'error', summary: 'Errore', detail: 'Errore nell\'aggiunta della recensione Forse non sei loggato!', life: 3000 });
        }
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Errore', detail: 'Errore di rete o del server', life: 3000 });
    }
};

const deleteReview = async (id) => {
    try {
        const response = await fetch(`/api/recensioni?id=${id}`, {
            method: 'DELETE',
            headers: {
                'x-access-token': getToken(),  // Invio del token per autorizzare l'operazione
            },
        });

        if (response.ok) {
            toast.add({ severity: 'success', summary: 'Successo', detail: 'Recensione eliminata con successo', life: 3000 });
            await refresh();  // Ricarica la lista delle recensioni
        } else {
            toast.add({ severity: 'error', summary: 'Errore', detail: 'Errore durante la cancellazione Forse non sei loggato!', life: 3000 });
        }
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Errore', detail: 'Errore di rete o del server', life: 3000 });
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