<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar ?" v-model="descricao" />
            </div>

            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
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

import { computed, defineComponent } from 'vue';
import { TipoNotificacao } from "@/interfaces/INotificacao";
import TemporizadorForm from './Temporizador.vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { ADICIONA_TAREFA, NOTIFICAR } from "../store/tipo-mutacoes";
import { store } from '../store/index';

export default defineComponent({
    name: 'FormularioCentral',
    emits: ['aoSalvarTarefa'],
    components: {
        TemporizadorForm,

    },
    data() {
        return {
            descricao: '',
            idProjeto: '',
        }
    },
    methods: {
        FinalizarTarefa(tempoDecorrido: number): void {
            const projeto = this.projetos.find((p) => p.id == this.idProjeto); // primeiro, buscamos pelo projeto

            // if (!projeto) {
            //     store.commit(NOTIFICAR, {
            //         titulo: 'Ops!',
            //         texto: "Selecione um projeto antes de finalizar a tarefa!",
            //         tipo: TipoNotificacao.FALHA,
            //     });
            //     return;
            // }

            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
            });

            store.commit(ADICIONA_TAREFA, {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
            });

            this.descricao = '';
        }
    },
    setup() {
        const store = useStore(key)
        return {
            projetos: computed(() => store.state.projetos)
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