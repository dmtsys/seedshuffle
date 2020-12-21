## Background

The algorithm randomizes the sequence of words in yor cryptographic seed. With a good password (upper case, lower case letters, numbers) of length 13 characters or more, the security of shuffled sequence is 79 bits (= log224!), meaning ~279 combinations would have to be tried to find the original seed with your balance (this would take many millions of years). Shorter or less diverse passwords lower the time accordingly but still don't make the attack trivial. The strength of the original seed is otherwise 256 bits (meaning security of 256 bits if attacker has no idea of any content of your seed mnemonic). 79 bits is still unbreakably secure with current computers but of course try to keep the note with written seed as hidden as possible. We recommend keeping the original unshuffled seed somewhere where it is 100% safe and keeping a backup at less safe locations shuffled. In case it gets stolen you won't immediately loose all your funds. Take care of remembering the password in case your original gets destroyed and of course remember that the seed is shuffled before trying to use it and seeing zero balance (maybe devise a little unsuspecting remark that only you can notice). In case you don't have a 100% secure place for the original, you could keep all backups shuffled, just "really don't forget the password" and save the source code of SeedShuffle (or print it!).

SeedShuffle is a nice tool for your security arsenal, understand it and devise your own best strategy for its use.

"How much entropy do you need to be secure? Right now, password cracking chips can perform about 236 attempts per second, and Bitcoin miners can perform roughly 240 hashes per second (that’s 1 terahash). The entire Bitcoin network together does 250 petahashes, or about 257 hashes per second. Cryptographers generally consider 280 to be an acceptable minimum level of security. To get 80 bits of entropy, you need either about 17 random letters of the alphabet, or 12 random letters, numbers and symbols." from an article on Ethereum blog

Source code of the "SeedShuffle algorithm" used on this page is here. Your password never leaves the browser, but you can still run the verified code in your terminal to be really sure. Warning: never type in your real seed into it or anywhere else, this is not safe except on an offline computer that is erased afterwards. For this reason sequence numbers are used based on which you do the paper and pencil work to shuffle your seed.

12-words seeds can also be shuffled but here the entropy is much lower (28 bits) - it is still better than unshuffled, just don't count on proper security if a serious attacker gets hold of the seed and suspects it has been shuffled.

## How it works

### Preparation

- calculate the SHA256 hash of the password
- this results in pseudo-random sequence like: 011001101010001 ... 01001 (exactly 256 bits)
- sequence is split into chunks of 5 bits: 01100 11010 10001 ... we only need the first 24 chunks
- each chunk of 5 bits represents an integer between 0 and 31 (= 25 integers)

### Shuffling:

```
for each chunk from 0 to 23:
    take and remove nth word from original seed where
    n = chunk value [0..31] modulus number of remaining words from original seed
```

### Alternative -- About BIP39 passphrases

[BIP39 standard](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#from-mnemonic-to-seed) already offers mnemonic (seed) protection by a passphrase, however it works a bit different. In this case you don't have a pure version of mnemonic, it's always 24 words + passphrase that produce a valid private key. So why not use that? Maybe you should, however it is not practical in many cases, for example: Ledger Nano S didn't offer this option until version 1.3 of firmware. So to retrogradely protect your seed, you would actually have to create a new account (= public/private key pair) and move the funds over. This is one reason where SeedShuffle comes very handy. A similar case is when you come to Ledger as a newcomer and simply don't use the passphrase feature because you are not yet familiar with it, then you later have the same problem as already described. Another option could be that you always want to use the simplest possible primitive to avoid special bugs and then apply well understood encryption (shuffle) yourself. One disadvantage of SeedShuffle over BIP39 passphrase protection is less bits of entropy for passphrases over 13 characters long, meaning that BIP39 passphrase offers more theoretical protection if you choose a really strong password (up to 256 bits). As already mentioned 80 bits (or 79 for that matter) is already considered secure. Additional fact is that nobody will (or should) see your shuffled seed, so you have two frontiers: you still hide shuffled seed and on top of that "just in case" you have 79 bits of security.

There might be other use cases for SeedShuffle based on the fundamental difference that you can produce shuffled seeds protected by infinitely many different passwords while BIP39 is a combination of particular 24 words and a particular passphrase. This means that you could encode your seed with different passwords and make your security scheme based on this. So again: BIP39 is always just 24 words + one specific 25th word, no possibility of multiple encrypted seeds which all translate to one original.
