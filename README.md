# seedshuffle
Protect 24-word seeds

```
npm install
npm run dev
```

Open `localhost:5000`.

## Details

See here for [details](DETAILS.md).

![screen](./img/screen.png)


## Error:

`Uncaught (in promise) TypeError: crypto.createHash is not a function`

Problem with rollup bundling -- cannot successfuly import nodejs `crypto` module although [here it says](https://github.com/calvinmetcalf/rollup-plugin-node-builtins) it should work.

