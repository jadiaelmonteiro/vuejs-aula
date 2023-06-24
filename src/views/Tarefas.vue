<template>
    <FormularioCentral @aoSalvarTarefa="salvarTarefas" />
    <div class="lista">
        <ListaTarefas v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <BoxVue v-if="listaEstaVazia">
            Você não está muito produtivo hoje :(
        </BoxVue>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import FormularioCentral from '../components/Formulario.vue';
import ListaTarefas from '../components/ListaTarefas.vue';
import BoxVue from '../components/Box.vue';

import ITarefas from '../interfaces/ITarefas';

export default defineComponent({
    name: 'App',
    components: {
        FormularioCentral,
        ListaTarefas,
        BoxVue,
    },
    data() {
        return {
            tarefas: [] as ITarefas[],
            modoEscuroAtivo: false
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0
        }
    },
    methods: {
        salvarTarefas(tarefa: ITarefas) {
            this.tarefas.push(tarefa);
        },
        trocarTema(modoEscuroAtivo: boolean) {
            this.modoEscuroAtivo = modoEscuroAtivo;
        }
    }

});
</script>
  
  
  