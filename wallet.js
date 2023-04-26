require('dotenv').config();
const Web3=require('web3');
const { Matic } = require('@maticnetwork/maticjs');
const apiKey=process.env['apikey']
const network='goerli';

const node=`https://eth.getblock.io/${apiKey}/${network}/`
const web3=new Web3(node)
// console.log(web3)

const account = web3.eth.accounts.create();
console.log(account);

const privateKey=process.env['privateKey']
const AccountFrom=web3.eth.accounts.privateKeyToAccount(privateKey);
console.log(AccountFrom);

const createSignedTx=async(rawTx)=>{
    rawTx.gas=await web3.eth.estimateGas(rawTx);
    return await AccountFrom.signTransaction(rawTx);
}

const sendSignedTx=async(signedTx)=>{
     web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log);
}

const sendAmount='0.0001'
const rawTx={
    to:sendAmount.address,
    value:web3.utils.toWei(sendAmount,"ether")
}

createSignedTx(rawTx).then(sendSignedTx)
    