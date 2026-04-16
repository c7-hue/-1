import { ref, getCurrentInstance, onMounted } from 'vue'
import { deleteFileApi } from '../api';
import { useCode } from "../hooks/code";
import { useUserStore } from "../store/user";
import type { FileData } from "../utils/interface";  

const userStore = useUserStore()
const { tackleCode } = useCode()

export function useFile() {
  const proxy: any = getCurrentInstance()?.proxy

    //删除文件
    const deleteFile = (data: { id: number | string, url: string | string[] }) => {
        let request = {
            token: userStore.token,
            filesId: data.id,
            filesUrl: data.url,
        }
        deleteFileApi(request).then((res: any) => {
            if (tackleCode(res.code)) {
                //前端数组静态删除
                console.log(res)
                proxy.$message({ type: 'success', message: '删除成功' })
            }
        })
    }

    return { deleteFile }
}