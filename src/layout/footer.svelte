<script>
  import Svg from '../components/svgs.svelte';
	
	export let background;
</script>

<style>
  footer {
		height: 250px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	}

</style>

<footer style="background: var(--{background})">

	<p>Made by Ricardo Agra</p>

</footer>