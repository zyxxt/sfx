
<template>
    <div>
        <sf-tab-panel>
            <sf-tab-item title="按钮上传">
                <sf-fileupload iconCls="fa-edit"
                               v-model="result"
                               url="/bbc/upload/"
                               :params="uploadParams"
                               accept=".vue" :beforeUpload="beforeUpload"><lang>点我上传文件</lang></sf-fileupload>
                <p>返回结果：{{JSON.stringify(result)}}</p>

                <sf-fileupload iconCls="fa-edit"
                               v-model="together"
                               url="/bbc/upload/"
                               :multiple="true"
                               accept=".pkg"
                               :params="uploadParams"
                               :uploadTogether="true" :beforeUpload="beforeUploadPromise"><lang>并行上传文件</lang></sf-fileupload>
                <p>返回结果：{{JSON.stringify(together)}}</p>
            </sf-tab-item>
            <sf-tab-item title="拖动上传">
                <sf-fileupload url="/bbc/upload" :draggable="true"><lang>拖动到此位置上传</lang></sf-fileupload>
            </sf-tab-item>
            <sf-tab-item title="v-upload">
                <sf-table :options="options" :default-height="300" v-upload>
                    <sf-table-column data-index="a">test</sf-table-column>
                </sf-table>
            </sf-tab-item>
        </sf-tab-panel>
    </div>
</template>

<style lang="stylus" scoped>
    
</style>

<script>
    /**
     * Created by ued on 2016/12/27.
     */

    import { sleep } from 'src/util/timer';

    export default {
        data () {
            return {
                uploadParams: {
                    type: 'aaa',
                    abc: 'fdafdsa'
                },
                result: '',
                together: '',
                options: {
                    data: [{
                        a: 'aaaaaaaaaaaaaa',
                        selectAble: true,
                        selected: false
                    }]
                }
            };
        },

        methods: {
            beforeUpload (files) {
                this.$showErr(files.map(file => file.name).toString());
                return false;
            },

            beforeUploadPromise (files) {
                this.$mask();
                return sleep('xxx', 3000).then(() => {
                    this.$unmask();
                    
//                    this.$showErr(files.map(file => file.name).toString());
                    return true;
                });
            }
        }
    };
</script>
