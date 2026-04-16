<template>
  <div class="editor-container">
    <yk-affix :offset="60" @change="toolbarTop">
       <Toolbar class="toolbar" :class="{'istop':top}" :editor="editorRef"
          :defaultConfig="toolbarConfig" :mode="mode" />
    </yk-affix>
    <div class="editor-main">
      <slot></slot>
       <Editor style="height: 600px; min-height: 600px; overflow-y: auto;" v-model="valueHtml"
          :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" @onChange="onChange"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted,watch } from 'vue'
// @ts-ignore 无法找到声明文件，暂时忽略类型检查
import { Editor, Toolbar,InsertFnType } from '@wangeditor/editor-for-vue'
import './style.less'
import type { IToolbarConfig ,IEditorConfig} from '@wangeditor/editor'
import {colors} from './colors'
import {uploadFileApi} from '../../api/index'
import {baseImgUrl,baseUrl} from '../../utils/env'



const emits=defineEmits(['editors'])

const props = defineProps(["content"])

// 工具栏固定
const top = ref<boolean>(false)
const toolbarTop = (e:boolean) => {
  top.value = e 
}
// 创建 toolbar ，或者传入 Vue React <Toolbar> 组件中

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref()
valueHtml.value=props.content
// 编辑器模式
const mode = ref('default')

// 监听 props.content 变化
watch(
  ()=>props.content,
  (e)=>{
  valueHtml.value=e
})

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    "blockquote",
    "headerSelect",
    "|",
    "bold",
    "underline",
    "through",
    "italic",
    "color",
    "bgColor",
    "clearStyle",
    "|",
    "bulletedList",
    "numberedList",
    "todo",
    {
      key: "group-justify",
      title: "对齐",
      iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z" fill="currentColor"/></svg>',
      menuKeys: [
        "justifyLeft",
        "justifyRight",
        "justifyCenter",
        "justifyJustify"
      ],
    },
    {
      key: "group-indent",
      title: "缩进",
      iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384z" fill="currentColor"/></svg>',
      menuKeys: ["indent", "delIndent"],
    },
    "|",
    "emotion",
    "insertLink",
    "uploadImage",
    "insertVideo",
    "insertTable",
    "|",
    "code",
    "codeBlock",
  ],
}

// 菜单配置
const editorConfig: Partial<IEditorConfig> = {
  placeholder:'请输入内容...',
  MENU_CONF:{
    color:{
      colors,
    },
    bgColor:{
      colors,
    },
    uploadImage:{
      async customUpload(file:File,insertFn:InsertFnType){
        const formData = new FormData()
        formData.append('file', file)
        uploadFileApi(formData).then((res:any)=>{
          let url = baseImgUrl+'/'+res.data.url
          insertFn(url,res.data.url,url)
        }).catch((error:any)=>{
          console.error('上传失败:', error)
        })
      }
      // server:'http://localhost:3001/upload',
    }
  }
} as any

// 添加默认对齐方式
;(editorConfig as any).defaultAlign = 'left'

// 获取内容
const onChange = () => {
  emits('editors',valueHtml.value)
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  // 设置默认对齐方式为左对齐
  editor.focus()
  // 移除 execCommand 调用，因为 API 可能已变更
  // console.log(editor.getAllMenuKeys);
}

</script>
<style lang="less" scoped>
.toolbar{
  border-radius: @radius-s;
  width: 1200px;
  background: @bg-color-l;
}

.istop{
  box-shadow: @shadow-m;
}

.editor-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.editor-main{
  padding-top: @space-xl;
  padding-left: 190px;
  padding-right: 190px;
  margin-top: @space-s;
  border-radius: @radius-m;
  background: @bg-color-l;
  width: 1200px;
  display: flex;
  flex-direction: column;
  // align-items: center;// 居中对齐，使内容居中显示
}
</style>
