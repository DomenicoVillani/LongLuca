<script setup lang="ts">
import prova from '@/assets/images/artworks-000037536226-72lqsb-t500x500.jpg';
import breaking from '@/assets/images/breaking-bad.gif';
import hq720 from '@/assets/images/hq720.jpg';
import sddefault from '@/assets/images/sddefault.jpg';
import dom from '@/assets/images/skibidiDom.jpg';
import gpt from '@/assets/images/skibidiGpt.webp';
import skibidiPaolo from '@/assets/images/skibidiPaolo.jpg';
import tf2 from '@/assets/images/TF2-Soldier-Smiling-meme-8.jpg';
import zu372dr7rrdb1 from '@/assets/images/zu372dr7rrdb1.jpg';

const route = useRoute();
const currentUrl = decodeURIComponent(route.fullPath);

const products = ref([
    { image: prova },
    { image: breaking },
    { image: hq720 },
    { image: sddefault },
    { image: dom },
    { image: gpt },
    { image: skibidiPaolo },
    { image: tf2 },
    { image: zu372dr7rrdb1 }
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
	<div class="flex justify-content-center h-screen mb-5">
		<div class=" align-content-center">
			<div class="flex justify-content-center">
				<h1 class="text-viola text-center">
					LE RECENSIONI DEI DRINK NON SI TROVANO IN QUESTA PAGINA
				</h1>
			</div>
			<p class="text-center text-viola text-bold">PERO' TIENI QUESTO CATALOGO DI MEME</p>
			<div class="card mt-5">
				<Carousel :value="products" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
					<template #item="slotProps">
						<div class="border-1 surface-border border-round m-2  p-3">
							<div class="mb-3">
								<div class="relative mx-auto">
									<img :src="slotProps.data.image" :alt="aaaaaa" class="w-full border-round carousel-image" />
								</div>
							</div>
						</div>
					</template>
				</Carousel>
			</div>

			<div class="flex justify-content-center">
				<p class="text-4xl font-bold text-blue mt-8">
					<i class="pi pi-exclamation-triangle text-5xl font-bold text-viola" /> Page not found: {{ currentUrl }}
				</p>
			</div>
			<hr>
			<div class="my-5 flex justify-content-center">
				<NuxtLink to="/">
					<Button label="Go back home" outlined raised />
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<style scoped>
h1{
	font-size: 6rem;
}
.text-viola {
  color: #C996FA;
}
.carousel-image {
  height: 600px; /* Imposta l'altezza desiderata */
  object-fit: cover; /* Mantiene le proporzioni dell'immagine mentre riempie lo spazio */
}
</style>
