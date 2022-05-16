global.config = require("./config.json");
const dal = require("./dal");
const MachineFi_ABi = require("./MachineFi_ABi.json");
const MachineFi_ADDRESS = require("./MachineFi_ADDRESS.json");
const Web3 = require("web3");
const rpc = require("./rpc.json");
var fs = require("fs");

var Contract = require("web3-eth-contract");
Contract.setProvider(rpc.iotexProvider);
var contract = new Contract(MachineFi_ABi.abi, MachineFi_ADDRESS.address);

//

async function addrow(address, uri, tokenID) {
  let sql;
  sql = `INSERT INTO sys.IVOTED (address, uri , tokenId) VALUES ('${address}', '${uri}' , ${tokenID});`;
  await dal.executeAsync(sql);
}

const getOwners = async () => {
  for (let i = 320; i <= 6689; i++) {
    console.log(i);
    try {
      const res = await contract.methods.ownerOf(i).call();
      const uri = await contract.methods.tokenURI(i).call();

      const lowerRes = res.toLowerCase();
      const lowerUri = uri.toLowerCase();


      if(lowerRes && lowerUri) {
        await addrow(lowerRes, lowerUri, i);
      }

    } catch (err) {
      console.log(err.message);
    }

  
  }
};
// getOwners()
