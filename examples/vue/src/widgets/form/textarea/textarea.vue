
<template>
    <div class="textfield textarea"
         :class="cls"
         :id="id"
         :style="styles"
         :trigger-type="triggerType"
         v-show="!hidden" >

        <textarea class="textfield-input textarea-input"
                  :class="invalidClass"
                  :rows="rows"
                  :cols="cols"
                  :placeholder="placeholder"
                  :disabled="disabled"
                  :readonly="readonly"
                  :value="value"
                  @keypress="onKeyPress"
                  @input="onInput($event.target.value)"
                  @focus="onFocus($event)"
                  ref="input"
                  :qcls="invalidType"
                  :qanchor="invalidPosition"
                  v-qtip="invalidText"
                  wrap="off"
        ></textarea>
        <button v-if="triggerType && triggerType !== 'text'"
                class="textfield-trigger textarea-trigger"
                type="button" @click="
                onTrigger">

            <i class="fa"
               :class="'fa-' + triggerType"></i>
        </button>
    </div>
</template>

<style lang="stylus">
    .textarea
        height: auto;
        .textarea-input
            resize: none;
            line-height: 1.5;
            padding: 5px 8px;
</style>

<script>
    /**
     * Created by ued on 2016/12/28.
     */

    import Textfield from '../textfield/textfield.vue';
    export default {
        mixins: [
            Textfield
        ],

        props: {
            rows: {
                type: Number,
                'default': 3
            },

            cols: {
                type: Number
            }
        }


    };
</script>
