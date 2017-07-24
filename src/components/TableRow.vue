<template>
    <tr id="tableRow">
        <td class="center-align">
            <a href="#" v-on:click="deleteRow()" title="Delete row"><img src="../assets/images/remove.png" width="15" height="15"></a>
        </td>
        <td>
            <input
                ref="logical"
                v-bind:value="value"
                v-on:input="updateValue($event.target.value)"
                v-on:keyup.enter="addNewRow($event.target.value)"
                v-on:paste="sendToTextarea()"
            >
        </td>
        <td>
            <div class="row">
                <template v-for="(obj, index) in physical">
                    <combine-physical
                        v-bind:physical="obj.value"
                        v-bind:define="obj.define"
                        v-bind:index="index"
                    ></combine-physical>
                </template>
            </div>
        </td>
        <td>
            {{ business }}
        </td>
        <td ref="std_def" class="center-align">
            {{ standardDefine }}
        </td>
        <td ref="length" class="center-align">
            {{ length }}
        </td>
    </tr>
</template>

<script>
import CombinePhysical from './CombinePhysical'

export default {
    name: 'tableRow',
    props: {
        business: {
            type: String,
            default: ''
        },
        length: {
            type: Number,
            default: 0
        },
        physical: {
            type: Array,
            default: ''
        },
        standardDefine: {
            type: String,
            default: 'NO'
        },
        value: {
            type: String,
            default: ''
        }
    },
    mounted: function () {
            this.setFocus()
            this.changeFontInRowColor()
        },
        updated: function () {
            this.setFocus()
            this.changeFontInRowColor()
        },
    methods: {
        addNewRow: function (value) {
            if(value !== '') {
                this.$emit('add-new-row')
            }
        },
        changeFontInRowColor: function() {
            if(this.$refs.std_def.textContent.trim() === 'YES') {
                this.$refs.std_def.style.color="GREEN"
            } else {
                this.$refs.std_def.style.color="RED"
            }

            if(this.$refs.length.textContent.trim() > 30) {
                this.$refs.length.style.color="RED"
            } else {
                this.$refs.length.style.color="#959A95"
            }
        },
        deleteRow: function () {
            this.$emit('delete-row')
        },
        focusOnInput: function() {
            this.$refs.logical.focus()
        },
        setFocus: function () {
            this.$refs.logical.focus()
        },
        sendToTextarea: function(e) {
            this.$parent.$refs.tempField.removeAttribute('hidden')
            this.$parent.$refs.tempField.focus()

            setTimeout(this.focusOnInput, 10);
        },
        updateValue: function (value) {
            this.$emit('input', value)
            this.$emit('update-data')
        }
    },
    components: {
        CombinePhysical
    }
}
</script>
