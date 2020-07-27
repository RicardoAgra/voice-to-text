<script>
  export let setLocale;
</script>

<style>
  select {
    cursor: pointer;
    font-size: 12px;
    color: var( --grey );
    padding: 8px;
  }
  
  option {
    font-size: 12px;
    color: var( --grey );
    padding: 8px;
  }
</style>

<select on:change={ setLocale }>
  <option value="en-US" selected>English (USA)</option>
  <option value="pt-PT">Português (Portugal)</option>
  <option value="fr-FR">Français (France)</option>
</select>