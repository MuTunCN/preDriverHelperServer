package cn.mutun.prodriverhelper_exam.Service;

import cn.mutun.prodriverhelper_exam.Entity.Question;

import java.util.List;
import java.util.Map;

/**
 * 题库相关
 * @author mutun
 */
public interface QuestionService  {
    /**
     * 分页获取题目
     * @param pageIndex 页数
     * @param pageSize 每页大小
     * @param type 科目几
     * @return 题目集合
     */
    List<Question> getAllQuestions(String pageIndex,String pageSize,String type);

    /**
     * 获取所有题目数
     * @param type 科目几
     * @return 题目数
     */
    int getTotal(String type);

    /**
     * 获取随机题目组合
     * index+1 size/2 错位获取
     * @param pageIndex 页数
     * @param pageSize 每页大小
     * @param type 科目几
     * @return 题目集合
     */
    List<Question> getRandomQuestions(String pageIndex,String pageSize,String type);

    /**
     * 通过id找题目
     * @param id
     * @return
     */
    Question getOneById(int id);

    /**
     * 更新用户
     * @param params
     */
    void update(Map<String,Object> params);



    /**
     * 删除
     * @param params
     */
    void delById(Map<String,Object> params);

    /**
     * 增加
     */
    void insert();

    List<Question> get(String pageIndex, String pageSize, String key);

    int getAllCount();
}
