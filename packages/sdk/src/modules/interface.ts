import { Transaction as BTCTransaction } from "bitcoinjs-lib"

import { Inscription } from ".."
import {
  GetBalanceOptions,
  GetInscriptionOptions,
  GetInscriptionsOptions,
  GetInscriptionUTXOOptions,
  GetSpendablesOptions,
  GetTransactionOptions,
  GetUnspentsOptions,
  GetUnspentsResponse,
  RelayOptions
} from "../api/types"
import { Transaction, UTXO, UTXOLimited } from "../transactions/types"

export interface IDatasource {
  getBalance({ address }: GetBalanceOptions): Promise<number>

  getInscription({ id, decodeMetadata }: GetInscriptionOptions): Promise<Inscription>

  getInscriptionUTXO({ id }: GetInscriptionUTXOOptions): Promise<UTXO>

  getInscriptions({
    creator,
    owner,
    mimeType,
    mimeSubType,
    outpoint,
    sort,
    limit,
    next,
    decodeMetadata
  }: GetInscriptionsOptions): Promise<Inscription[]>

  getTransaction({
    txId,
    ordinals,
    hex,
    witness,
    decodeMetadata
  }: GetTransactionOptions): Promise<{ tx: Transaction; rawTx?: BTCTransaction }>

  getSpendables({ address, value, type, rarity, filter, limit }: GetSpendablesOptions): Promise<UTXOLimited[]>

  getUnspents({ address, type, rarity, sort, limit, next }: GetUnspentsOptions): Promise<GetUnspentsResponse>

  relay({ hex, maxFeeRate, validate }: RelayOptions): Promise<string>
}
