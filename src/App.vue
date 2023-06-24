<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioCentral @aoSalvarTarefa="salvarTarefas" />
      <div class="lista">
        <ListaTarefas v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <BoxVue v-if="listaEstaVazia">
          Você não está muito produtivo hoje :(
        </BoxVue>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue'
import FormularioCentral from './components/Formulario.vue';
import ListaTarefas from './components/ListaTarefas.vue';
import BoxVue from './components/Box.vue';

import ITarefas from './interfaces/ITarefas';



export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
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
    trocarTema(modoEscuroAtivo: boolean){
      this.modoEscuroAtivo = modoEscuroAtivo;
    }
  }

});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --text-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>


