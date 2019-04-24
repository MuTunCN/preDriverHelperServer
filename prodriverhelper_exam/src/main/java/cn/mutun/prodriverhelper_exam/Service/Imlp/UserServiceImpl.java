package cn.mutun.prodriverhelper_exam.Service.Imlp;

import cn.mutun.prodriverhelper_exam.Dao.UserDao;
import cn.mutun.prodriverhelper_exam.Entity.Question;
import cn.mutun.prodriverhelper_exam.Entity.UserInfo;
import cn.mutun.prodriverhelper_exam.Entity.UserInfoDO;
import cn.mutun.prodriverhelper_exam.Service.UserService;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.List;
@Service
public class UserServiceImpl implements UserService {

    @Resource
    UserDao userDao;

    @Override
    public List<Question> getWorryPorgrams(UserInfo userInfo) {
        Example example = new Example(UserInfoDO.class);
        example.createCriteria().andEqualTo("nikename",userInfo.getNickName());
        UserInfoDO userInfoDO = userDao.selectOneByExample(example);
        return userDao.listWorryQuestion(userInfoDO.getId());
    }
}

