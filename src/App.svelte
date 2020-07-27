<script>
	import Header from './layout/header.svelte';
	import Hero from './layout/hero.svelte';
	import SoundSpectrum from './components/sound-spectrum.svelte';
	import Footer from './layout/footer.svelte';
	import Sidedrawer from './layout/sidedrawer.svelte';

	let locale = "en-US";
	let setLocale = event => {
		locale = event.target.value;
	}

	let isSidedrawerOpen = false;
	const toggleSidedrawer = () => isSidedrawerOpen = !isSidedrawerOpen;
</script>

<Header {locale} {setLocale} {isSidedrawerOpen} {toggleSidedrawer} />

<Hero {locale} />

<Sidedrawer open={isSidedrawerOpen} {toggleSidedrawer} {locale} {setLocale} />

<!-- SoundSpectrum / -->

<!-- Footer background="dark-midnight" /-->	
