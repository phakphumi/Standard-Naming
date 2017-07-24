<template>
    <div id="tableView">
        <textarea ref="tempField" v-on:blur="splitData" class="text-area-hidden" hidden></textarea>
        <table class="table">
            <thead>
                <tr>
                    <th width="5%"></th>
                    <th class="center-align" width="20%">Logical</th>
                    <th class="center-align"width="20%">Physical</th>
                    <th class="center-align"width="25%">Business</th>
                    <th class="center-align" width="17.5%">Standard Define</th>
                    <th class="center-align" width="17.5%">Length</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(msg,index) in messages">
                    <table-row
                        v-model="msg.logical"
                        v-bind:physical="msg.physical"
                        v-bind:business="msg.business"
                        v-bind:standard-define="msg.standardDefine"
                        v-bind:length="msg.length"
                        v-on:update-data="waitForStopTyping(index)"
                        v-on:add-new-row="addNewRow(index)"
                        v-on:delete-row="deleteRow(index)"
                    ></table-row>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import TableRow from './TableRow'
import axios from 'axios'

export default {
    name: 'tableView',
    data: function() {
            return { 
                    messages : [{
                        logical: '',
                        physical: [{
                            value:'Waiting for your input...', 
                            define: true
                        }],
                        business: '',
                        standardDefine: '',
                        length: 0
                    }]
            }
    },
    methods: {
        addNewRow: function (index) {
            this.messages.splice(index+1,0,{
                logical: '',
                physical: [{value:'Waiting for your input...', define: true}],
                business: '',
                standardDefine: '',
                length: 0
            })
        },
        deleteRow: function (index) {
            if( this.messages.length > 1 ) {
                this.messages.splice(index,1)
            }
        },
        getUpdateDataFromIndex: _.debounce(function(index) {
            if(this.messages[index].logical) {
                axios.get(`http://localhost:3000/match/${this.messages[index].logical}`)
                .then(function (res) {
                    if(res.data.success) {
                        this.messages[index].physical = res.data.msg.physical
                        this.messages[index].business = res.data.msg.business
                        this.messages[index].standardDefine = res.data.msg.standardDefine
                        this.messages[index].length = res.data.msg.physicalLength
                    }
                }.bind(this))
                .catch(function (err) {
                    console.log(err);
                });
            } else {
                this.messages[index].physical = [{value:'Waiting for your input...', define: true}]
                this.messages[index].business = ''
                this.messages[index].standardDefine = ''
                this.messages[index].length = 0
            }
        }, 1000),
        pushData: function(value) {
            axios.get(`http://localhost:3000/match/${value}`)
            .then(function (res) {
                if(res.data.success) {
                    this.messages.push({
                        logical: value,
                        physical: res.data.msg.physical,
                        business: res.data.msg.business,
                        standardDefine: res.data.msg.standardDefine,
                        length: res.data.msg.physicalLength
                    })
                }
            }.bind(this))
            .catch(function (err) {
                console.log(err);
            });
        },
        splitData: function() {
            if(this.messages[this.messages.length-1].logical === ''){
                this.messages.pop()
            }

            this.$refs.tempField.value.split(/\r?\n/g).forEach(this.pushData)

            this.$refs.tempField.value = ''
            this.$refs.tempField.setAttribute("hidden","hidden");
        },
        waitForStopTyping: function(index) {
            this.messages[index].physical = [{
                value:'Waiting for you stop typing...', 
                define: true
            }]
            this.messages[index].business = ''
            this.messages[index].standardDefine = ''
            this.messages[index].length = 0

            this.getUpdateDataFromIndex(index)
        }
    },
    components: {
        TableRow
    }
}
</script>
