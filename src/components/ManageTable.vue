<template>
  <div class="col-12">
    <el-table
      :data="data"
      style="width: 100%"
      stripe>
      <el-table-column type="expand">
        <template scope="props">
          <template v-if="props.row.request_type === 'insert'">
            <h3>Add these data to database</h3>
            <p><b>Physical:</b> {{ props.row.new_physical }}</p>
            <p><b>Business:</b> {{ props.row.new_business }}</p>
            <p><b>Type:</b> {{ props.row.new_type === 2 ? 'Words' : 'Word' }}</p>
          </template>
          <template v-else-if="props.row.request_type === 'update'">
            <h3>Old Data</h3>
            <p><b>Physical:</b> {{ props.row.old_physical }}</p>
            <p><b>Business:</b> {{ props.row.old_business }}</p>
            <p><b>Type:</b> {{ props.row.old_type === 2 ? 'Words' : 'Word' }}</p>
            <h3>Update these data to database</h3>
            <p><b>Physical:</b> {{ props.row.new_physical }}</p>
            <p><b>Business:</b> {{ props.row.new_business }}</p>
            <p><b>Type:</b> {{ props.row.new_type === 2 ? 'Words' : 'Word' }}</p>
          </template>
          <template v-else="props.row.request_type === 'delete'">
            <h3>Remove theses data from database</h3>
            <p><b>Physical:</b> {{ props.row.old_physical }}</p>
            <p><b>Business:</b> {{ props.row.old_business }}</p>
            <p><b>Type:</b> {{ props.row.old_type === 2 ? 'Words' : 'Word' }}</p>
          </template>
          <el-button
          type="danger"
          @click="handleDecline(props.$index, props.row.id)">Decline</el-button>
          <el-button
          type="success"
          @click="handleApprove(props.$index, props.row)">Approve</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="Logical"
        prop="logical"
        width="200">
      </el-table-column>
      <el-table-column
        label="Request"
        prop="request_type"
        align="center"
        width="343">
        <template scope="scope">
          <el-tag
            :type="scope.row.request_type === 'insert' ? 'success' :
                  scope.row.request_type === 'update' ? 'warning' : 'danger'"
            close-transition>{{ scope.row.request_type.toUpperCase() }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="Request By"
        prop="request_by"
        align="center"
        width="343">
      </el-table-column>
      <el-table-column
        label="Request Date"
        prop="request_date"
        align="center"
        width="344">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'

  // var data = [{
  //   "request_type": "",
  //   "logical": "",
  //   "old_physical": "",
  //   "new_physical": "",
  //   "old_business": "",
  //   "new_business": "",
  //   "old_type": "",
  //   "new_type": "",
  //   "request_by": "",
  //   "request_date": "",
  // }];

  export default {
    data: function() {
      return {
        data: []
      }
    },
    methods: {
      handleApprove(index, request_id) {
        this.$confirm(`Are you sure to approve this request`, 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then((res) => {
          axios.put('http://localhost:3000/request/approve', {
            params: request_id
          }).then(function(response) {
            this.data.splice(index, 1)

            this.$message({
              type: 'success',
              message: 'Request already been approved.'
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
            message: 'Approval is canceled'
          });          
        });
      },
      handleDecline(index, request_id) {
        this.$confirm(`Are you sure to decline this request`, 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then((res) => {
          axios.delete('http://localhost:3000/request/decline', {
            params: {
              id: request_id,
            }
          }).then(function(response) {
            this.data.splice(index, 1)

            this.$message({
              type: 'success',
              message: 'Request already been declined.'
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
            message: 'Decline is canceled'
          });          
        });
      },
      fetchRequest() {
        axios.get('http://localhost:3000/request/fetch')
        .then(function (res) {
          if(res.data.success) {
            this.data = res.data.msg
          }
        }.bind(this))
        .catch(function (err) {
            console.log(err)
        })
      }
    },
    created: function() {
      this.fetchRequest()
    }
  }
</script>