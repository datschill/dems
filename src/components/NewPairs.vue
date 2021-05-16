<template>
    <div class="card text-center">
        <div class="card-body">
            <div class="card-title" @click="fetch">New Pairs</div>
            <div class="table-sticky-header">
                <table class="table table-dark">
                    <thead class="thead-light">
                        <tr>
                            <th role="columnheader" scope="col" aria-colindex="1" class=""><div>Time</div></th>
                            <th role="columnheader" scope="col" aria-colindex="2" class=""><div>Token 1</div></th>
                            <th role="columnheader" scope="col" aria-colindex="3" class=""><div>Token 2</div></th>
                            <th role="columnheader" scope="col" aria-colindex="4" class=""><div>Links</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr role="row" v-for="pair in sortedPairs" :key="pair.pair">
                            <td aria-colindex="1" role="cell" class="time text-center">{{ pairDate(pair.time) }}</td>
                            <td aria-colindex="2" role="cell" class="tokenName text-center">
                                <a :href="tokenLink(pair.token0)" target="_blank">
                                    {{ fullnameToken(pair.token0) }}
                                </a>
                            </td>
                            <td aria-colindex="3" role="cell" class="tokenName text-center">
                                <a :href="tokenLink(pair.token1)" target="_blank">
                                    {{ fullnameToken(pair.token1) }}
                                </a>
                            </td>
                            <td aria-colindex="4" role="cell" class="iconlinks text-center">
                                <a :href="pooLink(pair)" target="_blank">
                                    <img src="../assets/poocoin-logo.png" class="me-2" height="30">
                                </a>
                                <a :href="pancakeLink(pair)" target="_blank">
                                    <img src="../assets/pancake-logo.png" class="me-2" height="30">
                                </a>
                                <a :href="bscLink(pair)" target="_blank">
                                    <img src="../assets/bscscan-logo.png" class="me-2" height="30">
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import moment from 'moment'
export default {
    methods: {
        ...mapActions('factory', [
            'subscribePairCreated'
        ]),
        async fetch() {
            await this.subscribePairCreated()
        },
        pairDate(time) {
            return moment(time).format('hh:mm')
        },
        fullnameToken(token) {
            // let token = this.token(tokenAddress)
            return `${token.name} (${token.symbol})`
        },
        tokenLink(token) {
            return `https://bscscan.com/address/${token.address}`
        },
        pooLink(pair) {
            return `https://poocoin.app/tokens/${pair.token0.address}`
        },
        pancakeLink(pair) {
            return `https://exchange.pancakeswap.finance/#/swap?inputCurrency=${pair.token0.address}&outputCurrency=${pair.token1.address}`
        },
        bscLink(pair) {
            return `https://bscscan.com/address/${pair.address}`
        }
    },
    computed: {
        ...mapGetters('factory', [
            'pairs',
            'token'
        ]),
        nbPairsShown() {
            return 20
        },
        sortedPairs() {
            let nbPair = Math.min(this.pairs.length, this.nbPairsShown)
            return this.pairs.reverse().slice(0, nbPair)
                .map(pair => {
                    return {
                        address: pair.pair,
                        time: pair.time,
                        token0: this.token(pair.token0),
                        token1: this.token(pair.token1)
                    }
                })
        }
    }
}
</script>

<style>
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    /* min-width: 0; */
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    color: #000;
    padding: 5px;
    /* width: 350px; */
    min-width: 0;

    border: 1px solid #7158e2c0;
    border-radius: .25rem;
}

.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 0.25rem;
}

.card-title {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: .25rem;
    font-weight: 600;
    line-height: 1.1;
    cursor: pointer;
}

.table {
    border-collapse: separate!important;
}

.table-sticky-header {
    max-height: 350px;
    overflow-y: auto;

    background-color: #1e272e;
    border: 1px solid #7158e2c0;
    border-radius: .25rem;
}

.table-sticky-header>.table>thead>tr>th {
    position: sticky;
    top: 0;
    z-index: 2;
}

.table .thead-light th {
    color: #292027;
    background-color: #c9cccf;
    border-color: #dee2e6;
}

.table td, .table th {
    /* padding: .75rem; */
    padding: 0.3rem;
    vertical-align: top;
    border-top: 1px solid #454d55;
}

.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
}

.table-dark {
    color: #fff;
    background-color: #343a40;
}

.table .table-dark th {
    padding: .3rem;
    background-color: #c9cccf;
    border-color: #dee2e6;
}

.time {
    width: 55px !important;
    max-width: 55px !important;
}
.tokenName {
    width: 165px;
}
.tokenName, .tokenSymbol {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}
.iconlinks {
    width: 85px!important;
    min-width: 85px!important;
}

.iconlinks img {
    width: 20px;
    height: 20px;
    margin: 0 2px;
}
/* 
.table-dark td, .table-dark th, .table-dark thead th {
    border-color: #454d55;
} */
</style>