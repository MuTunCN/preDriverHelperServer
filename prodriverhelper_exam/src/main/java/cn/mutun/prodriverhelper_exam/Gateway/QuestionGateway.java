package cn.mutun.prodriverhelper_exam.Gateway;


import cn.mutun.prodriverhelper_exam.Entity.Question;
import cn.mutun.prodriverhelper_exam.Service.QuestionService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/question")
@CrossOrigin(origins = "*",maxAge = 3600)
public class QuestionGateway {

    @Resource
    QuestionService qs;

    @PostMapping("/getAll")
    public ResponseMsg getData(@RequestParam Map<String,String> params){
        try {
            String pageIndex = params.get("pageIndex").toString();
            String pageSize = params.get("pageSize").toString();
            String type = params.get("type") == null ? "1": params.get("type").toString();
            List<Question> data = qs.getAllQuestions(pageIndex,pageSize,type);
            int total = qs.getTotal(type);
            return ResponseMsg.success(data,total);
        } catch (Exception e) {
            return ResponseMsg.fail(-1,e.getMessage());
        }

    }

    @PostMapping("/get")
    public ResponseMsg get(@RequestParam Map<String,String> params){
        try {
            String pageIndex = params.get("pageIndex") == null ? "":params.get("pageIndex").toString();
            String pageSize = params.get("pageSize") == null ? "":params.get("pageSize").toString();
            String key = params.get("key") == null ? "" : params.get("key").toString();
            List<Question> data = qs.get(pageIndex,pageSize,key);
            int total = qs.getAllCount();
            return ResponseMsg.success(data,total);
        } catch (Exception e) {
            return ResponseMsg.fail(-1,e.getMessage());
        }

    }

    @PostMapping("/getRandom")
    public ResponseMsg getRanData(@RequestParam Map<String,String> params) {
        try {
            String pageIndex = params.get("pageIndex") == null ? "": params.get("pageIndex").toString();
            String pageSize = params.get("pageSize") == null ? "": params.get("pageSize").toString();
            String type = params.get("type") == null ? "": params.get("type").toString();
            List<Question> data = qs.getRandomQuestions(pageIndex,pageSize,type);
            int total = qs.getTotal(type);
            return ResponseMsg.success(data,total);
        } catch (Exception e) {
            return ResponseMsg.fail(-1,e.getMessage());
        }
    }

    @PostMapping("/getById")
    public ResponseMsg getById(@RequestParam Map<String,String> params) {
        try {
            int id = Integer.parseInt(params.get("id") == null ? "": params.get("id"));
            return ResponseMsg.success(qs.getOneById(id));
        } catch (Exception e) {
            return ResponseMsg.fail(-1,e.getMessage());
        }
    }

    @PostMapping("/update")
    public ResponseMsg updateUser(@RequestBody Map<String,Object> params) {
        try {
            qs.update(params);
            return ResponseMsg.success("success");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseMsg.fail(-1,e.getMessage());
        }

    }

    @PostMapping("/del")
    public ResponseMsg del(@RequestBody Map<String,Object> params) {
        try {
            qs.delById(params);
            return ResponseMsg.success("success");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseMsg.fail(-1,e.getMessage());
        }
    }

    @PostMapping("/insert")
    public ResponseMsg insert() {
        try {
            qs.insert();
            return ResponseMsg.success("success");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseMsg.fail(-1,e.getMessage());
        }
    }

    @PostMapping("/updateQuestionInfo")
    public ResponseMsg updateQuestionInfo(@RequestParam Map<String,Object> params){
        try{
            System.out.println(params);
            int qId = Integer.parseInt(params.get("qId").toString());
            int isWorry = Integer.parseInt(params.get("isWorry").toString());
            String nickName = params.get("nickName").toString();
            qs.updateQuestionInfo(nickName,qId,isWorry);
            return ResponseMsg.success(1);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseMsg.fail(-1,e.getMessage());
        }
    }

    @PostMapping("/getStatistic")
    public ResponseMsg getStatistic() {
        try{
            return ResponseMsg.success(qs.getStatistic());
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseMsg.fail(-1,e.getMessage());
        }
    }
}
