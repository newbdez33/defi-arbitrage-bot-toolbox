const Wallet = require('ethereumjs-wallet').default

export function genKeyPairs(n) {
    let pairs = [];
    if ( n > 0 ) {
        for(let index=0; index < n; index++) {
            let addressData = Wallet.generate();
            pairs.push({"private_key":addressData.getPrivateKeyString(), "address":addressData.getAddressString()})
        }
    }
    return pairs;
}