<template>
    <BoxVue>
        <div class="columns">
            <div class="column is-7">{{ tarefa.descricao || 'Lista de tarefas vazia' }}</div>
            <div class="column">
                <CronometroF :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </BoxVue>
</template>

<script lang="ts">
import ITarefas from '@/interfaces/ITarefas';
import { defineComponent, PropType } from 'vue';
import CronometroF from './Cronometro.vue';
import BoxVue from './Box.vue';



export default defineComponent({
    name: 'ListaTarefas',
    components: {
        CronometroF,
        BoxVue,
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefas>,
            required: true
        }
    },
    
})

</script>