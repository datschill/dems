<template>
    <div>
        <a v-if="!isConnected" @click="connect" class="button connect-button">Connect</a>
        <a v-else @click="disconnect" class="button connected-button">
            <span>{{ address }}</span>
        </a>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'AccountBlock',
    methods: {
        ...mapActions('ethers', [
            'connectWallet',
            'disconnectWallet'
        ]),
        async connect() {
            await this.connectWallet()
        },
        async disconnect() {
            await this.disconnectWallet()
        }
    },
    computed: {
        ...mapGetters('ethers', [
            'address',
            'isConnected'
        ])
    }
}
</script>

<style scoped>
.connect-button:hover {
    color: #0be881;
}

.connected-button span {
    font-size: 0.8rem;
}
.connected-button:hover {
    color: #f53b57;
}
</style>