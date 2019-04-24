package cn.mutun.prodriverhelper_exam.Util;


import java.util.Iterator;
import java.util.UUID;

/**
 * @author wd824
 */
public class SqlUtil {

    private final static String PAGE_SQL = "select * from( select rownum num, * from ( ${sql} ))where " +
            "num >=({pageIndex}-1)*{pageSize}+1 and num<={pageIndex}*{pageSize}";

    private final static String PAGE_COUNT_SQL = "select convert(int,count(1)) as num from ( ${sql} )";

    public final static String getPageSql(String sql, String pageIndex, String pageSize) {
        return PAGE_SQL.replace("${sql}", sql)
                .replace("{pageIndex}", pageIndex)
                .replace("{pageSize}", pageSize);
    }

    public final static String getPageCountSql(String sql) {
        return PAGE_COUNT_SQL.replace("${sql}", sql);
    }


    public static String newGUID() {
        return UUID.randomUUID().toString().toUpperCase();
    }

    /**
     * 防SQL注入
     * @param strHand 参数
     * @return
     */
    public static String filterSqlChar(String strHand)
    {
        StringBuffer regVal = new StringBuffer();
        regVal.append("and|exec|insert|select|delete|update|count|");
        regVal.append("chr|mid|master|truncate|char|declare|or|from|");
        regVal.append("*|'|%|^|&|?|;|-|+|<|>|{|}|\\|:|@");
        try
        {
            if ((strHand != null) &&
                    (!"".equals(strHand)) && (strHand.length() > 0))
            {
                strHand = strHand.toLowerCase();
                String[] arrayVal = regVal.toString().split("\\|");
                for (int i = 0; i < arrayVal.length; i++) {
                    if (strHand.contains(arrayVal[i])) {
                        strHand = strHand.replace(arrayVal[i], "");
                    }
                }
            }
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return strHand;
    }



    public static void main(String[] args) {
        System.out.println(filterSqlChar("ce's"));
    }
}
