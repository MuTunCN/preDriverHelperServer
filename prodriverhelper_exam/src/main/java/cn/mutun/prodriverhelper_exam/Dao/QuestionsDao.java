package cn.mutun.prodriverhelper_exam.Dao;

import cn.mutun.prodriverhelper_exam.Privoder.QuestionPrivoder;
import cn.mutun.prodriverhelper_exam.Entity.Question;
import org.apache.ibatis.annotations.SelectProvider;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

/**
 * @author mutun
 * @date 2019/3/11
 */
public interface QuestionsDao extends Mapper<Question> {

    @SelectProvider(type = QuestionPrivoder.class, method = "listQuestions")
    List<Question> listQuestions(String pageIndex,String pageSize,String type);

    @SelectProvider(type = QuestionPrivoder.class, method = "getTotal")
    int getTotal(String type);

    @SelectProvider(type = QuestionPrivoder.class, method = "get")
    List<Question> get(String pageIndex, String pageSize ,String key);

    @SelectProvider(type = QuestionPrivoder.class, method = "addWorryQuestion")
    void addWorryQuestion(int uId,int qId);

    @SelectProvider(type = QuestionPrivoder.class, method = "addQuestion")
    void addQuestion(int uId,int qId);
}
