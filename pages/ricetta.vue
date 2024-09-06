<script setup>
import bicchiere from '@/assets/images/bicchiere.webp';
import alcolici from '@/assets/images/alcolici.webp';
import limone from '@/assets/images/limone.webp';
import cocacola from '@/assets/images/cocacola.webp';
import mischia from '@/assets/images/mischia.webp';
import fine from '@/assets/images/fine.webp';

const products = ref([
    { name: 'Ghiaccio nel bicchiere', image: bicchiere },
    { name: 'Versa gli alcolici', image: alcolici },
    { name: 'Versa limone e zucchero', image: limone },
    { name: 'Versa quanto basta di CocaCola', image: cocacola },
    { name: 'Mischia', image: mischia },
    { name: 'Goditi il tuo drink', image: fine }
]);
const responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];
</script>

<template>
<div class="card">
        <Accordion :multiple="true" :activeIndex="0" class="mt-5 mx-5">
            <AccordionTab header="Ingredienti">
                <div class="m-0">
                    <ul>
                        <li class="mb-1">15 ml di vodka</li>
                        <li class="mb-1">15 ml di gin</li>
                        <li class="mb-1">15 ml di rum bianco</li>
                        <li class="mb-1">15 ml di tequila</li>
                        <li class="mb-1">15 ml di triple sec (liquore all'arancia)</li>
                        <li class="mb-1">30 ml di succo di limone fresco</li>
                        <li class="mb-1">15 ml di sciroppo di zucchero</li>
                        <li class="mb-1">Un tocco di cola (quanto basta per colorare il drink)</li>
                        <li class="mb-1">Ghiaccio</li>
                        <li>Fetta di limone e foglia di menta per guarnire (opzionale)</li>
                    </ul>
                </div>
            </AccordionTab>
            <AccordionTab header="Procedimento:">
                <div class="m-0">
                    <ol>
                        <li class="mb-1">Riempi un bicchiere highball di ghiaccio.</li>
                        <li class="mb-1">Versa nel bicchiere la vodka, il gin, il rum bianco, la tequila e il triple sec.</li>
                        <li class="mb-1">Aggiungi il succo di limone e lo sciroppo di zucchero.</li>
                        <li class="mb-1">Completa con un tocco di cola, giusto quanto basta per dare al cocktail il classico colore scuro simile al tè freddo.</li>
                        <li class="mb-1">Mescola delicatamente.</li>
                        <li>Guarnisci con una fetta di limone e una foglia di menta, se lo desideri.</li>
                    </ol>
                </div>
            </AccordionTab>
        </Accordion>
    </div>
    <h2 class="text-viola text-center mt-5">PROCEDIMENTO SPIEGATO IN BREVE</h2>
    <div class="card mt-5">
        <Carousel :value="products" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
            <template #item="slotProps">
                <div class="border-1 surface-border border-round m-2  p-3">
                    <div class="mb-3">
                        <div class="relative mx-auto">
                            <img :src="slotProps.data.image" :alt="slotProps.data.name" class="w-full border-round" />
                        </div>
                    </div>
                    <div class="mb-3 font-medium text-viola text-center">{{ slotProps.data.name }}</div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<style scoped>
.text-viola{
  color: #C996FA;
  font-weight: bold;
}
</style>