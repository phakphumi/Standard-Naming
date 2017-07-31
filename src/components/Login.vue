<template>
    <div class="col-12 row justify-content-center align-self-center">
        <el-form :model="form" label-width="80px">
            <el-form-item label="User:" prop="user">
                <el-input type="text" v-model="form.user" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Pin:" prop="pin">
                <el-input type="password" v-model="form.pin" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item class="offset-6">
                <el-button type="primary" @click="submitForm()">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: function() {
        return {
            form: {
                user: '',
                pin: ''
            }
        }
    },
    methods: {
        submitForm() {
            axios.post('http://localhost:3000/manage/login', {
                params: {
                    user: this.form.user,
                    pin: this.form.pin
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
        }
    }
}
</script>