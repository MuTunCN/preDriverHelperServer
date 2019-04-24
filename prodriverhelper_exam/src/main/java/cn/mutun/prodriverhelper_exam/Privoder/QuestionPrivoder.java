package cn.mutun.prodriverhelper_exam.Privoder;

import cn.mutun.prodriverhelper_exam.Util.SqlUtil;

public class QuestionPrivoder {

    public String listQuestions(String pageIndex,String pageSize,String type) {
        int index = Integer.parseInt(pageIndex);
        int size = Integer.parseInt(pageSize);
        int start = index*size;
        String sql ="SELECT * FROM predriverhelper.questions where type = {type} limit {start},{size}";
        sql = sql.replace("{type}",type)
                .replace("{start}",String.valueOf(start))
                .replace("{size}",String.valueOf(size));
        System.out.println(sql);
        return sql;
    }

    public String getTotal(String type) {
        String sql = "SELECT count(*) FROM predriverhelper.questions where type = {type} ";
        sql = sql.replace("{type}",type);
        return sql;
    }

    public String get(String pageIndex,String pageSize,String key) {
        StringBuffer sql = new StringBuffer();
        int index = Integer.parseInt(pageIndex);
        int size = Integer.parseInt(pageSize);
        int start = index*size;
        sql.append( "SELECT * FROM predriverhelper.questions ");
        if(key != null && !"".equals(key)){
            sql.append(" WHERE title like '%"+key+"%' ");
        }
        sql.append(" limit "+start+","+size);
        return sql.toString();
    }
}
