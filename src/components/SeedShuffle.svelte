<script>

import { shuffle, deshuffle } from '../../lib/seedshuffle.js';

import MoreInfo from './MoreInfo.svelte';

let _password;
let _password2;

$: password = _password ? _password.trim() : ''
$: password2 = _password2 ? _password2.trim() : ''

const words = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24';

$: shuffled = shuffle(words, password);
$: deshuffled_seed = deshuffle(shuffled, password2);

$: success = deshuffled_seed == words;

let more;

</script>

<div id="main">
  <h2><span>—  simple and safe algorithm for 24-word seed protection —</span></h2>

  <p id="tagline">Keep your cryptographic seeds (Ledger, crypto wallets etc.) safe. <br><br>"Hidden" paper (or metal) with plain-text seed is not ok, don't wait to discover that for yourself!</p>

  <!-- <h3 id="warning"><b>review stage, NOT for immediate use</b></h3> -->

  <h2>Shuffle:</h2>

  <p>
    Choose a good password <b>(13 or more lower and upper case characters with digits)</b> to get the pseudo-random sequence based on which you should rewrite your 24-word seed on a piece of paper you intend to keep on secondary (even better <i>all</i>) locations (for example in bank vaults, with relatives etc.).
  </p>

  <p>
    Password:<br>
    <input bind:value={_password} placeholder="enter a new password">
  </p>

  <h3>Protected (shuffled) seed:</h3>

  <p id="shuffled">{shuffled}</p>

  <div class="info">
    This is a seed example, <b>Words 1 to 24</b>. You do not enter your seed anywhere in this GUI. <b>Use only sample passwords</b> for testing unless you have cloned <a href="https://github.com/dmtsys/seedshuffle">the repo</a> to your computer.
  </div>

  <hr>

  <h2>De-shuffle:</h2>

  <!-- <p>Re-enter password to see how the seed unshuffles back to the original. </p> -->

  <p>
    <b>Enter same password again</b> to deshuffle to original seed version (Words 1 to 24):<br>
    <input bind:value={_password2} placeholder="re-enter password">
  </p>

  <h3>Original seed (1 2 3 ...) if password matches:</h3>
  <p id="mnemonic">
    {#if password2 != ''}
      {#if success}
        <span class="green">✓</span>
      {:else}
        <span class="red">✖</span>
      {/if}
    {/if}

    {deshuffled_seed}

    {#if success}
      <span class="green">✓</span>
    {:else if password2 != ''}
      <span class="red">✖</span>
    {/if}
  </p>

  {#if success && password2 != ''}
    <div class="success">
      Successfully deshuffled the seed with correct password!
    </div>
  {/if}

  <hr>

  <h2>Details</h2>
  <p>
    <button class:invisible={more} on:click={() => { more = true; }}>See more information about the algorithm</button>
  </p>

  <div class:invisible={!more}>

    <MoreInfo />

  </div>

</div>

<style>
#main {
  font-size: 0.7em;
}

a {
  color: #42b983;
}

input {
  margin-top: 5px;
  padding: 5px 7px;
}

h2 span,
#tagline {
  color: #364295;
}

#shuffled,
#mnemonic {
  color: #364295;
  font-weight: bold;
  font-family: 'Lucida Sans Typewriter', 'Lucida Typewriter', 'Courier New', Courier, monospace;
  font-size: 1.4em;
}

#citation {
  font-size: 0.9em;
  font-style: italic;
}

.invisible {
  display: none;
}

.info, .success {
  padding: 5px 0 20px 0;
}

.info {
  color: #7C507E;
}

.success, .green {
  color: #478135;
}

.red {
  color: #7D2D27;
}

</style>
