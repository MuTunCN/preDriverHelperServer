package cn.mutun.prodriverhelper_exam.Gateway;

/**
 * @Author: shenmengwei
 * @Description:
 * @Date: Created on 2018/5/31 15:37
 * @Modified By:
 */
public class ResponseMsg {
        boolean status;
        int code;
        Object data;
        int total;

        public ResponseMsg() {
        }

        public static ResponseMsg success(Object result) {
            ResponseMsg rest = new ResponseMsg();
            rest.status = true;
            rest.code = 0;
            rest.data = result;
            return rest;
        }

        public static ResponseMsg success(Object result, int total) {
            ResponseMsg rest = new ResponseMsg();
            rest.status = true;
            rest.code = 0;
            rest.data = result;
            rest.total = total;
            return rest;
        }

        public static ResponseMsg fail(int code, String comment) {
            ResponseMsg rest = new ResponseMsg();
            rest.status = false;
            rest.code = code;
            rest.data = comment;
            return rest;
        }

        public boolean isStatus() {
            return this.status;
        }

        public int getCode() {
            return this.code;
        }

        public Object getData() {
            return this.data;
        }

        public int getTotal() {
            return this.total;
        }

        public void setStatus(boolean status) {
            this.status = status;
        }

        public void setCode(int code) {
            this.code = code;
        }

        public void setData(Object data) {
            this.data = data;
        }

        public void setTotal(int total) {
            this.total = total;
        }
        @Override
        public String toString() {
            return "ResponseMsg(status=" + this.isStatus() + ", code=" + this.getCode() + ", data=" + this.getData() + ", total=" + this.getTotal() + ")";
        }
}
