<script>

import { shuffle, deshuffle } from '../../lib/seedshuffle.js';

let password;
let password2;

const words = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24';

$: shuffled = shuffle(words, password);
$: deshuffled_seed = deshuffle(shuffled, password2);

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
    <input bind:value={password} placeholder="enter a new password">
  </p>

  <p id="shuffled">{shuffled}</p>

  <h2>De-shuffle:</h2>

  <p>Re-enter password to see how the seed unshuffles back to the original. </p>

  <p>
    Password again:<br>
    <input bind:value={password2} placeholder="re-enter password">
  </p>

  <p id="mnemonic">{deshuffled_seed}</p>

  <button class:invisible={more} on:click={() => { more = true; }}>More</button>

  <div class:invisible={!more}>

  <h2>How to manually shuffle back to original? <font color="#777" size="3em"><br>(not so relevant for initial general understanding)</font></h2>

  <p><font color="#777">To get a sequence based on which you have to move shuffled seed's words back to original position, enter the password just into second box. If for example first three numbers are: 3 5 1 ... you proceed by writing first the 3rd word from shuffled list, then 5th, then 1st... until you reconstructed the original seed. This is only needed because you're not supposed to enter the real words into any ("online") computer / script... in this way you can manually reshuffle back based on general sequence numbers.
<br><br>
Don't worry if you don't grasp these details immediately, it takes some thinking (which is great) but it's easy. For now just see if you like / understand the general idea (seed shuffle/deshuffle with one password) and then investigate further to understand exactly how it works. <br><br> Representative from ELM RESEARCH is available for paid consulting.
  </font></p>

  <h2>
    Background:
  </h2>

  <p>
    The algorithm randomizes the sequence of words in yor cryptographic seed. With a good password (upper case, lower case letters, numbers) of length 13 characters or more, the security of shuffled sequence is 79 bits <i>(= log<sub>2</sub>24!)</i>, meaning ~2<sup>79</sup> combinations would have to be tried to find the original seed with your balance (this would take many millions of years). Shorter or less diverse passwords lower the time accordingly but still don't make the attack trivial. The strength of the original seed is otherwise 256 bits (meaning security of 256 bits if attacker has no idea of any content of your seed mnemonic). 79 bits is still unbreakably secure with current computers but of course try to keep the note with written seed as hidden as possible. We recommend keeping the original unshuffled seed somewhere where it is 100% safe and keeping a backup at less safe locations shuffled. In case it gets stolen you won't immediately loose all your funds. Take care of remembering the password in case your original gets destroyed and of course remember that the seed is shuffled before trying to use it and seeing zero balance (maybe devise a little unsuspecting remark that only you can notice). In case you don't have a 100% secure place for the original, you could keep all backups shuffled, just "really don't forget the password" <i>and save the source code of SeedShuffle (or print it!)</i>.
  </p>

  <p><b>SeedShuffle is a nice tool for your security arsenal, understand it and devise your own best strategy for its use.</b></p>

  <p id="citation">
    "How much entropy do you need to be secure? Right now, password cracking chips can perform about 236 attempts per second, and Bitcoin miners can perform roughly 240 hashes per second (that’s 1 terahash). The entire Bitcoin network together does 250 petahashes, or about 257 hashes per second. Cryptographers generally consider 2<sup>80</sup> to be an acceptable minimum level of security. To get 80 bits of entropy, you need either about 17 random letters of the alphabet, or 12 random letters, numbers and symbols." from an <a href="https://blog.ethereum.org/2014/10/23/information-theoretic-account-secure-brainwallets/" target="_blank">article on Ethereum blog</a>
  </p>

  <p>
    Source code of the "SeedShuffle algorithm" used on this page <a href="https://github.com/dmtsys/seedshuffle" target="_blank">is here</a>. Your password never leaves the browser, but you can still run the verified code in your terminal to be really sure. Warning: <b>never type in your real seed into it or anywhere else</b>, this is not safe except on an offline computer that is erased afterwards. For this reason sequence numbers are used based on which you do the paper and pencil work to shuffle your seed.
  </p>

  <p>
    12-words seeds can also be shuffled but here the entropy is much lower (28 bits) - it is still better than unshuffled, just don't count on proper security if a serious attacker gets hold of the seed and suspects it has been shuffled.
  </p>

  <h2>
    How it works:
  </h2>


    <b>Preparation:</b>
    <ul>
      <li>calculate the SHA256 hash of the password</li>
      <li>this results in pseudo-random sequence like: 011001101010001 ... 01001 (exactly 256 bits)</li>
      <li>sequence is split into chunks of 5 bits: 01100 11010 10001 ... we only need the first 24 chunks</li>
      <li>each chunk of 5 bits represents an integer between 0 and 31 (= 2<sup>5</sup> integers)</li>
    </ul>

    <b>Shuffling:</b>

    <br>
    <br>
    <b>for each</b> chunk <b>from</b> 0 <b>to</b> 23:<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<b>take and remove</b> <i> nth word</i> from original seed <b>where</b><br>
    &nbsp;&nbsp;&nbsp;&nbsp;n <b>=</b> chunk value [0..31] <b>modulus</b> <i> number of remaining words from original seed</i>


  <p><a href="https://github.com/dmtsys/seedshuffle" target="_blank">Source code</a></p>

  <h2>About BIP39 passphrases:</h2>

  <p>
    <a href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#from-mnemonic-to-seed" target="_blank">BIP39 standard</a> already offers mnemonic (seed) protection by a passphrase, however it works a bit different. In this case you don't have a pure version of mnemonic, it's always 24 words + passphrase that produce a valid private key. So why not use that? <b>Maybe you should,</b> however it is not practical in many cases, for example: Ledger Nano S didn't offer this option until version 1.3 of firmware. So to retrogradely protect your seed, you would actually have to create a new account (= public/private key pair) and move the funds over. This is one reason where <i>SeedShuffle</i> comes very handy. A similar case is when you come to Ledger as a newcomer and simply don't use the passphrase feature because you are not yet familiar with it, then you later have the same problem as already described. Another option could be that you always want to use the simplest possible primitive to avoid special bugs and then apply well understood encryption (shuffle) yourself. One disadvantage of SeedShuffle over BIP39 passphrase protection is less bits of entropy for passphrases over 13 characters long, meaning that BIP39 passphrase offers more theoretical protection if you choose a really strong password (up to 256 bits). As already mentioned 80 bits (or 79 for that matter) is already considered secure. Additional fact is that nobody will (or should) see your shuffled seed, so you have two frontiers: you still hide shuffled seed and on top of that "just in case" you have 79 bits of security.
    <br>
    <br>
    There might be other use cases for SeedShuffle based on the fundamental difference that you can produce shuffled seeds protected by infinitely many different passwords while BIP39 is a combination of particular 24 words and a particular passphrase. This means that you could encode your seed with different passwords and make your security scheme based on this. So again: BIP39 is always just 24 words + one specific 25th word, no possibility of multiple encrypted seeds which all translate to one original.
  </p>

  </div>

</div>

<style>
#main {
  font-size: 0.7em;
}

ul {
  //list-style-type: none;
  padding: 0;
}
li {
  //display: inline-block;
  margin: 0 10px;
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
</style>
