package cn.mutun.prodriverhelper_exam.Service.Imlp;

import cn.mutun.prodriverhelper_exam.Dao.QuestionsDao;
import cn.mutun.prodriverhelper_exam.Dao.UserDao;
import cn.mutun.prodriverhelper_exam.Entity.Question;
import cn.mutun.prodriverhelper_exam.Entity.UserInfoDO;
import cn.mutun.prodriverhelper_exam.Service.QuestionService;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.internal.bind.JsonTreeReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
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

    @Resource
    UserDao uDao;

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

    @Override
    public void updateQuestionInfo(String nickName, int qId, int isWorry) {
        Example example1 = new Example(UserInfoDO.class);
        example1.createCriteria().andEqualTo("nikename",nickName);
        UserInfoDO userInfoDO = uDao.selectOneByExample(example1);
        qDao.addQuestion(userInfoDO.getId(),qId);
        if (isWorry > 0) {
            qDao.addWorryQuestion(userInfoDO.getId(),qId);
        }

    }

    @Override
    public List<Map<String, Integer>> getStatistic() {
        int total = qDao.selectAll().size();
        int count = qDao.selectAnsweredQuestion();
        List<Map<String,Integer>> result = new ArrayList<>();
        Map map = new HashMap();
        map.put("name","答题量");
        map.put("data",count);
        result.add(map);
        map = new HashMap();
        map.put("name","总数");
        map.put("data",total);
        result.add(map);
        return result;

    }
}
