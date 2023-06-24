<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <CronometroF :tempoEmSegundos="tempoEmSegundos" />

        <button class="button" @click="iniciar" :disabled="cronometroRodando">
            <span cllass="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finalizar" :disabled="!cronometroRodando">
            <span  cllass="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
    
</template>


<script lang="ts">

import { defineComponent } from 'vue';
import CronometroF from './Cronometro.vue';



export default defineComponent({
    name: 'TemporizadorForm',
    emits: ['aoTemporizadorFinalizado'],
    components: {
        CronometroF,
       
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false,
        }
    },
    methods: {
        iniciar() {
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1
            }, 1000);
            this.cronometroRodando = true;

        },
        finalizar() {
            clearInterval(this.cronometro);
            this.cronometroRodando = false;
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        },
    }
}) 
</script>

<style>
.button {
    margin-left: 1.5rem;
}
</style>