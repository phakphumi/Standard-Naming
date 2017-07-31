<template>
  <div id="showTable" class="col-12">
    <data-tables 
      :data="data" 
      :actions-def="actionsDef"
      stripe
    >
      <el-table-column 
        prop="logical" 
        label="Logical" 
        key="Logical"
        sortable
        width="220">
      </el-table-column>
      <el-table-column 
        prop="physical" 
        label="Physical" 
        key="Physical"
        sortable
        width="150">
      </el-table-column>
      <el-table-column 
        prop="business" 
        label="Business" 
        key="Business"
        sortable
        width="240">
      </el-table-column>
      <el-table-column 
        prop="type" 
        label="Type" 
        key="Type"
        sortable
        width="100"
        align="center"
        :formatter="typeFormatter">
      </el-table-column>
      <el-table-column 
        prop="created" 
        label="Created" 
        key="Created"
        sortable
        width="120"
        align="center">
      </el-table-column>
      <el-table-column 
        prop="updated" 
        label="Updated" 
        key="Updated"
        sortable
        width="120"
        align="center">
      </el-table-column>
      <el-table-column 
        prop="approved" 
        label="Approved By" 
        key="Approved By"
        sortable
        width="150"
        align="center">
      </el-table-column>
      <el-table-column 
        label="Request"
        width="150"
        align="center">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </data-tables>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Logical" :label-width="formLabelWidth">
          <el-input v-model="form.logical" :disabled="logicalDisable" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Physical" :label-width="formLabelWidth">
          <el-input v-model="form.physical" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Business" :label-width="formLabelWidth">
          <el-input v-model="form.business" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmDialog">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

var data = [{
  "logical": "",
  "physical": "",
  "business": "",
  "type": "",
  "created": "",
  "updated": "",
  "approved": ""
}];

export default {
  name: 'showTable',
  data: function() {
    return {
      logicalDisable: false,
      dialogTitle: '',
      dialogFormVisible: false,
      old_form: {
        physical: '',
        business: '',
        type: ''
      },
      form: {
          formType: '',
          logical: '',
          physical: '',
          business: '',
          type: ''
        },
      formLabelWidth: '120px',
      data,
      actionsDef: {
        colProps: {
          span: 19
        },
        def: [{
          name: 'Standard Request',
          handler: () => {
            this.dialogTitle = 'Request New Standard'

            this.form.formType = 'new'
            this.form.logical = '',
            this.form.physical = '',
            this.form.business = '',
            this.form.type = ''

            this.dialogFormVisible = true
            this.logicalDisable = false
          }
        }]
      }
    }
  },
  methods: {
    confirmDialog() {
      this.dialogFormVisible = false
      
      if(this.form.formType === 'new') {
        this.$confirm(`Are you sure to send new standard request?`, 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then((res) => {
          axios.post('http://localhost:3000/request/insert', {
            params: {
              logical: this.form.logical,
              old_physical: '',
              old_business: '',
              old_priority: '',
              new_physical: this.form.physical,
              new_business: this.form.business,
              new_priority: '',
              request_by: 'admin'
            }
          }).then(function(response) {
            this.$message({
              type: 'success',
              message: 'New standard request has been sent. Please wait for approval.'
            })
          }.bind(this)).catch(function(error) {
            this.$message({
              type: 'error',
              message: `${error}`
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'New standard request is canceled'
          });          
        });
      } else {
        this.$confirm(`Are you sure to send update standard request?`, 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then((res) => {
          axios.put('http://localhost:3000/request/update', {
            params: {
              logical: this.form.logical,
              old_physical: this.old_form.physical,
              old_business: this.old_form.business,
              old_priority: this.old_form.type,
              new_physical: this.form.physical,
              new_business: this.form.business,
              new_priority: '',
              request_by: 'admin'
            }
          }).then(function(response) {
            this.$message({
              type: 'success',
              message: 'Update standard request has been sent. Please wait for approval.'
            })
          }.bind(this)).catch(function(error) {
            this.$message({
              type: 'error',
              message: `${error}`
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Update standard request is canceled'
          });          
        });
      }
    },
    handleEdit(index, row) {
      this.dialogTitle = 'Request Edit Standard'
      this.form.formType = 'edit'
      this.form.logical = row.logical
      this.form.physical = this.old_form.physical = row.physical
      this.form.business = this.old_form.business = row.business
      this.form.type = this.old_form.type = row.type

      this.logicalDisable = true
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      this.$confirm(`Are you sure to send delete request for '${row.logical}'?`, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then((res) => {
        axios.delete('http://localhost:3000/request/delete', {
          params: {
            logical: row.logical,
            old_physical: row.physical,
            old_business: row.business,
            old_priority: row.type,
            new_physical: '',
            new_business: '',
            new_priority: '',
            request_by: 'admin'
          }
        }).then(function(response) {
          this.$message({
            type: 'success',
            message: 'Delete request has been sent. Please wait for approval.'
          })
        }.bind(this)).catch(function(error) {
          this.$message({
            type: 'error',
            message: `${error}`
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete request is canceled'
        });          
      });
    },
    fetchData() {
      axios.get('http://localhost:3000/fetch')
      .then(function (res) {
        if(res.data.success) {
          this.data = res.data.msg
        }
      }.bind(this))
      .catch(function (err) {
          console.log(err)
      })
    },
    typeFormatter(row, col, cellValue) {
      switch(cellValue) {
        case 1:
          return 'KBMF'
        case 2:
          return 'Words'
        case 3:
          return 'Word'
        default:
          return 'Word'
      }
    }
  },
  created: function() {
    this.fetchData()
  }
}
</script>