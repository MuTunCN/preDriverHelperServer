package cn.mutun.prodriverhelper_exam.Privoder;

public class UserPrivoder {

    public String listWorryQuestion(Integer uid) {
        System.out.println(uid);
        return "SELECT q.* FROM predriverhelper.questions q,predriverhelper.worry_id_2_uid w \n" +
                "where q.id = w.qid and w.uid = "+uid;
    }
}
