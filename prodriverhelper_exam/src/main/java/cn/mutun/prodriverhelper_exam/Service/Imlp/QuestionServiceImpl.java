package cn.mutun.prodriverhelper_exam.Service.Imlp;

import cn.mutun.prodriverhelper_exam.Dao.QuestionsDao;
import cn.mutun.prodriverhelper_exam.Entity.Question;
import cn.mutun.prodriverhelper_exam.Service.QuestionService;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.internal.bind.JsonTreeReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.*;

/**
 * @author mutun
 */
@Service
public class QuestionServiceImpl implements QuestionService {

    @Resource
    QuestionsDao qDao;

    @Override
    public List<Question> getRandomQuestions(String pageIndex, String pageSize, String type) {
        pageIndex = String.valueOf(Integer.parseInt(pageIndex) + 1);
        pageSize = String.valueOf(Integer.parseInt(pageSize) / 2);
        List<Question> qs = qDao.listQuestions(pageIndex,pageSize,type);
        pageIndex = String.valueOf(Integer.parseInt(pageIndex) + 1);
        qs.addAll(qDao.listQuestions(pageIndex,pageSize,type));
        return qs;
    }

    @Override
    public List<Question> getAllQuestions(String pageIndex,String pageSize,String type) {
        return qDao.listQuestions(pageIndex,pageSize,type);
    }

    @Override
    public int getTotal(String type) {
        return qDao.getTotal(type);
    }

    @Override
    public Question getOneById(int id) {
        Example example = new Example(Question.class);
        example.createCriteria().andEqualTo("id",id);

        return qDao.selectOneByExample(example);
    }

    @Override
    public List<Question> get(String pageIndex, String pageSize, String key) {
        return qDao.get(pageIndex,pageSize,key);
    }

    @Override
    public int getAllCount() {
        return qDao.selectAll().size();
    }

    @Override
    public void update(Map<String, Object> params) {
        List<Map<String, Object>> dataList = (List<Map<String, Object>>) params.get("data");
        if(dataList.size()>0) {
            for(Map<String, Object> data : dataList) {
                System.out.println(data);
                Gson gson = new Gson();
                JsonElement jsonElement = gson.toJsonTree(data);
                Question question = gson.fromJson(jsonElement,Question.class);
                qDao.updateByPrimaryKey(question);
            }
        }
    }

    @Override
    public void delById(Map<String, Object> params) {
        List<String> ids = (List<String>) params.get("ids");
        if (ids.size() > 0) {
            Example example = new Example(Question.class);
            Example.Criteria criteria = example.createCriteria();
            criteria.andIn("id", ids);
            qDao.deleteByExample(example);
        }
    }

    @Override
    public void insert() {
        Question question = new Question();
        qDao.insert(question);
    }
}
