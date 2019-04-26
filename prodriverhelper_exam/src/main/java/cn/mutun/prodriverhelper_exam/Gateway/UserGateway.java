package cn.mutun.prodriverhelper_exam.Gateway;


import cn.mutun.prodriverhelper_exam.Entity.Question;
import cn.mutun.prodriverhelper_exam.Entity.UserInfo;
import cn.mutun.prodriverhelper_exam.Service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*",maxAge = 3600)
public class UserGateway {

    @Resource
    UserService userService;

    @PostMapping("/login")
    public ResponseMsg getLoginInfo(@RequestParam(value = "userInfo") UserInfo userInfo){
        try {
            System.out.println(userInfo);
            return ResponseMsg.success(1);
        } catch (Exception e) {
            return ResponseMsg.fail(-1,e.getMessage());
        }

    }

    @PostMapping("/getWorryPrograms")
    public ResponseMsg getWorryPrograms( UserInfo userInfo) {
        try {
            List<Question> questions = userService.getWorryPorgrams(userInfo);
            return ResponseMsg.success(questions,questions.size());
        } catch (Exception e) {
            return ResponseMsg.fail(-1,e.getMessage());
        }
    }

    @PostMapping("adminLogin")
    public String login(String name, String pwd, HttpServletRequest request) {
        HttpSession session = request.getSession();

        if(name.equals("root")&&pwd.equals("1234")) {
            UserInfo user = new UserInfo();
            user.setNickName("root");
            session.setAttribute("user",user);
            return "登录成功";
        } else {
            return "用户名或密码错误!";
        }
    }

}
