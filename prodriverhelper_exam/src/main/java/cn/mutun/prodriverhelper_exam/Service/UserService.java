package cn.mutun.prodriverhelper_exam.Service;

import cn.mutun.prodriverhelper_exam.Entity.Question;
import cn.mutun.prodriverhelper_exam.Entity.UserInfo;

import java.util.List;
import java.util.Map;

public interface UserService {

    List<Question> getWorryPorgrams(UserInfo userInfo);
}
