<template>
    <div>
        <a v-if="!isConnected" @click="connect" class="account-button connect-button">Connect</a>
        <div v-else>
            <a @click="disconnect" class="account-button connected-button">
                <span>{{ address }}</span>
            </a>
        </div>
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
.account-button {
    padding: 5px 10px;
    height: 40px;
    border-radius: 20px;
    user-select: none;
    cursor: pointer;
}

.connect-button {
    border: 2px solid #7158e2;
}
.connect-button:hover {
    color: #0be881;
}

.connected-button {
    border: 2px solid #7158e2;
}
.connected-button span {
    font-size: 0.8rem;
}
.connected-button:hover {
    color: #f53b57;
}
</style>