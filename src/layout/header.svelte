<script>
  import Logo from '../components/logo.svelte';
  import LanguageSelector from '../components/language-selector.svelte';
  import Svg from '../components/svgs.svelte';

  export let background;
  export let locale;
  export let setLocale;
  export let isSidedrawerOpen;
  export let toggleSidedrawer;

  let translation = {
    "en-US": {
      detect_language: "Detect Language"
    },
    "fr-FR": {
      detect_language: "Détecter la langue"
    },
    "pt-PT": {
      detect_language: "Detetar Língua"
    }
  }
</script>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding: 0 20px;
  }

  figure {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .utils {
    display: flex;
    align-items: center;
  }

  .utils .settings {
    cursor: pointer;
    color: var( --midnight );
    -webkit-tap-highlight-color: transparent;
  }

  .utils .settings :global( svg ){
    transition: transform .3s linear;
  }

  .utils .settings.toggled :global( svg ) {
    transform: rotate( 45deg );
  }

  .utils label {
    font-family: 'Special Elite', cursive;
  }

  .utils select {
    display: none;
  }

  @media( min-width: 500px ){
    .utils .settings {
      display: none;
    }
    
    .utils select {
      display: block;
      align-items: center;
    }
  }
</style>

<header>
  <figure>
    <Logo />
  </figure>

  <ul class="utils">
    <button class="settings button transparent" class:toggled={ isSidedrawerOpen } on:click={ toggleSidedrawer }>
      <Svg icon="cog"/>
      <span class="ripple"></span>
    </button>

    <!-- <li>
      <button class="pill blue">
        { translation[ locale ].detect_language }
        <span class="ripple"></span>
      </button>
    </li> -->
    
    <li style="display: flex; align-items: center; color: var( --river );">      
      <LanguageSelector { setLocale } />
    </li>
  </ul>
</header>