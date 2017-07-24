<template>
    <div id="tableView">
        <div col-12>
            <textarea ref="tempField" v-on:blur="splitData" class="text-area-hidden" hidden></textarea>
            <button
                class="hidden-copy-button"
                ref="copyData"
                v-clipboard="copyData"
                v-on:success="handleClipboardSuccess"
                v-on:error="handleClipboardError"
            ></button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th class="center-align" width="5%">
                        <a href="#" v-on:click="updateCopyData(rowData)" title="Copy data to clipboard">
                            <img src="../assets/images/clippy.svg" width="25" height="25">
                        </a>
                    </th>
                    <th class="center-align" width="20%">Logical</th>
                    <th class="center-align"width="20%">Physical</th>
                    <th class="center-align"width="25%">Business</th>
                    <th class="center-align" width="17.5%">Standard Define</th>
                    <th class="center-align" width="17.5%">Length</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(data,index) in rowData">
                    <table-row
                        v-model="data.logical"
                        v-bind:physical="data.physical"
                        v-bind:business="data.business"
                        v-bind:standard-define="data.standardDefine"
                        v-bind:length="data.length"
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
                    rowData : [{
                        logical: '',
                        physical: [{
                            value:'Waiting for your input...', 
                            define: true
                        }],
                        business: '',
                        standardDefine: '',
                        length: 0
                    }],
                    copyData : 'copyData'
            }
    },
    methods: {
        addNewRow: function (index) {
            this.rowData.splice(index+1,0,{
                logical: '',
                physical: [{value:'Waiting for your input...', define: true}],
                business: '',
                standardDefine: '',
                length: 0
            })
        },
        deleteRow: function (index) {
            if( this.rowData.length > 1 ) {
                this.rowData.splice(index,1)
            }
        },
        getUpdateDataFromIndex: _.debounce(function(index) {
            if(this.rowData[index].logical) {
                axios.get(`http://localhost:3000/match/${this.rowData[index].logical}`)
                .then(function (res) {
                    if(res.data.success) {
                        this.rowData[index].physical = res.data.msg.physical
                        this.rowData[index].business = res.data.msg.business
                        this.rowData[index].standardDefine = res.data.msg.standardDefine
                        this.rowData[index].length = res.data.msg.physicalLength
                    }
                }.bind(this))
                .catch(function (err) {
                    console.log(err);
                });
            } else {
                this.rowData[index].physical = [{value:'Waiting for your input...', define: true}]
                this.rowData[index].business = ''
                this.rowData[index].standardDefine = ''
                this.rowData[index].length = 0
            }
        }, 500),
        handleClipboardSuccess: function(e) {
            alert('Copy Success')
        },
        handleClipboardError: function(e) {
            alert('Copy Failed')
            console.log(e);
        },
        pushData: function(value) {
            axios.get(`http://localhost:3000/match/${value}`)
            .then(function (res) {
                if(res.data.success) {
                    this.rowData.push({
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
            if(this.rowData[this.rowData.length-1].logical === ''){
                this.rowData.pop()
            }

            this.$refs.tempField.value.split(/\r?\n/g).forEach(this.pushData)

            this.$refs.tempField.value = ''
            this.$refs.tempField.setAttribute("hidden","hidden");
        },
        updateCopyData: function(rowData) {
            Promise.all(rowData.map(function(data) {
                return new Promise(function(resolve, reject) {
                    Promise.all(data.physical.map(function(physical) {
                        return new Promise(function(resolve, reject) {
                            resolve(physical.value)
                        })
                    })).then(function(res) {
                        var combinePhysical = res.reduce(function(a, b) {
                            return a + '_' + b
                        })

                        return combinePhysical
                    }).then(function(combinePhysical){
                        resolve(data.logical + '\t' + combinePhysical + '\t' + data.business)
                    })
                })
            })).then(function(data) {
                var rowData = data.reduce(function(a, b) {
                    return a + '\n' + b
                })

                return rowData
            }).then(function(rowData){
                this.copyData = rowData
            }.bind(this))
            .then(function() {
                this.$refs.copyData.click()
            }.bind(this))
        },
        waitForStopTyping: function(index) {
            this.rowData[index].physical = [{
                value:'Waiting for you stop typing...', 
                define: true
            }]
            this.rowData[index].business = ''
            this.rowData[index].standardDefine = ''
            this.rowData[index].length = 0

            this.getUpdateDataFromIndex(index)
        }
    },
    components: {
        TableRow
    }
}
</script>
