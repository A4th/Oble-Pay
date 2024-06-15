# Oble-Pay
An Online Wallet System built-in Decentralized Identifiers in fulfillment of CS 199 by Antonio A. Aquino IV and Jack Vincent Nicolas

  


### Prerequisites

- [Hyperledger Fabric Prerequisites][1]
- [Hyperledger Fabric Samples][4]
- [TokenSDK][3]
- [Node.js][2]

It is advisable to follow the order of installation based from the list above as it important to note that you should clone the OblePay github repository and then install the fabric-samples inside the OblePay repository

# Quick Start

```bash
# To install the dependencies of the react app
npm install

# To start the hyperledger fabric network, Token SDK and the react app
./startup.sh

# To issue tokens, use this cURL command from the Token SDK documentation
curl -X POST http://localhost:9100/api/v1/issuer/issue -H 'Content-Type: application/json' -d '{
    "amount": {"code": "TOK","value": 1000},
    "counterparty": {"node": "owner1","account": "alice"},
    "message": "hello world!"    
}'

# bring down fabric test network 
./stop.sh      
```



## Ports used

- 3000 - React client app
- 8080 - Token SDK Swagger
- 9100 - Issuer
- 9200 - Alice
- 9300 - Dan





[1]: https://hyperledger-fabric.readthedocs.io/en/release-2.5/prereqs.html
[2]: https://nodejs.org/
[3]: https://github.com/hyperledger/fabric-samples/tree/main/token-sdk
[4]: https://hyperledger-fabric.readthedocs.io/en/release-2.5/install.html