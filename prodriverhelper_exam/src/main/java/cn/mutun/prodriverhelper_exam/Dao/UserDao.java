package cn.mutun.prodriverhelper_exam.Dao;

import cn.mutun.prodriverhelper_exam.Entity.Question;
import cn.mutun.prodriverhelper_exam.Entity.UserInfoDO;
import cn.mutun.prodriverhelper_exam.Privoder.QuestionPrivoder;
import cn.mutun.prodriverhelper_exam.Privoder.UserPrivoder;
import org.apache.ibatis.annotations.SelectProvider;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface UserDao extends Mapper<UserInfoDO> {

    @SelectProvider(type = UserPrivoder.class, method = "listWorryQuestion")
    List<Question> listWorryQuestion(Integer uid);

}
