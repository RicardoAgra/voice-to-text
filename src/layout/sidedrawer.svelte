<script>
  import LanguageSelector from '../components/language-selector.svelte';

  export let locale;
  export let setLocale;
  export let open = false;
  export let toggleSidedrawer;
</script>

<style>
  aside {
    position: absolute;
    left: 0;
    height: 100vh;
    width: 100vw;
    transform: translateX( -100% );
    transition: transform .2s ease-out;
  }

  aside .before {
    content: "";
    position: absolute;
    left: 0; top: 0;
    height: 100%; width: 100%;
    background: black;
    opacity: 0;
    transition: opacity 0s ease-out;
  }

  aside.open {
    transform: translateX( 0% );
    transition: opacity 0s ease-out;
  }

  aside.open .before {
    transition: opacity .2s ease-out;
    opacity: .5;
  }

  .sidedrawer {
    background: white;
    height: 100vh;
    width: calc( 100% - 60px );
    border-right: 50px solid transparent;
    transform: translateX( -100% );
    transition: transform .2s ease-out;
    padding: 10px;
  }

  .open .sidedrawer {
    transform: translateX( 0% );
  }
</style>

<aside class:open={ open }>
  <div class="before" on:click={ toggleSidedrawer }></div>
  
  <div class="sidedrawer">
    <LanguageSelector {setLocale} />
  </div>
</aside>
