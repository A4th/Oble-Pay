# Oble-Pay
An Online Wallet System built-in Decentralized Identifiers in fulfillment of CS 199 by Antonio A. Aquino IV and Jack Vincent Nicolas

  


### Prerequisites

- [Hyperledger Fabric Prerequisites][1]
- [Hyperledger Fabric Samples][4]
- [Aries Playground][5] - Just clone the repository and create the docker network.
- [TokenSDK][3]
- [Node.js][2]

It is advisable to follow the order of installation based from the list above as it important to note that you should clone the OblePay github repository and then install the fabric-samples inside the OblePay repository

# Quick Start

```bash
# To install the dependencies of the react app
npm install

# To start the Hyperledger Aries-Indy program, make sure to change the GENESIS_URL to http://greenlight.bcovrin.vonx.io/genesis and cd to aries-playground repository before running:
docker-compose up

# Follow "Setting up Credentials System below before continuing
# Follow Create DID in wallet from https://github.com/decentralised-dataexchange/aries-playground/blob/master/credential-issue-and-verification-api-user-guide.md
# After creating local DID, you need to register it with ledger at http://greenlight.bcovrin.vonx.io/

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

# Setting up Credentials System
1. Follow Create DID in a wallet from the [link][6]. Register the DiDs on the [ledger][7].
2. You will do this once times for localhost:8051, localhost:8052 and localhost:8053. However, you will only run ```POST /wallet/did/public``` on localhost:8051.
3. Send a schema to the ledger with the API ```POST: ​/schemas``` with the json body as given (this is done on [localhost:8051][8] and take note of schema_id):
```
{
  "schema_version": "1.0",
   "schema_name": "UP Credentials",
   "attributes": [
            "upMail",
            "name",
            "studentNumber"
          ]
 }
```
4. Establish connection between the three agents by running these cURL commands.
```bash
# {CONNECTION BETWEEN ISSUER AND USER}
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# ISSUER (Create Inv)
issueInv=$(curl -X POST "http://localhost:8051/connections/create-invitation" -H "accept: application/json" | jq -r '.invitation')

# USER (Receive Inv)
issueCid=$(curl -X POST "http://localhost:8052/connections/receive-invitation" -H "accept: application/json" -H "Content-Type: application/json" -d "$issueInv" | jq -r '.connection_id')

# USER (Accept Inv)
curl -X POST "http://localhost:8052/connections/$issueCid/accept-invitation" -H "accept: application/json"

# {CONNECTION BETWEEN VERIFIER AND USER)
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# VERIFIER (Create Inv)
inv=$(curl -X POST "http://localhost:8053/connections/create-invitation" -H "accept: application/json" | jq -r '.invitation')

# USER (receive inv)
cid=$(curl -X POST "http://localhost:8052/connections/receive-invitation" -H "accept: application/json" -H "Content-Type: application/json" -d "$inv" | jq -r '.connection_id')

# USER (accept inv)
curl -X POST "http://localhost:8052/connections/$cid/accept-invitation" -H "accept: application/json"
```
5. Issuing of Credentials (On localhost:8051). Run ```POST method /credential-definitions``` using the json body below (Take note of the cred_def_id).
```
 {
   "revocation_registry_size": 8,
   "support_revocation": false,
   "schema_id": "PLACE schema_id THAT YOU TOOK NOTE OF FROM INSTRUCTION 3.",
   "tag": "default"
  }
```
Then, Run ```POST ​/issue-credential​/send``` using the json body below.
```
{ 
  "schema_name": "UP Credentials",
  "schema_version": "1.0",
  "cred_def_id": "USE THE cred_def_id FROM /credential-definitions",
  "auto_remove": false,
  "comment": "string",
  "connection_id": "GO TO CONNECTIONS AND LOOK FOR THE connection_id OF THE ACTIVE CONNECTION",
  "trace": false,
  "schema_issuer_did": "DERIVED FROM SCHEMA_ID, TAKE THE FIRST LETTERS UNTIL BEFORE THE FIRST :",
  "schema_id": "USE THE SCHEMA_ID THAT WAS INITIALLY TAKEN NOTE OF",
  "issuer_did": "SAME AS SCHEMA_ISSUER_DID",
  "credential_proposal": {
  "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview",
  "attributes": [
     {
       "name": "name",
       "mime-type": "text/plain",
       "value": "Alice"
     },
     {
       "name": "upMail",
       "mime-type": "text/plain",
       "value": "alice@up.edu.ph"
     },
     {
       "name": "studentNumber",
       "mime-type": "text/plain",
       "value": "202012345"
     }
   ]
  }
 }
```
6. In the cloned Oble-Pay repository, go to test/my-app/src/temp_page/verifier.js
- Open localhost:8053 and run ```GET /connections``` then take note of the connection_id of the active connection.
- Replace the ```const [connectionId, setConnectionId] = useState('PLACE CONNECTION_ID HERE');``` and all of the cred_def_id value with what you took note of in instruction 5.
- Finally, close the browser and go back to Quick Start.

## Ports used

- 3000 - React client app
- 8080 - Token SDK Swagger
- 8051 - Issuer (Identity)
- 8052 - User (Identity)
- 8053 - Verifier (Identity)
- 9100 - Issuer (Token)
- 9200 - Alice (Token)
- 9300 - Dan (Token)





[1]: https://hyperledger-fabric.readthedocs.io/en/release-2.5/prereqs.html
[2]: https://nodejs.org/
[3]: https://github.com/hyperledger/fabric-samples/tree/main/token-sdk
[4]: https://hyperledger-fabric.readthedocs.io/en/release-2.5/install.html
[5]: https://github.com/decentralised-dataexchange/aries-playground/blob/master/README.md
[6]: https://github.com/decentralised-dataexchange/aries-playground/blob/master/credential-issue-and-verification-api-user-guide.md
[7]: http://greenlight.bcovrin.vonx.io/
[8]: http://localhost:8051/api/doc#/schema/post_schemas