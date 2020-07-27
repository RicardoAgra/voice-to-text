<script>
  import { onMount } from 'svelte';
  import { afterUpdate } from 'svelte';

  export let locale;

  let translation = {
    "en-US": {
      title: "Convert speach into text",
      subtitle: "How to use",
      instructions: "Press «Start recording» and speak to your microphone. Your voice will automatically be converted into text, that will show in the text box bellow.",
      start_recording: "Start recording",
      stop_recording: "Stop recording",
      copy: "Copy text"
    },
    "fr-FR": {
      title: "Convertissez votre voix en texte",
      subtitle: "Comment utiliser",
      instructions: "Appuyez sur le bouton «Démarrer l'enregistrement» et parlez dans le microphone. Votre voix sera automatiquement convertie en texte, qui apparaîtra dans la zone de texte ci-dessous.",
      start_recording: "Commencer l'enregistrement",
      stop_recording: "Arrête d'enregistrer",
      copy: "Copier le texte"
    },
    "pt-PT": {
      title: "Converta a sua voz para texto",
      subtitle: "Instruções",
      instructions: "Pressione o botão «Começar a gravar» e fale para o microfone. A sua voz será automaticamente convertida para texto, que irá aparecer na caixa de texto abaixo.",
      start_recording: "Começar a gravar",
      stop_recording: "Parar de gravar",
      copy: "Copiar texto"
    }
  }

  let copyToClipboard = event => {
    navigator.clipboard.writeText( text )
    .then(function() {
      
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  let text = "";
  let isRecording = false;
  let recordingMessage = "Start Recording!";

  var grammar = '#JSGF V1.0;';
  var recognition = new webkitSpeechRecognition();
  var speechRecognitionList = new webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
  
  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.lang = "en-US";

  let isCapital = true;
  recognition.onresult = function(event) {
    let sentence = event.results[ event.results.length -1 ][0].transcript;

    if( isCapital ) sentence = sentence[0].toUpperCase() + sentence.slice(1);

    text += sentence;
    
    isCapital = sentence[ sentence.length - 1 ] === "." || sentence[ sentence.length - 2 ] === ".";
  }

  var diagnostic = document.querySelector('.output');

  const toggleRecording = () => {
    if( !isRecording ){
      recognition.start();
      isRecording = true;
      recordingMessage = "Stop recording"
    }
    else {
      recognition.stop();
      isRecording = false;
      recordingMessage = "Start recording!"
    }
  }

  recognition.onspeechend = function( event ) {
    console.log(  'Speech recognition has stopped.' );
    if( isRecording ) recognition.start();
  }

  afterUpdate(() => {
		recognition.lang = locale;
	});

</script>

<style>
  section {
    flex-grow: 1;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #FFFFFF;
    background-image: linear-gradient(180deg, #FFFFFF 0%, #6284FF 50%, #FF0000 100%);
  }

  h1 {
    padding: 30px 10px 20px 10px;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Special Elite', cursive;
    letter-spacing: 1px;
  }

  h5, p {
    display: none;
  }

  .recorder {
    margin-top: 30px;
    margin-bottom: 50px;
  }

  .wrapper {
    position: relative;
    padding: 0 15px;
    width: 100%;
    justify-content: center;
    display: flex;
    flex-flow: column;
    align-items: center;
    max-width: 1000px;  
  }

  .grey {
    position: absolute;
    bottom: -10px;
    right: 10px;
    font-size: 12px;
    background: var( --river );
    color: white;
  }

  textarea {
    position: relative;
    width: 100%;
    height: 200px;
    resize: none;
    padding: 30px 20px;
    line-height: 1.5;
  }

  textarea:before {
    content: "";
    position: absolute;
    top: -2px; left: -2px; bottom: 2px; right: 2px;
    background: rgba( 0,0,0,.5 );
  }

  @media( min-width: 500px ) {
    h1 {
      padding: 50px 0 40px 0;
    }

    h5 {
      display: block;
      padding-bottom: 10px;
      font-family: 'Special Elite', cursive;
    }

    p {
      display: block;
      line-height: 1.7;
      text-align: center;
      max-width: 600px;
    }

    textarea {
      height: 400px;
    }
  }
</style>

<section id="hero">
  <h1>{ translation[ locale ].title }</h1>
  <h5>{ translation[ locale ].subtitle }</h5>
  <p>{ translation[ locale ].instructions }</p>

  <button class="recorder pill red" class:active={ isRecording } on:click={ toggleRecording }>{ isRecording ? translation[ locale ].stop_recording : translation[ locale ].start_recording }
    <span class="ripple"></span>
  </button>

  <div class="wrapper">
    <textarea bind:value={ text }/>

    <button class="grey" on:click={ copyToClipboard }>
      { translation[ locale ].copy }
      <span class="ripple"></span>
    </button>
  </div>
</section>