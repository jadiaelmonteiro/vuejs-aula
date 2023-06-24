<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar ?" v-model="descricao" />
            </div>

            <div class="column">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                    <TemporizadorForm @aoTemporizadorFinalizado="FinalizarTarefa" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import TemporizadorForm from './Temporizador.vue';


export default defineComponent({
    name: 'FormularioCentral',
    emits: ['aoSalvarTarefa'],
    components: {
        TemporizadorForm,

    },
    data() {
        return {
            descricao: '',

        }
    },
    methods: {
        FinalizarTarefa(tempoDecorrido: number): void {
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao
            })
            this.descricao = '';
        }
    }
}) 
</script>

<style>
    .formulario {
        color: var(--text-primario);
        background-color: var(--bg-primario);
    }
</style>